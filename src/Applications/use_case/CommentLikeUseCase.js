const CommentLike = require('../../Domains/comment_likes/entities/CommentLike');

class CommentLikeUseCase {
    constructor({ commentLikeRepository, commentRepository }) {
        this._commentLikeRepository = commentLikeRepository;
        this._commentRepository = commentRepository;
    }

    async execute(threadId, commentId, userId ) {
        await this._commentRepository.verifyComment(commentId, threadId);
        const commentLike = new CommentLike({
            commentId, userId
        });
        await this._commentLikeRepository.likeOrDislike(commentLike);
    }
}

module.exports = CommentLikeUseCase;
