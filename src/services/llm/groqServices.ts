import axios from 'axios';
import config from '../../config/llmConfig';
import { GroqRequest, GroqResponse } from '../../types/llmTypes';

export class GroqService {
    private config = new config();

    async generateCompletion(request: GroqRequest): Promise<string> {
        try {
            const response = await axios.post(
                this.config.URL,
                request,
                {
                    headers: {
                        'Authorization': `Bearer ${this.config.API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            // Extract just the content from the response
            return response.data;
        } catch (error) {
            throw new Error(`Groq API error: ${error}`);
        }
    }
}