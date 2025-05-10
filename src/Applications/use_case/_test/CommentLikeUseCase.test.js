const CommentLikeUseCase = require('../CommentLikeUseCase'); // adjust path if needed
const CommentLike = require('../../../Domains/comment_likes/entities/CommentLike');
const CommentLikeRepository = require('../../../Domains/comment_likes/CommentLikeRepository');


describe('CreateThreadUseCase', () => {
    it('should orchestrate the create thread action correctly', async () => {
        // Arrange
        const userId = "user-123";
        const commentId = "comment-123";


        const mockCommentLikeRepository = new CommentLikeRepository();

        mockCommentLikeRepository.likeOrDislike = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const commentLikeUseCase = new CommentLikeUseCase({
            commentLikeRepository: mockCommentLikeRepository,
        });

        // Act
        await commentLikeUseCase.execute(userId, commentId);

        // Assert
        expect(mockCommentLikeRepository.likeOrDislike).toHaveBeenCalledWith(
            new CommentLike({
                userId: "user-123",
                commentId: "comment-123",
            })
        );
    });
});
