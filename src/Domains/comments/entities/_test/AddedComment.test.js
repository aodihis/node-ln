const AddedComment = require('../AddedComment');

describe('an AddedComment entity', () => {
    it('should throw error when payload not contain needed property', () => {

        const payload = {
            content: 'comment',
            owner: 'user-123',
        };

        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');

    });

    it('does not meet requirement', () => {
        const payload = {
            id: 'comment-123',
            content: 'comment',
            owner: 1,
        };

        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('normal case', () => {
        // Arrange
        const payload = {
            id: 'comment-123',
            content: 'comment',
            owner: 'user-123',
        };

        // Action
        const addedComment = new AddedComment(payload);

        // Assert
        expect(addedComment).toBeInstanceOf(AddedComment);
        expect(addedComment.id).toEqual(payload.id);
        expect(addedComment.content).toEqual(payload.content);
        expect(addedComment.owner).toEqual(payload.owner);
    });
});