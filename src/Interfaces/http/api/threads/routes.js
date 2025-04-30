const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.createTreadHandler,
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/threads/{id}',
    handler: handler.getThreadHandler,
  },
]);

module.exports = routes;
