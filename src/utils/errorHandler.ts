import { Response } from 'express';

export function handleError(error: unknown, res: Response, defaultStatusCode = 500): void {
  if (error instanceof Error) {
    res.status(defaultStatusCode).json({ error_code: 'ERROR', error_description: error.message });
  } else {
    res.status(defaultStatusCode).json({ error_code: 'UNKNOWN_ERROR', error_description: 'Ocorreu um erro desconhecido' });
  }
}
