export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
}

export enum HttpStatusErrorCode {
  NotFound = 404,
  Unauthorized = 401,
  BadRequest = 400,
  Forbidden = 403,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export enum Environment {
  Development = 'development',
  staging = 'staging',
  Production = 'production',
}

export enum CommonPath {
  Health = '/ping',
}
