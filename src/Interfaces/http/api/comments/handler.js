const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const {response} = require("@hapi/hapi/lib/validation");

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.addCommentHandler = this.addCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async addCommentHandler(request, h) {
    const {id: userId} = request.auth.credentials;
    const { threadId } = request.params;

    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const addedComment = await addCommentUseCase.execute({
      ...request.payload,
      owner: userId,
      threadId: threadId
    });

    const res = h.response({
      status: 'success',
      data: {addedComment}
    });
    response.code(201);
    return res;
  }

  async deleteCommentHandler(request, h) {
    const { id } = request.params;
    const {id: userId} = request.auth.credentials;
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);

    const thread = await deleteCommentUseCase.execute(id, userId);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentsHandler;
