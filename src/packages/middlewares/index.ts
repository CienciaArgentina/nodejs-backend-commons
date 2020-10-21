import { handleBodyRequestParsing, handleCompression, checkHeaders } from './common';
import { handleLogger } from './handleLogger';

export * from './auth';
export default [checkHeaders, handleBodyRequestParsing, handleCompression, handleLogger];
