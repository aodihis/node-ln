const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');


describe('DeleteCommentUseCase', () => {
    it('should orchestrate the delete comment action correctly', async () => {
        // Arrange
        const deletedId = "comment-123"

        const mockCommentRepository = new CommentRepository();

        mockCommentRepository.deleteComment = jest.fn()
            .mockImplementation(() => Promise.resolve(deletedId));

        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
        });

        // Act
        const result = await deleteCommentUseCase.execute(deletedId);

        // Assert
        expect(mockCommentRepository.deleteComment).toHaveBeenCalledWith(deletedId);

        expect(result).toEqual(deletedId);
    });
});
