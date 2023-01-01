const Client = require('../index');

(async() => {
    const client = await Client.create('ws://localhost:3000/', 'auth-token');

    await client.send('something', {hello: true});
})();
