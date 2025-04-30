const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.addCommentHandler,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{id}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'jwt',
    },
  },
]);

module.exports = routes;
