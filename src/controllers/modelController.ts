// llm model
import { Request, Response } from 'express';
import { GroqService } from '../services/llm/groqServices';
import { Preprocessor } from '../services/processing/preprocessor';
import { Postprocessor } from '../services/processing/postprocessor';
import { format } from 'path';

export class ModelController {
    private groqService: GroqService;
    private preprocessor: Preprocessor;
    private postprocessor: Postprocessor;

    constructor() {
        this.groqService = new GroqService();
        this.preprocessor = new Preprocessor();
        this.postprocessor = new Postprocessor();
    }

    async generateResponse(req: Request, res: Response) {
        try {
            const { prompt } = req.body;
            const messages = this.preprocessor.formatMessages(prompt);
            
            const response = await this.groqService.generateCompletion({
                model: "llama-3.3-70b-versatile",
                messages
            });

            const formattedResponse = this.postprocessor.formatResponse(response);
            res.json({ response: formattedResponse });
        } catch (error) {
            res.status(500).json({ error: 'Model processing failed' });
        }
    }
}