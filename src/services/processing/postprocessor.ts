import { GroqResponse } from "../../types/llmTypes";

export class Postprocessor {
    formatResponse(response: GroqResponse | string): string {
        return (response as any).choices[0]?.message?.content || '';
    }
}