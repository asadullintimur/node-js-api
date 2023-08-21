//init
const dotenv = require('dotenv');
dotenv.config();

//import services
const postRouter = require('./src/routers/postRouter'),
    Server = require('./src/services/Server');

//init server
const server = new Server();
server.addRouter(postRouter);

//init middlewares
const sendJson = require('./src/middlewares/response/sendJson'),
    parseBody = require('./src/middlewares/request/parseBody'),
    parseUrl = require('./src/middlewares/request/parseUrl');

server.useMiddleware(sendJson)
server.useMiddleware(parseBody)
server.useMiddleware(parseUrl(`http://localhost:${process.env.PORT}`))


//start application
const mongoose = require('mongoose');

async function start() {
        const {DB_CONNECTION_STRING} = process.env;

        await mongoose.connect(DB_CONNECTION_STRING);

        //start server
        const {PORT} = process.env;
        server.listen(PORT, () => console.log('server was started'));
}

start();


