const CommentLikeUseCase = require('../../../../Applications/use_case/CommentLikeUseCase');
const {response} = require("@hapi/hapi/lib/validation");

class CommentLikesHandler {
  constructor(container) {
    this._container = container;

    this.likeDislikeHandler = this.likeDislikeHandler.bind(this);
  }


  async likeDislikeHandler(request, h) {
    const { commentId } = request.params;
    const {id: userId} = request.auth.credentials;
    const commentLikeUseCase = this._container.getInstance(CommentLikeUseCase.name);

    await commentLikeUseCase.execute(userId, commentId);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentLikesHandler;
