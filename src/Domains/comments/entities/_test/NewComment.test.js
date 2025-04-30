const NewComment = require('../NewComment');

describe('a NewComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {

        const payload = {
        };

        // Action and Assert
        expect(() => new NewComment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });


    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            content: {},
        };

        // Action and Assert
        expect(() => new NewComment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should create comment object correctly', () => {
        // Arrange
        const payload = {
            content: 'test content',
            threadId: 'thread-123',
            owner: 'user-123'
        };

        // Action
        const comment = new NewComment(payload);

        // Assert
        expect(comment.content).toEqual(payload.content);
        expect(comment.threadId).toEqual(payload.threadId);
        expect(comment.owner).toEqual(payload.owner);
    });
});
