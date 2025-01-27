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
            const request = req.body as GroqRequest;
            const result = await this.groqService.generateCompletion(request);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: `Error generating completion: ${error}` });
        }
    }

    async streamCompletion(req: Request, res: Response): Promise<void> {
        try {
            const request = req.body as GroqRequest;
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const stream = await this.groqService.streamCompletion(request);
            stream.on('data', (data) => res.write(`data: ${JSON.stringify(data)}\n\n`));
            stream.on('end', () => res.end());
        } catch (error) {
            res.status(500).json({ error: `Error streaming completion: ${error}` });
        }
    }

    async getModels(req: Request, res: Response): Promise<void> {
        try {
            const models = await this.groqService.getAvailableModels();
            res.json({ models });
        } catch (error) {
            res.status(500).json({ error: `Error fetching models: ${error}` });
        }
    }

    async getUsage(req: Request, res: Response): Promise<void> {
        try {
            const { startDate, endDate } = req.query;
            const usage = await this.groqService.getUsageStats(
                startDate as string,
                endDate as string
            );
            res.json({ usage });
        } catch (error) {
            res.status(500).json({ error: `Error fetching usage: ${error}` });
        }
    }

    async saveMessage(req: Request, res: Response): Promise<void> {
        try {
            const message = req.body as ChatMessage;
            const savedMessage = await this.groqService.saveMessageToHistory(message);
            res.json({ message: savedMessage });
        } catch (error) {
            res.status(500).json({ error: `Error saving message: ${error}` });
        }
    }

    async getMessageHistory(req: Request, res: Response): Promise<void> {
        try {
            const { conversationId } = req.params;
            const history = await this.groqService.getMessageHistory(conversationId);
            res.json({ history });
        } catch (error) {
            res.status(500).json({ error: `Error fetching message history: ${error}` });
        }
    }
}
