import Knex from 'knex';
import { Model, ForeignKeyViolationError, ValidationError } from 'objection';

export const connectDb = (config: any): void => {
  const knex = Knex(config);
  Model.knex(knex);
};
