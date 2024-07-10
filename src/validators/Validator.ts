import { isInt, isIn, isMongoId, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Pet } from '../models/Pet/Pet';

// Define allowed query parameters and their validation rules
const ALLOWED_PARAMS = {
    page: (value: any) => isInt(value), // Page numbers should be integers
    limit: (value: any) => isInt(value), // Limit should be integers
    _id: (value: any) => isMongoId(value), // MongoDB ObjectId validation
    dataSource: (value: any) => isIn(value, ['json', 'db', 'db_json']) // Valid data source options
};

/**
 * Custom error class for validation errors.
 */
export class ValidationError extends Error {
    errors: any[];

    /**
     * Constructs a new ValidationError with a message and detailed errors.
     * @param message - The error message.
     * @param errors - An array of detailed errors.
     */
    constructor(message: string, errors: any[]) {
        super(message);
        this.name = 'ValidationError';
        this.errors = errors;
    }
}

/**
 * Validates a pet object by checking its properties using class-validator.
 * Throws a ValidationError if validation fails.
 * @param pet - The pet object to validate.
 */
export function validatePetParams(pet: any): void {
    validateNotNull(pet);

    const petInstance = plainToInstance(Pet, pet);

    // Validate the pet instance
    const errors = validateSync(petInstance, { skipMissingProperties: false });

    if (errors.length > 0) {
        const detailedErrors = errors.map(err => {
            return {
                property: err.property,
                constraints: err.constraints,
            };
        });
        throw new ValidationError('Validation failed!', detailedErrors);
    }
}

/**
 * Checks if the provided obj object is not null or undefined.
 * Throws an error if the obj object is null or undefined.
 * @param obj - The pet object to check.
 */
export function validateNotNull(obj: any): void {
    if (!obj) {
        throw new Error('Pet is not found!');
    }
}

/**
 * Validates query parameters based on predefined rules.
 * Throws a ValidationError if any parameter is invalid or if there are unexpected parameters.
 * @param query - The query parameters to validate.
 */
export function validateUrlParams(query: any): void {
    const errors: any[] = [];

    // Validate each parameter according to the rules
    for (const [key, validate] of Object.entries(ALLOWED_PARAMS)) {
        if (query[key] !== undefined) {
            if (!validate(query[key])) {
                errors.push({
                    parameter: key,
                    message: `${key} has invalid value`
                });
            }
        }
    }

    // Check for any extra parameters not allowed
    for (const key of Object.keys(query)) {
        if (!(key in ALLOWED_PARAMS)) {
            errors.push({
                parameter: key,
                message: `Unexpected parameter ${key}`
            });
        }
    }

    if (errors.length > 0) {
        throw new ValidationError('Query validation failed!', errors);
    }
}
