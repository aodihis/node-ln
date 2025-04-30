const Thread = require('../../Domains/threads/entities/Thread');

class GetThreadUseCase {
    constructor({ threadRepository, commentRepository }) {
        this._threadRepository = threadRepository;
        this._commentRepository = commentRepository;
    }

    async execute(id) {
        const threadData = await this._threadRepository.getThreadById(id);
        const comments = await this._commentRepository.getCommentsForThread(id);
        return new Thread({
            ...threadData,
            comments,
        })
    }
}

module.exports = GetThreadUseCase;
