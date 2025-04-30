const pool = require('../src/Infrastructures/database/postgres/pool');

const OWNER_ID = "user-1234"
const ThreadsTableTestHelper = {

    async addThread({
                  id = 'thread-123', title = "Test", body = "Test content",
                  owner = OWNER_ID,
              }) {
        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
            values: [id, title, body, owner],
        };

        await pool.query(query);
    },

    async getThreadById(id){
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
        };

        const res = await pool.query(query);
        return res.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM threads WHERE 1=1');
        await pool.query('DELETE FROM users WHERE 1=1');
    },
};

module.exports = ThreadsTableTestHelper;