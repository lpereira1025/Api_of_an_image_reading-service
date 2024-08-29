import { Request, Response } from 'express';
import { measurementService } from '../services/measurementService';
import { handleError } from '../utils/errorHandler';

export const confirmMeasurement = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    const result = await measurementService.confirmMeasurement(measure_uuid, confirmed_value);

    if (!result) {
      return res.status(404).json({ error_code: 'MEASURE_NOT_FOUND', error_description: 'Leitura não encontrada' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    handleError(error, res, 400);
  }
};
