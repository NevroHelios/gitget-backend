import { Message } from "../../types/llmTypes";

export class Preprocessor {
    sanitizeInput(text: string): string {
        return text.trim().replace(/\s+/g, ' ');
    }

    formatMessages(content: string): Message[] {
        return [{
            role: 'user',
            content: this.sanitizeInput(content)
        }];
    }
}