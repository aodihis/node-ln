const AddedComment = require('../AddedComment');

describe('a AddedComment entities', () => {
    it('should create thread object correctly', () => {
        // Arrange
        const owner = "user-8787";
        const data = {
            content: 'Test',
            id: 'user-2134',
            owner: owner,
        };

        // Action
        const comment = new AddedComment(data);

        // Assert
        expect(comment.id).toEqual(data.id);
        expect(comment.content).toEqual(data.content);
        expect(comment.owner).toEqual(data.owner);
    })
});
