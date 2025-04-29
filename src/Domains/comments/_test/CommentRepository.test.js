const CommentRepository = require('../CommentRepository');

describe('CommentRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const commentRepository = new CommentRepository();

        // Action and Assert
        await expect(commentRepository.create({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(commentRepository.deleteComment(2)).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(commentRepository.getCommentsForThread(2)).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});
