const NewThread = require('../NewThread');

describe('a NewThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            title: 'test',
        };

        // Action and Assert
        expect(() => new NewThread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            body: 'test',
        };

        // Action and Assert
        expect(() => new NewThread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });


    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            title: {},
            body: 'test',
        };

        // Action and Assert
        expect(() => new NewThread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            title: 'Test',
            body: {},
        };

        // Action and Assert
        expect(() => new NewThread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should create thread object correctly', () => {
        // Arrange
        const payload = {
            title: 'Test',
            body: 'test body',
            owner: 'user-123'
        };

        // Action
        const thread = new NewThread(payload);

        // Assert
        expect(thread.title).toEqual(payload.title);
        expect(thread.body).toEqual(payload.body);
        expect(thread.owner).toEqual(payload.owner);
    });
});
