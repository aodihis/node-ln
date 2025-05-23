const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableHelper = require('../../../../tests/ThreadsTableHelper');
const CommentsTableHelper = require('../../../../tests/CommentsTableHelper');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");
const NewComment = require("../../../Domains/comments/entities/NewComment");
const AddedComment = require("../../../Domains/comments/entities/AddedComment");
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const {DatabaseError} = require("pg");


describe('CommentRepositoryPostgres', () => {
    afterEach(async () => {
        await CommentsTableHelper.cleanTable();
        await ThreadsTableHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('create with invalid threadId', () => {
        it('should return not found.', async () => {

            await UsersTableTestHelper.addUser({
                id: "user-123",
            })

            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            const data = new NewComment({
                content: "Test comment",
                owner: "user-123",
                threadId: "thread-123",
            });

            await expect(commentPostgres.create(data)).rejects.toBeInstanceOf(NotFoundError);
        })
    });

    describe('create comment with duplicate id', () => {
        it('should insert should throw an error.', async () => {

            await UsersTableTestHelper.addUser({
                id: "user-123",
            })

            await ThreadsTableHelper.addThread({
                id: "thread-123",
                owner: "user-123",
            })

            await CommentsTableHelper.addComment({id: "comment-123",
            owner: "user-123", threadId: "thread-123",})

            const fakeIdGenerator = () => '123';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            const data = new NewComment({
                content: "Test comment",
                owner: "user-123",
                threadId: "thread-123",
            });

            await commentPostgres.create(data).catch((err) => {
                expect(err).toBeInstanceOf(DatabaseError);
                expect(err.code).toBe('23505');
            });
        })
    });

    describe('verify create function', () => {
        it('should insert the data correctly.', async () => {

            await UsersTableTestHelper.addUser({
                id: "user-123",
            })

            await ThreadsTableHelper.addThread({
                id: "thread-123",
                owner: "user-123",
            })

            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            const data = new NewComment({
                content: "Test comment",
                owner: "user-123",
                threadId: "thread-123",
            });

            const res = await commentPostgres.create(data)

            expect(res).toStrictEqual(new AddedComment({
                content: data.content,
                owner: data.owner,
                id: "comment-1248946454"
            }));

            const commentActual = await CommentsTableHelper.getCommentById("comment-1248946454");
            expect(commentActual).toEqual({
                id: "comment-1248946454",
                content: "Test comment",
                thread_id: "thread-123",
                owner: "user-123",
                is_deleted: false,
                created_at: expect.any(Date),
                updated_at: expect.any(Date),
            })
        })
    });

    describe('verify delete function', () => {
        it('should delete the data correctly.', async () => {
            await UsersTableTestHelper.addUser({
                id: "user-123",
            })

            await ThreadsTableHelper.addThread({
                id: "thread-123",
                owner: "user-123",
            })

            await CommentsTableHelper.addComment({
                threadId: "thread-123", owner: "user-123", id: "comment-123",
            })


            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await commentPostgres.deleteComment("comment-123");

            const check = await CommentsTableHelper.getCommentById("comment-123");
            expect(check.is_deleted).toEqual(true);

            const commentActual = await CommentsTableHelper.getCommentById("comment-123");
            expect(commentActual.is_deleted).toEqual(true)
        })
    })

    describe('verify delete function for not exist comment', () => {
        it('should delete the data correctly.', async () => {

            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await expect(commentPostgres.deleteComment("comment-123")).rejects.toBeInstanceOf(InvariantError);

        })
    })

    describe("Verify get comment for thread", () => {
        it('should return the data correctly.', async () => {
            await UsersTableTestHelper.addUser({
                id: "user-123",
                username: "test"
            })

            await ThreadsTableHelper.addThread({
                id: "thread-123",
                owner: "user-123",
            })

            await CommentsTableHelper.addComment({
                threadId: "thread-123",
                owner: "user-123",
                id: "comment-123",
                content: "Test comment",
            })

            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);


            const res = await commentPostgres.getCommentsForThread("thread-123");

            expect(res).toStrictEqual([{
                id: "comment-123",
                username: "test",
                date: res[0].date,
                is_deleted: false,
                content: "Test comment",
                like_count: "0"
            }])

        })
    })

    describe('test verifyCommentOwner', () => {
        it('should correctly verify the owner.', async () => {
            await UsersTableTestHelper.addUser({
                id: "user-123",
            })

            await ThreadsTableHelper.addThread({
                id: "thread-123",
                owner: "user-123",
            })

            await CommentsTableHelper.addComment({
                threadId: "thread-123", owner: "user-123", id: "comment-123",
            })


            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await expect(commentPostgres.verifyCommentOwner("comment-123", "user-123")).resolves.not.toBeDefined();

            await expect(commentPostgres.verifyCommentOwner("comment-123", "user-1234"))
                .rejects.toBeInstanceOf(AuthorizationError);
        })
    })

    describe('test verifyCommentOwner with invalid id', () => {
        it('should correctly verify the owner.', async () => {
            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await expect(commentPostgres.verifyCommentOwner("comment-123", "user-1234"))
                .rejects.toBeInstanceOf(NotFoundError);
        })
    })

    describe('test verifyComment with invalid threadId', () => {
        it('should correctly verify the owner.', async () => {
            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await expect(commentPostgres.verifyComment("comment-123", "thread-1234"))
                .rejects.toBeInstanceOf(NotFoundError);

            await UsersTableTestHelper.addUser({id:"user-123"})
            await ThreadsTableHelper.addThread({id:"thread-123", owner: "user-123"})

            await expect(commentPostgres.verifyComment("comment-123", "thread-123"))
                .rejects.toBeInstanceOf(NotFoundError);

            await CommentsTableHelper.addComment({id:"comment-123", owner: "user-123", threadId: "thread-123"})

            await expect(commentPostgres.verifyComment("comment-1234", "thread-123"))
                .rejects.toBeInstanceOf(NotFoundError);

        })
    })

    describe('test verifyComment with correct value', () => {
        it('should be ok.', async () => {
            await UsersTableTestHelper.addUser({id:"user-123"})
            await ThreadsTableHelper.addThread({id:"thread-123", owner: "user-123"})
            await CommentsTableHelper.addComment({id:"comment-123", owner: "user-123", threadId: "thread-123"})


            const fakeIdGenerator = () => '1248946454';
            const commentPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await expect(commentPostgres.verifyComment("comment-123", "thread-123")).resolves.not.toBeDefined();

        })
    })
});
