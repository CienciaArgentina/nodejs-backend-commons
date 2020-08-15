import Knex from 'knex';
import { Model } from 'objection';

export const connectDb = (config: object): void => {
  const knex = Knex(config);
  Model.knex(knex);
};
