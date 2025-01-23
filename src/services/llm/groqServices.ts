import axios from 'axios';
import { GroqRequest, GroqResponse } from '../../types/llmTypes';

export class GroqService {
    private apiKey: string;
    private baseURL: string = 'https://api.groq.com/openai/v1';

    constructor() {
        this.apiKey = process.env.GROQ_API_KEY || '';
    }

    async generateCompletion(request: GroqRequest): Promise<GroqResponse> {
        try {
            const response = await axios.post(
                `${this.baseURL}/chat/completions`,
                request,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(`Groq API error: ${error}`);
        }
    }
}