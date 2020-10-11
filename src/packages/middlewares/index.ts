import { authMiddleware } from './auth';
import { handleBodyRequestParsing, handleCompression, checkHeaders } from './common';
import { handleLogger } from './handleLogger';

export default [checkHeaders, handleBodyRequestParsing, handleCompression, handleLogger,authMiddleware];
