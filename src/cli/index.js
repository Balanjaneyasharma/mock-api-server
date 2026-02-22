#!/usr/bin/env node

const args = process.argv.slice(2);
const command = args[0];
const restArgs = args.slice(1);

switch (command) {
    case 'init':
        require('./commands/init')();
        break;

    case 'start':
        require('./commands/start')(restArgs);
        break;

    case 'schema':
        require('./commands/schema')();
        break;

    default:
        console.log(`
            Usage:
            mock-api-server init to create a new mock-routes.json configuration file
            mock-api-server start [--port <number>] to start the server with optional port configuration
            mock-api-server schema to display the supported JSON schema format for route definitions
            `
        );
}
