const Comment = require('../Comment');

describe('a Comment entities', () => {
    it('should throw error when payload did not contain needed property', () => {

        const payload = {
        };

        // Action and Assert
        expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });


    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            content: {},
        };

        // Action and Assert
        expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should create comment object correctly', () => {
        // Arrange
        const payload = {
            content: 'test content',
        };

        // Action
        const comment = new Comment(payload);

        // Assert
        expect(comment.content).toEqual(payload.content);
    });
});
