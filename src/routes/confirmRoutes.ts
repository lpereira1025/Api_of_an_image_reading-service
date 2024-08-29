import { Router } from 'express';
import { confirmMeasurement } from '../controllers/confirmController';

const router = Router();

router.patch('/confirm', confirmMeasurement);

export default router;
