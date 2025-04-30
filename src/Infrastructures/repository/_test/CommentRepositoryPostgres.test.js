const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableHelper = require('../../../../tests/ThreadsTableHelper');
const CommentsTableHelper = require('../../../../tests/CommentsTableHelper');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");
const NewComment = require("../../../Domains/comments/entities/NewComment");
const AddedComment = require("../../../Domains/comments/entities/AddedComment");
const InvariantError = require('../../../Commons/exceptions/InvariantError');


describe('UserRepositoryPostgres', () => {
    afterEach(async () => {
        await CommentsTableHelper.cleanTable();
        await ThreadsTableHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
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
                content: "Test comment",
            }])

        })
    })
});
