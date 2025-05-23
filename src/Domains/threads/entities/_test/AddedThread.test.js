const AddedThread = require('../AddedThread');

describe('AddedThread entities', () => {
    it('should throw error not contain needed property', () => {
        // Arrange
        const payload = {
            id: 'thread-123',
            title: 'A thread',
        };

        // Action & Assert
        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error does not meet data type requirements', () => {
        // Arrange
        const payload = {
            id: 'thread-123',
            title: 'A thread',
            owner: 123,
        };

        // Action & Assert
        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('normal case', () => {
        // Arrange
        const payload = {
            id: 'thread-123',
            title: 'A thread',
            owner: 'user-123',
        };

        // Action
        const addedThread = new AddedThread(payload);

        // Assert
        expect(addedThread).toBeInstanceOf(AddedThread);
        expect(addedThread.id).toEqual(payload.id);
        expect(addedThread.title).toEqual(payload.title);
        expect(addedThread.owner).toEqual(payload.owner);
    });
});