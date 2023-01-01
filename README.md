# action-tunnel-client
Send or receive action commands to/from other clients when you are not publicly accessable.

## Installation
To use the client in your node project, just install it as a dependency:
```shell
npm install action-tunnel-client --save
```

## Usage
### Connecting
```javascript
const ActionTunnelClient = require('action-tunnel-client');
const client = await Client.create('ws://localhost:3000/', 'auth-token');
```

Connect to the action-tunnel-server with its IP/DNS, port and auth token you defined at the server. See https://github.com/byWulf/action-tunnel-client for more information.

### Sending actions
```javascript
await client.send('statusLed', {color: '#ffaa00'});
```

### Receiving actions
```javascript
client.on('statusLed', (payload) => console.log('Changing led color to ' + payload.color));
```
