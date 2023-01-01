const client = require('socket.io-client');

class ActionTunnelClient {
    registeredActions = [];

    constructor(socket) {
        this.socket = socket;

        this.socket.on('action', (name, payload) => {
            this.registeredActions.forEach((actionObject) => {
                if (actionObject.actionName === name) {
                    actionObject.callback(payload);
                }
            });
        });
    }

    on(actionName, callback) {
        this.registeredActions.push({actionName, callback});
    }

    send(actionName, payload) {
        return new Promise((resolve) => {
            this.socket.emit('action', actionName, payload, resolve);
        });
    }

    close() {
        this.socket.disconnect();
    }
}

function createClient(url, authToken) {
    return new Promise((resolve, reject) => {
        const socket = client.connect(url, {
            auth: {
                token: authToken
            }
        });

        socket.on('auth-error', (errorMessage) => {
            reject(errorMessage);
        });

        socket.on('authenticated', () => {
            resolve(new ActionTunnelClient(socket));
        });
    });
}

module.exports = {
    create: createClient
};


