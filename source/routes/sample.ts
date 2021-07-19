import express from 'express';
import controller from '../controllers/sample';

const router = express.Router();

//defining get request, calling sampleHealthCheck from controller if message is 'ping'
router.get('/ping', controller.sampleHealthCheck);

export = router;
