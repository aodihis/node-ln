class NewComment {
    constructor(data) {
        this._verifyPayload(data);
        const { content, threadId, owner } = data;

        this.content = content;
        this.threadId = threadId;
        this.owner = owner;
    }

    _verifyPayload({ content }) {
        //validate content only, no need for threadId and owner.
        if (!content) {
            throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
        }

        if (typeof content !== 'string') {
            throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = NewComment;