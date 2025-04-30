const NewComment = require('../../Domains/comments/entities/NewComment');

class DeleteCommentUseCase {
    constructor({ commentRepository }) {
        this._commentRepository = commentRepository;
    }

    async execute(id, owner) {
        this._commentRepository.verifyCommentOwner(id, owner)
        return this._commentRepository.deleteComment(id);
    }
}

module.exports = DeleteCommentUseCase;
