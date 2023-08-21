const Emitter = require('events'),
    http = require('http');

class Server {
    constructor() {
        this.emitter = new Emitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    useMiddleware(middleware) {
        this.middlewares.push(middleware);
    }

    listen(port, cb) {
        this.server.listen(port, cb);
    }

    addRouter(router) {
        const { routes } = router;

        Object.keys(routes).forEach(route => {
            Object.keys(routes[route]).forEach(method => {
                const handler = routes[route][method];

                this.emitter.on(this._getRouterMask(route, method), handler);
            })
        })
    }

    async _invokeMiddlewares(req, res) {
        const middlewareCalls = this.middlewares.map(middleware => middleware(req, res));

        return await Promise.all(middlewareCalls);
    }

    _createServer() {
        return http.createServer(async (req, res) => {
            await this._invokeMiddlewares(req, res);

            const {  pathname, method } = req;

            this.emitter.emit(this._getRouterMask(pathname, method), req, res);
        })
    }

    _getRouterMask(path, method) {
        return `[${path}]:[${method}]`
    }
}

module.exports = Server;