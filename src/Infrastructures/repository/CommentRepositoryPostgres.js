const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const AddedComment = require('../../Domains/comments/entities/AddedComment');
const Thread = require('../../Domains/threads/entities/Thread');

class CommentRepositoryPostgres extends CommentRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async create({content, threadId, owner}) {
        const id = `comment-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO comments VALUES ($1, $2, $3, $4) RETURNING *',
            values: [id, content, threadId, owner],
        }

        try {
            const result = await this._pool.query(query);
            return new AddedComment({...result.rows[0]});
        } catch (error) {
            if (error.code === '23503') { // foreign_key_violation
                throw new NotFoundError(`Thread with ID ${threadId} not found`);
            }
            throw error;
        }
    }

    async deleteComment(id) {
        const query = {
            text: 'UPDATE comments SET is_deleted = true WHERE id = $1 RETURNING id',
            values: [id]
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError("No comments found.");
        }

        return result.rows[0].id;
    }

    async getCommentsForThread(threadId) {

        const commentsQuery = {
            text: `
                SELECT 
                  comments.id AS id,
                  users.username AS username,
                  comments.created_at AS date,
                  comments.content AS content,
                  comments.is_deleted AS is_deleted,
                  COALESCE(likes.like_count, 0) AS like_count
                FROM comments
                LEFT JOIN users ON comments.owner = users.id
                LEFT JOIN (
                  SELECT comment_id, COUNT(*) AS like_count
                  FROM comment_likes
                  GROUP BY comment_id
                ) AS likes ON comments.id = likes.comment_id
                WHERE comments.thread_id = $1
                ORDER BY comments.created_at
              ` ,
            values: [threadId],
        };


        const comments = await this._pool.query(commentsQuery);
        return comments.rows;
    }

    async verifyCommentOwner(id, owner) {
        const query = {
            text: 'SELECT id, owner FROM comments WHERE id = $1',
            values: [id]
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("No comments found.");
        }
        if (result.rows[0].owner !== owner) {
            throw new AuthorizationError("Not authorized to delete this comment");
        }
    }

    async verifyComment(id, threadId) {
        const query = {
            text: 'SELECT id FROM comments WHERE id = $1 AND thread_id = $2',
            values: [id, threadId]
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError("No comments found.");
        }
    }
}

module.exports = CommentRepositoryPostgres;