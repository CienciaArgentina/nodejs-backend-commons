import { Roles } from './Roles';

export interface JwtToken {
  auth_id?: string;
  username?: string;
  email?: string;
  expires_at?: number;
  roles: Roles[] | string;
}
