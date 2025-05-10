const CommentLike = require('../../Domains/comment_likes/entities/CommentLike');

class CommentLikeUseCase {
    constructor({ commentLikeRepository }) {
        this._commentLikeRepository = commentLikeRepository;
    }

    async execute(userId, commentId) {
        const commentLike = new CommentLike({
            commentId, userId
        });
        await this._commentLikeRepository.likeOrDislike(commentLike);
    }
}

module.exports = CommentLikeUseCase;
