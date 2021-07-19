//when we define middleware for this file, it already has types associated with it
import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    //testing if the api is working for the sample call
    logging.info(NAMESPACE, `Sample health check route called.`);

    //sending pong message back
    return res.status(200).json({
        message: 'pong'
    });
};

export default { sampleHealthCheck };
