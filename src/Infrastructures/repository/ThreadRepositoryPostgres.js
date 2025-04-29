const InvariantError = require('../../Commons/exceptions/InvariantError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const NewThread = require('../../Domains/threads/entities/NewThread');
const Thread = require('../../Domains/threads/entities/Thread');

class ThreadRepositoryPostgres extends ThreadRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async createThread(thread) {
        const { title, body, userId } = thread;
        const id = `thread-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO threads VALUES ($1, $2, $3, $4) RETURNING *',
            values: [id, title, body, userId],
        }

        const result = await this._pool.query(query);

        return new NewThread({ ...result.rows[0] });

    }

    async getThreadById(id) {
        const query = {
            text: `
                SELECT threads.id, threads.title, threads.body, threads.created_at, users.username
                FROM threads
                LEFT JOIN users ON threads.owner = users.id
                WHERE threads.id = $1
            `,
            values: [id],
        };

        const threadRows = await this._pool.query(query);

        if (!threadRows.rows.length) {
            throw new InvariantError("NewThread not found");
        }

        const commentsQuery = {
            text: `
                SELECT comments.id as id, users.username as username, comments.created_at as date, comments.content as content
                FROM comments
                LEFT JOIN users ON comments.owner = users.id
                WHERE comments.thread_id = $1
            `,
            values: [id],
        };

        const comments = await this._pool.query(commentsQuery);
        const thread = {
            id: threadRows[0].id,
            title: threadRows[0].title,
            body: threadRows[0].body,
            date: threadRows[0].created_at,
            username: threadRows[0].username,
            comments: comments,
        }

        return new Thread(thread);
    }
}

module.exports = ThreadRepositoryPostgres;