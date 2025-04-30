const pool = require('../src/Infrastructures/database/postgres/pool');

const OWNER_ID = "user-1234"
const CommentsTableHelper = {

    async addComment({
                  id = 'thread-123',  content = "Test content",
                  owner = OWNER_ID, threadId
              }) {
        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4)',
            values: [id, content, threadId, owner],
        };

        await pool.query(query);
    },

    async getCommentById(id){
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id],
        };

        const res = await pool.query(query);
        return res.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM comments WHERE 1=1');
    },
};

module.exports = CommentsTableHelper;