const NewComment = require('../../Domains/comments/entities/NewComment');

class DeleteCommentUseCase {
    constructor({ commentRepository }) {
        this._commentRepository = commentRepository;
    }

    async execute(commentId) {
        return this._commentRepository.deleteComment(commentId);
    }
}

module.exports = DeleteCommentUseCase;
