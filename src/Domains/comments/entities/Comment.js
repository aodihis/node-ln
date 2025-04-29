class Comment {
    constructor(data) {
        this._verifyPayload(data);
        const { content, threadId, userId } = data;

        this.content = content;
        this.threadId = threadId;
        this.userId = userId;
    }

    _verifyPayload({ content }) {
        if (!content) {
            throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
        }

        if (typeof content !== 'string') {
            throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = Comment;