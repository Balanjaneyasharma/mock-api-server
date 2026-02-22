const schemaDisplay = `
╔══════════════════════════════════════════════════════╗
║            Mock API Server - Schema Guide            ║
╚══════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 📁 ROUTE STRUCTURE  (mock-routes.json)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Supported HTTP Methods: GET | POST | PUT | PATCH | DELETE

  Each route follows this structure:

  {
    "/your-path": {
      "METHOD": {
        "status": 200,         (required) HTTP status code
        "response": [...],     (optional) Static JSON response
        "schema": {...}        (optional) Dynamic - overrides response if both given
      }
    }
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🧩 SCHEMA TYPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  🔤 STRING
     { "type": "string" }
     ├── format    (optional) : "email" | "phoneNumber" | "date" | "date-time" | "name"
     ├── minLength (optional) : number
     ├── maxLength (optional) : number
     └── enum      (optional) : ["active", "inactive"]  → picks one randomly

  🔢 NUMBER
     { "type": "number" }
     ├── min  (optional) : number
     ├── max  (optional) : number
     └── enum (optional) : [1, 2, 3]  → picks one randomly

  ✅ BOOLEAN
     { "type": "boolean" }

  🪪 ID
     { "type": "id" }
     └── format (required) : "number" | "uuid"

  🈳 NULL
     { "type": "null" }

  📦 ARRAY
     { "type": "array" }
     ├── items    (required) : <any schema type>
     ├── minItems (optional) : number
     └── maxItems (optional) : number

  🗂️  OBJECT
     { "type": "object" }
     ├── properties (required) : { "key": <any schema type> }
     └── required   (optional) : ["key1", "key2"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 📄 FULL EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    "/users": {
      "GET": {
        "status": 200,
        "schema": {
          "type": "array",
          "minItems": 2,
          "maxItems": 5,
          "items": {
            "type": "object",
            "properties": {
              "id":     { "type": "id", "format": "uuid" },
              "name":   { "type": "string", "format": "name" },
              "email":  { "type": "string", "format": "email" },
              "role":   { "type": "string", "enum": ["admin", "user", "guest"] },
              "age":    { "type": "number", "min": 18, "max": 60 },
              "active": { "type": "boolean" }
            },
            "required": ["id", "name", "email"]
          }
        }
      },
      "POST": {
        "status": 201,
        "response": { "message": "User created successfully" }
      }
    },
    "/products/:id": {
      "GET": {
        "status": 200,
        "response": { "id": 1, "name": "Sample Product", "price": 29.99 }
      },
      "DELETE": {
        "status": 204,
        "response": null
      }
    }
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 💡 TIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  • Use "response" for simple static data
  • Use "schema" for realistic auto-generated data (faker.js powered)
  • Schema types can be nested freely — arrays of objects, objects with arrays etc.
  • POST and PUT routes validate request body against "schema" if provided
  • Default port is 3000, override with: mock-api start --port 8080

`;

module.exports = schemaDisplay;