import { Router } from 'express';
import sendAirqualityData from '../controllers/airQualityDataController';
import loginToken from '../controllers/login';

const router = Router();


  router.get('/home',sendAirqualityData);
  router.get('/home/:pageno([1-5])',sendAirqualityData);
  router.post('/login',loginToken);

export default router;