class Router {
    constructor() {
        this.routes = {};
    }

    registerRoute(route, method, handler) {
        if (this._checkRouteNotRegister(route)) this.routes[route] = {};

        this.routes[route][method] = handler;
    }

    get(route, handler) {
        this.registerRoute(route, 'GET', handler);
    }
    post(route, handler) {
        this.registerRoute(route, 'POST', handler);
    }
    delete(route, handler) {
        this.registerRoute(route, 'DELETE', handler);
    }
    put(route, handler) {
        this.registerRoute(route, 'PUT', handler);
    }

    _checkRouteNotRegister(route) {
        return !this.routes[route];
    }
}

module.exports = Router