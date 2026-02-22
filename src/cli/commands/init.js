const fs = require('fs');
const path = require('path');

module.exports = function init() {
    const configPath = path.resolve(process.cwd(), 'mock-routes.json');

    if (fs.existsSync(configPath)) {
        console.error('❌ mock-routes.json already exists');
        process.exit(1);
    }

    const defaultConfig = {
        "/users": {
            "GET": {
                "status": 200,
                "response": [
                    {
                        "id": 1,
                        "name": "John Doe"
                    }
                ]
            }
        },
    };

    fs.writeFileSync(
        configPath,
        JSON.stringify(defaultConfig, null, 2),
        'utf-8'
    );

    console.log('✅ mock-routes.json created successfully');
};
