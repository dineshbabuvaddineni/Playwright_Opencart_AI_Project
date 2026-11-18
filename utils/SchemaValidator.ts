import Ajv from 'ajv';
import { DataProvider } from './DataReader';

export class SchemaValidator {
    /**
     * Validates a JSON value against a JSON schema file
     * @param schemaPath - Path to the schema file
     * @param data - Response data to validate
     * @returns An object with isValid flag and error messages
     */
    static validate(schemaPath: string, data: unknown): { isValid: boolean; errors: string[] } {
        const schema = DataProvider.readJson(schemaPath);
        const ajv = new Ajv({ allErrors: true });
        const validate = ajv.compile(schema);
        const isValid = validate(data);

        const errors = (validate.errors ?? []).map((error) => {
            const path = error.instancePath || '/';
            return `${path} ${error.message}`;
        });

        return { isValid, errors };
    }
}
