const CommentLikeUseCase = require('../CommentLikeUseCase'); // adjust path if needed
const CommentLike = require('../../../Domains/comment_likes/entities/CommentLike');
const CommentLikeRepository = require('../../../Domains/comment_likes/CommentLikeRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');


describe('CreateThreadUseCase', () => {
    it('should orchestrate the create thread action correctly', async () => {
        // Arrange
        const threadId = "thread-123";
        const userId = "user-123";
        const commentId = "comment-123";


        const mockCommentLikeRepository = new CommentLikeRepository();
        const mockCommentRepository = new CommentRepository();

        mockCommentLikeRepository.likeOrDislike = jest.fn()
            .mockImplementation(() => Promise.resolve());

        mockCommentRepository.verifyComment = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const commentLikeUseCase = new CommentLikeUseCase({
            commentLikeRepository: mockCommentLikeRepository,
            commentRepository: mockCommentRepository,
        });

        // Act
        await commentLikeUseCase.execute(threadId, commentId, userId);

        // Assert
        expect(mockCommentRepository.verifyComment).toHaveBeenCalledWith(
            "comment-123", "thread-123"

        );
        expect(mockCommentLikeRepository.likeOrDislike).toHaveBeenCalledWith(
            new CommentLike({
                userId: "user-123",
                commentId: "comment-123",
            })
        );
    });
});
