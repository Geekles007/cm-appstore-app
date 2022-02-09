import { Router, Request, Response } from 'express';
import { APP_NAME, WEB_URL } from '../core/config';
import { getSummary } from '../controllers/common.controller';

export const defaultRoute = (): Router => {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    res.render('index', { appName: APP_NAME, webURL: WEB_URL });
  });

  router.get('/summary', getSummary);

  return router;
};
