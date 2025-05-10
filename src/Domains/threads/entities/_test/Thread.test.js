const Thread = require('../Thread');

describe('a Thread entities', () => {
    it('should create thread object correctly', () => {
        // Arrange
        const date = new Date();
        const data = {
            id: 'user-2134',
            title: 'Test',
            body: 'Test body',
            date: date,
            username: 'test',
            comments: [
                { id: "comment-1234", username: "user1",
                    date: date, content: "Test Comment 1",
                    is_deleted: false, like_count: 1
                },

                { id: "comment-1235", username: "user1",
                    date: date, content: "Test Comment 2",
                    is_deleted: true, like_count: 10
                },
            ]
        };

        // Action
        const thread = new Thread(data);

        // Assert
        expect(thread.body).toEqual(data.body);
        expect(thread.title).toEqual(data.title);
        expect(thread.id).toEqual(data.id);
        expect(thread.username).toEqual(data.username);
        expect(thread.date).toEqual(data.date);
        expect(thread.comments).toStrictEqual([
            { id: "comment-1234", username: "user1",
                date: date, content: "Test Comment 1", likeCount: 0
            },

            { id: "comment-1235", username: "user1",
                date: date, content: "**komentar telah dihapus**", likeCount: 10
            },
        ]);
    });
});
