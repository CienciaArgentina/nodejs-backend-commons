export interface HttpCienciaError {
  id: string;
  status: number;
  message?: string;
  errors?: CienciaError[];
}

export interface CienciaError {
  detail?: string;
  code: string;
}
