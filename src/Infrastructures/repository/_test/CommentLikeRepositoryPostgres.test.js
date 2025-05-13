const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableHelper = require('../../../../tests/ThreadsTableHelper');
const CommentLikeTableHelper = require('../../../../tests/CommentLikeTableHelper');
const CommentsTableHelper = require('../../../../tests/CommentsTableHelper');
const pool = require('../../database/postgres/pool');
const CommentLikeRepositoryPostgres = require("../CommentLikeRepositoryPostgres");
const CommentLike = require("../../../Domains/comment_likes/entities/CommentLike");
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const {DatabaseError} = require("pg");
const assert = require("node:assert");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");


describe('CommentLikeRepositoryPostgres', () => {
    afterEach(async () => {
        await CommentLikeTableHelper.cleanTable();
        await CommentsTableHelper.cleanTable();
        await ThreadsTableHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('create with invalid params', () => {
        it('should return not found.', async () => {

            const data = new CommentLike({
                userId: "user-123",
                commentId: "comment-123",
            });

            const commentLikePg = new CommentLikeRepositoryPostgres(pool);

            await expect(commentLikePg.likeOrDislike(data)).rejects.toBeInstanceOf(NotFoundError);

            await UsersTableTestHelper.addUser({id: "user-123"})

            await expect(commentLikePg.likeOrDislike(data)).rejects.toBeInstanceOf(NotFoundError);

            await ThreadsTableHelper.addThread({id: "thread-123", owner: "user-123"})
            await CommentsTableHelper.addComment({id: "comment-123", owner: "user-123", threadId:"thread-123"});

            const data2 = new CommentLike({
                userId: "user-1234",
                commentId: "comment-123",
            })

            await expect(commentLikePg.likeOrDislike(data2)).rejects.toBeInstanceOf(NotFoundError);
        });

        it('normal flow', async () => {
            const userId = "user-123";
            const threadId = "thread-123";
            const commentId = "comment-123";

            await UsersTableTestHelper.addUser({id: userId});
            await ThreadsTableHelper.addThread({id: threadId, owner: userId});
            await CommentsTableHelper.addComment({id: commentId, owner: userId, threadId: threadId});

            const data = new CommentLike({
                userId, commentId
            })

            const userLikePg = new CommentLikeRepositoryPostgres(pool);

            await userLikePg.likeOrDislike(data);

            const t1 = await CommentLikeTableHelper.getCommentLike({commentId, userId});

            assert.equal(t1.length, 1);

            await userLikePg.likeOrDislike(data);

            const t2 = await CommentLikeTableHelper.getCommentLike({commentId, userId});

            assert.equal(t2.length, 0);

        })
    });


});
