const Client = require('../index');

(async() => {
    const client = await Client.create('ws://localhost:3000/', 'auth-token');

    client.on('something', (foo) => console.log(foo));
})();
