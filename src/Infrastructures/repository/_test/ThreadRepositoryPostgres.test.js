const ThreadsTableHelper = require('../../../../tests/ThreadsTableHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NewThread = require("../../../Domains/threads/entities/NewThread");
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const { DatabaseError } = require('pg');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await ThreadsTableHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('verify create function', () => {
        it('should insert the data correctly.', async () => {

            const fakeIdGenerator = () => '1248946454';
            const threadRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await UsersTableTestHelper.addUser({id: "user-6788765678" });

            const data = new NewThread({
                title: "Test",
                body: "Test body",
                owner: "user-6788765678",
            });

            const res = await threadRepoPostgres.create(data)
            expect(res).toStrictEqual(new AddedThread({
                title: "Test",
                owner: "user-6788765678",
                id: "thread-1248946454"
            }));

            const threads = await ThreadsTableHelper.getThreadById('thread-1248946454');
            expect(threads).toHaveLength(1)
        })
    });

    describe('create with id exist', () => {
        it('insert should be failed.', async () => {

            await UsersTableTestHelper.addUser({
                id: "user-6788765678",
            });
            await ThreadsTableHelper.addThread({
                owner: "user-6788765678",
            });
            const fakeIdGenerator = () => '123';
            const threadRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            const data = new NewThread({
                title: "Test",
                body: "Test body",
                owner: "user-6788765678",
            });

            await threadRepoPostgres.create(data).catch((err) => {
                expect(err).toBeInstanceOf(DatabaseError);
                expect(err.code).toBe('23505');
            });

            const actual = await ThreadsTableHelper.getThreadById('thread-123');
            expect(actual.length).toBe(1);

        })
    });

    describe('test getThreadById if not exist', () => {
        it('insert should be failed.', async () => {
            const fakeIdGenerator = () => '123';
            const threadRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
            await expect(threadRepoPostgres.getThreadById('thread-7978978798')).rejects.toThrow(InvariantError);

        })
    });

    describe('test getThreadById', () => {
        it('should return value.', async () => {

            await UsersTableTestHelper.addUser({
                id: 'user-6788765678',
                username: "test"
            });
            await ThreadsTableHelper.addThread({
                id: 'thread-123',
                title: "Test",
                body: "Test body",
                owner: "user-6788765678",
            });

            const fakeIdGenerator = () => '123';
            const threadRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            const res =  await threadRepoPostgres.getThreadById('thread-123');

            expect(res).toStrictEqual(
                {
                    id: 'thread-123',
                    title: "Test",
                    body: "Test body",
                    date: res.date,
                    username: "test",
                }
            );

        })
    });


});
