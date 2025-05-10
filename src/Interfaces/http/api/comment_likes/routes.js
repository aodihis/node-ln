const routes = (handler) => ([
  {
    method: 'PUT',
    path: '/threads/{threadId}/comments/{commentId}/likes',
    handler: handler.likeDislikeHandler,
    options: {
      auth: 'jwt',
    },
  },
]);

module.exports = routes;
