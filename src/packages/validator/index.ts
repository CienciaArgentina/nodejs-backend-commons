//todo: llevarlo a las commons
import { HTTPCienciaError, CienciaError } from '../error';
import ajv, { ErrorObject } from 'ajv';
import { v1 as uuidv1 } from 'uuid';
import { HttpStatusErrorCode } from '../../commons/constants';

const toValidationError = ({ keyword, message, dataPath }: ErrorObject): CienciaError => {
  const property = dataPath.replace('.', '');
  const code = `${property}.${keyword}`;

  return {
    code,
    detail: message,
  };
};

export const validateJsonSchema = (
  schema: string | boolean | object,
  data: object,
  message?: string
): HTTPCienciaError | null => {
  const validator = new ajv({ allErrors: true, errorDataPath: 'property' });
  const isValid = validator.validate(schema, data);

  if (!isValid && validator.errors) {
    const errors = validator.errors.map((x) => toValidationError(x));
    const error = new HTTPCienciaError(HttpStatusErrorCode.BadRequest, message || 'validation.error', errors);
    return error;
  }

  return null;
};
