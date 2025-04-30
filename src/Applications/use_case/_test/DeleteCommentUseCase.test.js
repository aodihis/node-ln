const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');


describe('DeleteCommentUseCase', () => {
    it('should orchestrate the delete comment action correctly', async () => {
        // Arrange
        const deletedId = "comment-123";
        const owner = "user-123";

        const mockCommentRepository = new CommentRepository();

        mockCommentRepository.verifyCommentOwner = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockCommentRepository.deleteComment = jest.fn()
            .mockImplementation(() => Promise.resolve(deletedId));

        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
        });

        // Act
        const result = await deleteCommentUseCase.execute(deletedId, owner);

        // Assert
        expect(mockCommentRepository.verifyCommentOwner).toHaveBeenCalledWith(deletedId, owner);
        expect(mockCommentRepository.deleteComment).toHaveBeenCalledWith(deletedId);

        expect(result).toEqual(deletedId);
    });
});
