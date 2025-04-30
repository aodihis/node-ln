class Thread {
    constructor(data) {
        const { id, title, body, created_at, owner_username, comments } = data;

        this.id = id;
        this.title = title;
        this.body = body;
        this.date = created_at;
        this.username = owner_username;
        this.comments = comments.map(comment => ({
            id: comment.id,
            username: comment.username,
            date: comment.date,
            content: comment.content ? comment.is_deleted === false : "**komentar telah dihapus**",
        }));
    }
// No need to run validation since the data will come from database, and might allowed to have null value in future.    
}

module.exports = Thread;