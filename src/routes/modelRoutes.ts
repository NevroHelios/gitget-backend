import { Router } from 'express';
import { ModelController } from '../controllers/modelController';
import { rateLimiter } from '../middleware/rateLimiter';

const groqRouter = Router();
const modelController = new ModelController();

groqRouter.post('/generate', 
    rateLimiter,
    (req, res) => modelController.generateResponse(req, res)
);

export default groqRouter;