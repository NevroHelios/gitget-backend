import axios from 'axios';
import { GroqRequest, GroqResponse } from '../../types/llmTypes';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
export class GroqService {
    async generateCompletion(request: GroqRequest): Promise<string> {
        try {
            const response = await axios.post(
                "https://api.groq.com/openai/v1/chat/completions",
                request,
                {
                    headers: {
                        'Authorization': `Bearer ${GROQ_API_KEY}`,
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