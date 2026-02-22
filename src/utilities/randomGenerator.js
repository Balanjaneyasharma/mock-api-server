const { faker } = require('@faker-js/faker');

/**
 * Converts a UTC date-time to Indian Standard Time (IST - UTC+5:30).
 * @param {string} isoDateTime - The UTC date-time string.
 * @returns {string} - Formatted IST date-time string in "YYYY-MM-DD HH:mm:ss" format.
 */

/**
 * Generates random data based on the provided JSON schema.
 * @param {JSONSchema} schema - The JSON schema to generate data from.
 * @returns {any} - The generated random data on the basis of the schema.
 */
const generateRandomData = (schema) => {
	switch (schema.type) {
		case "string":
			if (schema.enum) {
				return faker.helpers.arrayElement(schema.enum);
			}
			const strLength = faker.number.int({ min: schema.minLength || 3, max: schema.maxLength || 10 });
			switch (schema.format) {
				case "email":
					return faker.internet.email();
				case "date":
					return faker.date.anytime().toISOString().split("T")[0];
				case "date-time":
					return faker.date.anytime().toISOString();
				case "phoneNumber":
					return faker.phone.number();
				case "name":
					return faker.person.fullName();
				default:
				return faker.string.alpha({ length: strLength });
			}
		case "id":
			if (schema.format === "uuid") return faker.string.uuid();
			return faker.number.int({ min: 1, max: 100000 });

		case 'number':
			if (schema.enum) {
				return faker.helpers.arrayElement(schema.enum);
			}
			return faker.number.int({ min: schema.min || 1, max: schema.max || 100 });

		case 'boolean':
			return faker.datatype.boolean();

		case 'null':
			return null;

		case 'array':
			const length = faker.number.int({
				min: schema.minItems ?? 1,
				max: schema.maxItems ?? 5
			});
			return Array.from({ length }, () => generateRandomData(schema.items));

		case 'object':
			const obj = {};
			for (const key in schema.properties) {
				obj[key] = generateRandomData(schema.properties[key]);
			}
			return obj;

		default:
			throw new Error(`Unsupported schema type: ${schema.type}`);
	}
}
module.exports = { generateRandomData };

