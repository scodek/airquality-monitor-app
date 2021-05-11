import { Router } from 'express';
import sendAirqualityData from '../controllers/airQualityDataController';

const router = Router();


  router.get('/home',sendAirqualityData);
  router.get('/home/[1-5]',sendAirqualityData);

export default router;