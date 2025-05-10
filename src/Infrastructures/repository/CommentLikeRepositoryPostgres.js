const CommentLikeRepository = require('../../Domains/comment_likes/CommentLikeRepository');
const InvariantError = require("../../Commons/exceptions/NotFoundError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");

class CommentLikeRepositoryPostgres extends CommentLikeRepository {
    constructor(pool) {
        super();
        this._pool = pool;
    }

    async likeOrDislike(like) {
        const {commentId, userId} = like;

        try {
            await this._pool.query(`
                WITH ins AS (
                    INSERT INTO comment_likes (user_id, comment_id)
                        VALUES ($1, $2)
                        ON CONFLICT DO NOTHING
                        RETURNING *)
                DELETE
                FROM comment_likes
                WHERE user_id = $1
                  AND comment_id = $2
                  AND NOT EXISTS (SELECT 1 FROM ins);
            `, [userId, commentId]);
        } catch (err) {
            if (err.code === '23503') {
                const userError = err.detail.includes('user_id');
                const commentError = err.detail.includes('comment_id');

                if (commentError && userError) {
                    throw new InvariantError("Invalid user and comment.");
                } else if (userError) {
                    throw new InvariantError("Invalid user");
                } else {
                    throw new NotFoundError('Invalid comment');
                }
            }
        }

    }
}

module.exports = CommentLikeRepositoryPostgres;