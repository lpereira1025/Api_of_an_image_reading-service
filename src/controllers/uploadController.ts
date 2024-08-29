import { Request, Response } from 'express';
import { geminiService } from '../services/geminiService';
import { measurementService } from '../services/measurementService';
import { handleError } from '../utils/errorHandler';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    const exists = await measurementService.checkDuplicate(customer_code, measure_type, measure_datetime);
    
    if (exists) {
      return res.status(409).json({ error_code: 'DOUBLE_REPORT', error_description: 'Leitura do mês já realizada' });
    }
    
    const geminiResponse = await geminiService.processImage(image);
    const measure_uuid = await measurementService.saveMeasurement({
      ...geminiResponse,
      customer_code,
      measure_datetime,
      measure_type,
      has_confirmed: false,
    });

    res.status(200).json({ image_url: geminiResponse.image_url, measure_value: geminiResponse.measure_value, measure_uuid });
  } catch (error) {
    handleError(error, res, 400);
  }
};
