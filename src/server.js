const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra");;
const { generateRandomData } = require("./utilities/randomGenerator");
const { validateSchema } = require("./utilities/schemaValidator");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const SCHEMA_DIR = "./schemas"; // Directory to store schemas
fs.ensureDirSync(SCHEMA_DIR); // Ensure the directory exists


const loadMockRoutes = (mockRoutesPath) => {
    try {
        if (!fs.existsSync(mockRoutesPath)) {
            console.error("❌ mock-routes.json not found");
            console.error("👉 Run: mock-api-server init, to create mock-routes.json, update with paths and required mock data");
            process.exit(1);
        }

        const mockData = JSON.parse(fs.readFileSync(mockRoutesPath, "utf-8"));

        // Remove all previously registered routes
        app._router.stack = app._router.stack.filter(layer => !layer.route);

        let registeredRoutes = [];

        Object.entries(mockData).forEach(([route, methods]) => {
            Object.entries(methods).forEach(([method, { status, response, schema }]) => {
                app[method.toLowerCase()](route, (req, res) => {
                    if (schema && response) {
                        console.warn(`⚠️ Route ${method} ${route} has both schema and response. Schema will be used.`);
                    }

                    if (["POST", "PUT"].includes(method) && schema) {
                        const isValid = validateSchema(schema, req.body);
                        if (!isValid) {
                            return res.status(400).json({ 
                                error: "Invalid request body",
                                message: "Request payload does not match the required schema"
                            });
                        }
                    }

                    if (method === "GET" && schema) {
                        const generatedData = generateRandomData(schema);
                        console.log(generatedData, 'generatedData');
                        return res.status(status).json({ data: generatedData, status });
                    }

                    if (method === "DELETE") {
                        return res.status(204).send();
                    }
                    
                    res.status(status).json({ data: response, status: status });
                });
                registeredRoutes.push({ method: method.toUpperCase(), path: route });
            });
        });

        console.log("✅ Mock routes loaded successfully!");
        console.table(registeredRoutes);
    } catch (error) {
        console.error(`error occurred while loading mock routes`, error?.message)
    }
}

const  startServer = ({port, mockRoutesPath}) => {
    loadMockRoutes(mockRoutesPath);
    app.listen(port, () => {
        console.log(`🚀 Mock API server running at http://localhost:${port}`);
    });
}

module.exports = { startServer };