const path = require("path");
const { startServer } = require("../../server");

module.exports = function start(args = []) {
    // Parse port
    let port = 3000;
    const portIndex = args.indexOf("--port");
    if (portIndex !== -1 && args[portIndex + 1]) {
        port = Number(args[portIndex + 1]);
    }

    // Optional custom config
    let mockRoutesPath = path.resolve(process.cwd(), "mock-routes.json");
    const configIndex = args.indexOf("--config");
    if (configIndex !== -1 && args[configIndex + 1]) {
        mockRoutesPath = path.resolve(process.cwd(), args[configIndex + 1]);
    }

    startServer({ port, mockRoutesPath });
};