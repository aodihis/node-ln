const CommentLike = require('../CommentLike');

describe('CommentLike entity', () => {
    it('invalid property', () => {
        // Arrange
        const payload = {
            commentId: 'comment-123',
        };

        // Action & Assert
        expect(() => new CommentLike(payload)).toThrowError('COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('invalid type', () => {
        // Arrange
        const payload = {
            commentId: 123,
            userId: 456,
        };

        // Action & Assert
        expect(() => new CommentLike(payload)).toThrowError('COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create CommentLike entities correctly', () => {
        // Arrange
        const payload = {
            commentId: 'comment-123',
            userId: 'user-123',
        };

        // Action
        const commentLike = new CommentLike(payload);

        // Assert
        expect(commentLike.commentId).toEqual(payload.commentId);
        expect(commentLike.userId).toEqual(payload.userId);
    });
});