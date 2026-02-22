/**
 * Supported HTTP methods for mock routes
 * @typedef {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} HTTPMethod
 */

/**
 * Configuration for a single route method
 *
 * @typedef {Object} RouteMethodConfig
 * @property {number} status - HTTP status code to return.
 * @property {*} [response] - Static JSON response to return.
 * @property {JSONSchema} [schema] - Dynamic response schema used to generate mock data.
 *
 * @description
 * - Either `response` or `schema` should be provided.
 * - If both are provided, `schema` takes precedence.
 * - `schema` uses the definitions from json-schema.js.
 */

/**
 * Defines all HTTP methods for a single API route
 *
 * @typedef {Object.<HTTPMethod, RouteMethodConfig>} RouteMethods
 *
 * @example
 * {
 *   "GET": {
 *     "status": 200,
 *     "response": []
 *   }
 * }
 */

/**
 * Defines the complete structure of mock-api-routes.json
 *
 * @typedef {Object.<string, RouteMethods>} MockRoutes
 *
 * @example
 * {
 *   "/users": {
 *     "GET": {
 *       "status": 200,
 *       "schema": {
 *         "type": "array",
 *         "items": {
 *           "type": "object",
 *           "properties": {
 *             "id": { "type": "id", "format": "number" },
 *             "name": { "type": "string", "format": "name" }
 *           },
 *           "required": ["id", "name"]
 *         }
 *       }
 *     }
 *   }
 * }
 */
