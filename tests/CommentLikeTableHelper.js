/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableHelper = {

    async addCommentLike({
                  commentId = 'comment-123', userId = 'user-123', createdAt,
              }) {
        const query = {
            text: 'INSERT INTO comment_likes VALUES($1, $2, $3)',
            values: [userId, commentId, createdAt],
        };

        await pool.query(query);
    },

    async getCommentLike({commentId, userId}) {
        const query = {
            text: "SELECT * FROM comment_likes WHERE user_id = $1 AND comment_id = $2",
            values: [userId, commentId],
        }
        return (await pool.query(query)).rows;
    },
    async cleanTable() {
        await pool.query('DELETE FROM comment_likes WHERE 1=1');
    },
};

module.exports = CommentsTableHelper;