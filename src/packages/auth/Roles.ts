interface Claims {
  id: number;
  description: string;
}

export interface Roles {
  id: number;
  description: string;
  claims: Claims[];
}
