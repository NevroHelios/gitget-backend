import { Router } from 'express';
import { ModelController } from '../controllers/modelController';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const modelController = new ModelController();

router.post('/generate', 
    rateLimiter,
    (req, res) => modelController.generateResponse(req, res)
);

export default router;