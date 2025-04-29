const InvariantError = require('../../Commons/exceptions/InvariantError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const NewThread = require('../../Domains/threads/entities/NewThread');

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
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
        }

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError("NewThread not found");
        }

        return new NewThread({ ...result.rows[0] });
    }
}

module.exports = ThreadRepositoryPostgres;