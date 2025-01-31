import { Request, Response } from 'express';
import { GroqService } from './groqServices';
import { GroqRequest, ChatMessage } from '../../types/llmTypes';
import { Preprocessor } from '../processing/preprocessor';

export class GroqController {
    private groqService: GroqService;
    private preprocessor: Preprocessor;

    constructor() {
        this.groqService = new GroqService();
        this.preprocessor = new Preprocessor();
    }

    async generateCompletion(req: Request, res: Response): Promise<void> {
        try {
            const request: GroqRequest = {
                model: "llama-3.3-70b-versatile",
                // messages: this.preprocessor.formatMessages(req.body.content)
                messages: req.body.content
            };
            
            const content = await this.groqService.generateCompletion(request);
            res.json({ content });
        } catch (error) {
            res.status(500).json({ error: `Error generating completion: ${error}` });
        }
    }
}