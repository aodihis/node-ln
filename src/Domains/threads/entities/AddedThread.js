class AddedThread {
    constructor(data) {
        const { id, title, owner } = data;

        this.id = id;
        this.title = title;
        this.owner = owner;
    }
// No need to run validation since the data will come from database, and might allowed to have null value in future.
}

module.exports = AddedThread;