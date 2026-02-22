# 🧪 Mock API Server

A lightweight CLI tool to spin up a mock API server instantly — no backend required. Define your routes in a JSON file and get realistic, schema-driven dynamic responses powered by faker.js.

---

## 🚀 Features

- ✅ Supports all HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- 🧠 Dynamic data generation using a custom JSON schema (faker.js powered)
- 🔒 Payload validation for `POST` and `PUT` requests
- 📦 Simple CLI — init, configure, start
- 🔧 Static or dynamic responses — your choice per route
- 🗂️ Nested schema support — arrays of objects, objects with arrays, etc.

---

## 📦 Installation

```bash
npm install -g mock-api-server
```

---

## 🔧 Usage

### 1. Initialize

Run this in your project directory to create a `mock-routes.json` config file with an example route:

```bash
mock-api init
```

### 2. Configure Routes

Edit the generated `mock-routes.json` to define your routes. Not sure about the schema format? Run:

```bash
mock-api schema
```

### 3. Start the Server

```bash
mock-api start
```

Default port is `3000`. To use a custom port:

```bash
mock-api start --port 8080
```

To use a custom config file:

```bash
mock-api start --config ./path/to/custom-routes.json
```

---

## 📁 mock-routes.json Structure

Each route maps to an HTTP method, and each method has a config with a status code and either a static `response` or a dynamic `schema`.

```json
{
  "/your-path": {
    "METHOD": {
      "status": 200,
      "response": {},
      "schema": {}
    }
  }
}
```

> If both `response` and `schema` are provided, `schema` takes precedence.

---

## 📄 Full Example

```json
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
```

---

## 🧩 Supported Schema Types

| Type      | Key Properties |
|-----------|---------------|
| `string`  | `format`: `"email"` \| `"phoneNumber"` \| `"date"` \| `"date-time"` \| `"name"`, `minLength`, `maxLength`, `enum` |
| `number`  | `min`, `max`, `enum` |
| `boolean` | — |
| `null`    | — |
| `id`      | `format`: `"number"` \| `"uuid"` |
| `array`   | `items` (any schema type), `minItems`, `maxItems` |
| `object`  | `properties` (map of schema types), `required` |

Run `mock-api schema` anytime to see this reference in your terminal.

---

## 🔒 Request Validation

For `POST` and `PUT` routes, if a `schema` is defined the request body is automatically validated against it. Invalid requests receive a `422` response with details about which fields failed.

---

## 📚 CLI Commands

| Command | Description |
|---------|-------------|
| `mock-api init` | Create `mock-routes.json` in current directory |
| `mock-api start` | Start the server (default port 3000) |
| `mock-api start --port <number>` | Start on a custom port |
| `mock-api start --config <path>` | Use a custom config file |
| `mock-api schema` | Print schema type reference |

---

## 📦 Use Cases

- Frontend development without waiting for a backend
- UI testing with randomized, realistic data
- API behavior simulation for QA and demos
- Rapid prototyping

---

## ✨ Future Plans

- [ ] Hot-reloading routes without restart
- [ ] OpenAPI / Swagger export support
- [ ] `enum` support on all schema types

---

## 🛠 Maintainer

Built with ❤️ by Balanjaneya Sharma
