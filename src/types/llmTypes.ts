export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface GroqRequest {
    model: string;
    messages: Message[];
    temperature?: number;
    max_tokens?: number;
}

export interface GroqResponse {
    id: string;
    choices: Array<{
        message: Message;
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}