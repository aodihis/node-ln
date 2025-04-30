const GetThreadUseCase = require('../GetThreadUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');


describe('GetThreadUseCase', () => {
    it('should orchestrate the create comment action correctly', async () => {
        // Arrange
        const threadId = "thread-1234";

        const mockComments = [
            { id: "comment-1234", username: "user1", date: new Date(), content: "Test Comment 1"  },
        ];

        const mockThread = {
            id: threadId,
            username: "user1",
            date: new Date(),
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
    });
});
