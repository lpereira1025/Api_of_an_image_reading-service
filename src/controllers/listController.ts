import { Request, Response } from 'express';
import { measurementService } from '../services/measurementService';
import { handleError } from '../utils/errorHandler';

export const listMeasurements = async (req: Request, res: Response) => {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    const measurements = await measurementService.getMeasurements(customer_code, measure_type as string);

    if (measurements.length === 0) {
      return res.status(404).json({ error_code: 'MEASURES_NOT_FOUND', error_description: 'Nenhuma leitura encontrada' });
    }

    res.status(200).json({ customer_code, measures: measurements });
  } catch (error) {
    handleError(error, res, 400);
  }
};
