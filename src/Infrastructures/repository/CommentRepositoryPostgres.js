const InvariantError = require('../../Commons/exceptions/InvariantError');
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

        const result = await this._pool.query(query);
        return new AddedComment({ ...result.rows[0] });
    }

    async deleteComment(id) {
        const query = {
            text: 'DELETE FROM comments WHERE id = $1 RETURNING id',
            values: [id]
        }
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError("No comments found.");
        }

        return result.rows[0].id;
    }

    async getCommentsForThread(threadId) {

        const commentsQuery = {
            text: `
                SELECT comments.id as id, users.username as username, comments.created_at as date, comments.content as content
                FROM comments
                LEFT JOIN users ON comments.owner = users.id
                WHERE comments.thread_id = $1
            `,
            values: [threadId],
        };

        const comments = await this._pool.query(commentsQuery);
        return comments.rows;
    }
}

module.exports = CommentRepositoryPostgres;