import { GroqResponse } from "../../types/llmTypes";

export class Postprocessor {
    formatResponse(response: GroqResponse): string {
        return response.choices[0]?.message?.content || '';
    }
}