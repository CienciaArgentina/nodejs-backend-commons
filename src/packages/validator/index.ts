//todo: llevarlo a las commons
import { ValidationError,CienciaError } from '../error';
import ajv, { ErrorObject } from 'ajv';
import { v1 as uuidv1 } from 'uuid';

const toValidationError = ({ keyword, message, dataPath }: ErrorObject): CienciaError => {
    const property = dataPath.replace('.', '');
    const code = `${property}.${keyword}`;

    return {
      code,
      detail:message,
    };
  };
  
  export const validateJsonSchema = (schema: string | boolean | object, data: object,message?:string): ValidationError | null=> {
    const validator = new ajv({ allErrors: true, errorDataPath: 'property' });
    const isValid = validator.validate(schema, data);
    
    const error : ValidationError = {
      id: uuidv1(),
      status: 400,
      message: message || 'validation.error', 
    }

    if (!isValid && validator.errors) {
      const errors = validator.errors.map((x) => toValidationError(x));
      error.errors = errors;
      return error;
    }
  
    return null;
  };