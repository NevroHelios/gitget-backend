import { Request, Response } from 'express';
import { GroqService } from './groqServices';
import { GroqRequest, ChatMessage } from '../../types/llmTypes';

export class GroqController {
    private groqService: GroqService;

    constructor() {
        this.groqService = new GroqService();
    }

    async generateCompletion(req: Request, res: Response): Promise<void> {
        try {
            const request: GroqRequest = {
                model: "llama-3.3-70b-versatile",
                messages: [{
                    role: 'user',
                    content: req.body.prompt
                }]
            };
            
            const content = await this.groqService.generateCompletion(request);
            res.json({ content });
        } catch (error) {
            res.status(500).json({ error: `Error generating completion: ${error}` });
        }
    }
}
