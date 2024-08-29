import { Router } from 'express';
import { listMeasurements } from '../controllers/listController';

const router = Router();

router.get('/:customer_code/list', listMeasurements);

export default router;
