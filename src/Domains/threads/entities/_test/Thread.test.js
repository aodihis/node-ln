const Thread = require('../Thread');

describe('a Thread entities', () => {
    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            title: 'test',
        };

        // Action and Assert
        expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            body: 'test',
        };

        // Action and Assert
        expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });


    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            title: {},
            body: 'test',
        };

        // Action and Assert
        expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when payload did not contain needed property', () => {

        const payload = {
            title: 'Test',
            body: {},
        };

        // Action and Assert
        expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should create thread object correctly', () => {
        // Arrange
        const payload = {
            title: 'Test',
            body: 'test body',
        };

        // Action
        const thread = new Thread(payload);

        // Assert
        expect(thread.title).toEqual(payload.title);
        expect(thread.body).toEqual(payload.body);
    });
});
