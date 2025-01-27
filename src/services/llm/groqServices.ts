import axios from 'axios';
<<<<<<< HEAD
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
=======
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
>>>>>>> e3716de7ef2ced8970d6a89689d4b3de11a8b370
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