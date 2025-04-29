const CreateThreadUseCase = require('../CreateThreadUseCase'); // adjust path if needed
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require("../../../Domains/threads/entities/AddedThread");


describe('CreateThreadUseCase', () => {
    it('should orchestrate the create thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
            title: 'Sample Thread',
            body: 'This is a sample body',
            owner: 'user-123',
        };

        const mockAddedThread = new AddedThread({
            id: 'thread-123',
            title: 'Sample Thread',
            owner: 'user-123',
        });


        const mockThreadRepository = new ThreadRepository();

        mockThreadRepository.create = jest.fn()
            .mockImplementation(() => Promise.resolve(mockAddedThread));

        const createThreadUseCase = new CreateThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        // Act
        const result = await createThreadUseCase.execute(useCasePayload);

        // Assert
        expect(mockThreadRepository.create).toHaveBeenCalledWith(useCasePayload);
    });
});
