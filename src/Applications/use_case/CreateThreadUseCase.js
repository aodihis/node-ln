const NewThread = require('../../Domains/threads/entities/NewThread');

class CreateThreadUseCase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(useCasePayload) {
        const thread = new NewThread(useCasePayload);
        return this._threadRepository.create(thread);
    }
}

module.exports = CreateThreadUseCase;
