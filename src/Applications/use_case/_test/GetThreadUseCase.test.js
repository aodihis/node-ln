const GetThreadUseCase = require('../GetThreadUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const Thread = require("../../../Domains/threads/entities/Thread");


describe('GetThreadUseCase', () => {
    it('should orchestrate the create comment action correctly', async () => {
        // Arrange
        const threadId = "thread-1234";
        let date = new Date();
        const mockComments = [
            { id: "comment-1234", username: "user1",
                date: date, content: "Test Comment 1",
                is_deleted: false
            },

            { id: "comment-1235", username: "user1",
                date: date, content: "Test Comment 2",
                is_deleted: true
            },
        ];

        const mockThread = {
            id: threadId,
            username: "user1",
            date: date,
            title: "Test",
            body: "Test Thread 1",
        };

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();

        mockCommentRepository.getCommentsForThread = jest.fn()
            .mockImplementation(() => Promise.resolve(mockComments));
        mockThreadRepository.getThreadById = jest.fn()
            .mockImplementation(() => Promise.resolve(mockThread));

        const getThreadUseCase = new GetThreadUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        // Act
        const result = await getThreadUseCase.execute(threadId);

        // Assert
        expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(threadId);
        expect(mockCommentRepository.getCommentsForThread).toHaveBeenCalledWith(threadId);

        expect(result).toStrictEqual(
            new Thread({
                id: threadId,
                username: "user1",
                date: date,
                title: "Test",
                body: "Test Thread 1",
                comments: [
                    { id: "comment-1234", username: "user1",
                        date: date, content: "Test Comment 1",
                        is_deleted: false
                    },

                    { id: "comment-1235", username: "user1",
                        date: date, content: "Test Comment 2",
                        is_deleted: true
                    },
                ],
            })
        )
    });
});
