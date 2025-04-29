const Thread = require('../Thread');

describe('a Thread entities', () => {
    it('should create thread object correctly', () => {
        // Arrange
        const data = {
            id: 'user-2134',
            title: 'Test',
            body: 'Test body',
            date: new Date(),
            username: 'test',
            comments: []
        };

        // Action
        const thread = new Thread(data);

        // Assert
        expect(thread.body).toEqual(data.body);
        expect(thread.title).toEqual(data.title);
        expect(thread.id).toEqual(data.id);
        expect(thread.username).toEqual(data.username);
        expect(thread.date).toEqual(data.date);
        expect(thread.comments).toEqual(data.comments);
    });
});
