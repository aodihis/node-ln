class Thread {
    constructor(data) {
        const { id, title, body, date, username, comments } = data;

        this.id = id;
        this.title = title;
        this.body = body;
        this.date = date;
        this.username = username;
        this.comments = comments.map(comment => ({
            id: comment.id,
            username: comment.username,
            date: comment.date,
            content: !comment.is_deleted ? comment.content : "**komentar telah dihapus**",
        }));
    }
// No need to run validation since the data will come from database, and might allowed to have null value in future.    
}

module.exports = Thread;