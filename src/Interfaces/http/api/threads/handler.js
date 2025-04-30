const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUseCase');
const CreateThreadUseCase = require('../../../../Applications/use_case/CreateThreadUseCase');
const {response} = require("@hapi/hapi/lib/validation");

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.createTreadHandler = this.createTreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async createTreadHandler(request, h) {
    const {id: userId} = request.auth.credentials;
    const createThreadUseCase = this._container.getInstance(CreateThreadUseCase.name);
    const addedThread = await createThreadUseCase.execute({
      ...request.payload,
      owner: userId,
    });

    const res = h.response({
      status: 'success',
      data: {addedThread}
    });
    response.code(201);
    return res;
  }

  async getThreadHandler(request, h) {
    const { id } = request.params;
    const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);

    const thread = await getThreadUseCase.execute(id);

    return {
      status: 'success',
      data: {
        thread
      }
    };
  }
}

module.exports = ThreadsHandler;
