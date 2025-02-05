import connection from './db.js';
import express from 'express';
import cors from 'cors';
import routed from './routes/index.js';

var env = process.env.NODE_ENV || 'development';

// Create the server instance and set the port to 8080
const server = express();
const port = 8080;
// MiddleWare
server.use(express.json());
server.use(cors());

if (env.toLowerCase() == 'production') {
	server.use(express.static('public'))
}

server.use('/', routed);
// On initial start of server log that the server has connected to the database.
connection.once('open', function () {
	console.log('MongoDB database connection established successfully');
});
// Open the server instance to listen for requests.
server.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
