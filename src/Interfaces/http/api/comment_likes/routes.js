const routes = (handler) => ([
  {
    method: 'PUT',
    path: '/threads/{threadId}/comments/{commentId}/likes}',
    handler: handler.addCommentHandler,
    options: {
      auth: 'jwt',
    },
  },
]);

module.exports = routes;
