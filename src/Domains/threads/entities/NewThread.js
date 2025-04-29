class NewThread {
    constructor(data) {
        this._verifyPayload(data);
        const { title, body, owner } = data;

        this.title = title;
        this.body = body;
        this.owner = owner;
    }

    _verifyPayload({ title, body }) {
        if (!title || !body) {
            throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
        }

        if (typeof title !== 'string' || typeof body !== 'string' ) {
            throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = NewThread;