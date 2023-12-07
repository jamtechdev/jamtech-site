// // server.js
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(jsonServer.bodyParser);

// server.post('/users', (req, res) => {
//   const userData = req.body;

//   // Save user data to the "users" array in db.json
//   router.db.get('users').push(userData).write();

//   res.json(userData);
// });

// server.use(router);

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
