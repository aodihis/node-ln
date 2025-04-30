const InvariantError = require('../../Commons/exceptions/InvariantError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const Thread = require('../../Domains/threads/entities/Thread');

class ThreadRepositoryPostgres extends ThreadRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async createThread(thread) {
        const { title, body, owner } = thread;
        const id = `thread-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO threads VALUES ($1, $2, $3, $4) RETURNING *',
            values: [id, title, body, owner],
        }

        const result = await this._pool.query(query);

        return new AddedThread({ ...result.rows[0] });

    }

    async getThreadById(id) {
        const query = {
            text: `
                SELECT threads.id as id, threads.title as title, threads.body as body, threads.created_at as date, users.username as username
                FROM threads
                LEFT JOIN users ON threads.owner = users.id
                WHERE threads.id = $1
            `,
            values: [id],
        };

        const threads = await this._pool.query(query);

        if (!threads.rows.length) {
            throw new InvariantError("NewThread not found");
        }
        return threads.rows[0];
    }
}

module.exports = ThreadRepositoryPostgres;