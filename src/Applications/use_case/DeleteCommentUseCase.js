const NewComment = require('../../Domains/comments/entities/NewComment');

class DeleteCommentUseCase {
    constructor({ commentRepository }) {
        this._commentRepository = commentRepository;
    }

    async execute(id, owner) {
        await this._commentRepository.verifyCommentOwner(id, owner)
        return await this._commentRepository.deleteComment(id);
    }
}

module.exports = DeleteCommentUseCase;
