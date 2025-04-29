const ThreadsTableHelper = require('../../../../tests/ThreadsTableHelper');
const pool = require('../../database/postgres/pool');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const Thread = require('../../../Domains/threads/entities/NewThread');
const RegisteredUser = require("../../../Domains/users/entities/RegisteredUser");


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

            const data = new Thread({
                title: "Test",
                body: "Test body",
                owner: "user-6788765678",
            });

            const res = await threadRepoPostgres.createThread(data)

            expect(res).toStrictEqual(data);

        })
    });
});
