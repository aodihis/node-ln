const ThreadsTableHelper = require('../../../../tests/ThreadsTableHelper');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const Thread = require('../../../Domains/threads/entities/Thread');

describe('UserRepositoryPostgres', () => {
    afterEach(async () => {
        await ThreadsTableHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('verify create function', () => {
        it('should insert the data correctly.', async () => {

            const fakeIdGenerator = () => '1248946454';
            const threadRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await ThreadsTableHelper.addUser({id: "user-6788765678" });

            const data = new NewThread({
                title: "Test",
                body: "Test body",
                owner: "user-6788765678",
            });

            const res = await threadRepoPostgres.createThread(data)
            expect(res).toStrictEqual(data);

            const threads = await ThreadsTableHelper.getThreadById('thread-1248946454');
            expect(threads).toHaveLength(1)
        })
    });

    describe('create with id exist', () => {
        it('insert should be failed.', async () => {

            await ThreadsTableHelper.addUser({});
            await ThreadsTableHelper.addThread({});
            const fakeIdGenerator = () => '123';
            const threadRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            const data = new NewThread({
                title: "Test",
                body: "Test body",
                owner: "user-6788765678",
            });

            await expect(threadRepoPostgres.createThread(data)).rejects.toThrow();

        })
    });

    describe('test getThreadById if not exist', () => {
        it('insert should be failed.', async () => {
            const fakeIdGenerator = () => '123';
            const threadRepoPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
            await expect(threadRepoPostgres.getThreadById('thread-7978978798')).rejects.toThrow();

        })
    });

    describe('test getThreadById', () => {
        it('should return value.', async () => {

            await ThreadsTableHelper.addUser({
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

            expect(res).toStrictEqual(new Thread({
                id: 'thread-123',
                title: "Test",
                body: "Test body",
                date: res.date,
                username: "test",
                comments: []
            }));

        })
    });


});
