const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
    it('should create thread object correctly', () => {
        // Arrange
        const data = {
            title: 'Test',
            id: 'user-2134',
            owner: owner,
        };

        // Action
        const thread = new AddedThread(data);

        // Assert
        expect(thread.title).toEqual(data.title);
        expect(thread.id).toEqual(data.id);
        expect(thread.owner).toEqual(data.owner);
    });
});
