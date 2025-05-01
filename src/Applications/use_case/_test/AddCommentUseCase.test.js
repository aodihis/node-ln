const AddCommentUseCase = require('../AddCommentUseCase'); // adjust path if needed
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');


describe('AddCommentUseCase', () => {
    it('should orchestrate the create comment action correctly', async () => {
        // Arrange
        const useCasePayload = {
            content: 'Sample Content',
            threadId: 'thread-123',
            owner: 'user-123',
        };

        const mockAddedComment = new AddedComment({
            id: 'thread-123',
            content: 'Sample Thread',
            owner: 'user-123',
        });


        const mockCommentRepository = new CommentRepository();

        mockCommentRepository.create = jest.fn()
            .mockImplementation(() => Promise.resolve(new AddedComment({
                id: 'thread-123',
                content: 'Sample Thread',
                owner: 'user-123',
                thread_id: 'thread-123',
                is_deleted: false,
                created_at: new Date(),
                updated_at: new Date(),
            })));

        const createCommentUseCase = new AddCommentUseCase({
            commentRepository: mockCommentRepository,
        });

        // Act
        const result = await createCommentUseCase.execute(useCasePayload);

        // Assert
        expect(mockCommentRepository.create).toHaveBeenCalledWith(useCasePayload);
        expect(result).toEqual(mockAddedComment)
    });
});
