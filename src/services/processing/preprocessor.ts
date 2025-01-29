import { CodeEssence, searchDirectory, DiffAnalyzer, newDiffAnalyzer, filterImportantChanges } from './regex';

interface PreprocessedData {
    files: CodeEssence[];
    aggregatedImports: string[];
    aggregatedFunctions: string[];
    aggregatedVariables: string[];
    importantChanges: string[];
}

class Preprocessor {
    formatMessages(content: any): import("../../types/llmTypes").Message[] {
        throw new Error('Method not implemented.');
    }
    private analyzer: DiffAnalyzer;

    constructor() {
        this.analyzer = newDiffAnalyzer();
    }

    /** Process directory and return data */
    async processDirectory(rootDir: string): Promise<PreprocessedData> {
        const codeEssences = await searchDirectory(rootDir);
        const diffLines = await this.generateDiffLines(codeEssences);
        
        return {
            files: codeEssences,
            aggregatedImports: this.aggregateItems(codeEssences, 'imports'),
            aggregatedFunctions: this.aggregateItems(codeEssences, 'functions'),
            aggregatedVariables: this.aggregateItems(codeEssences, 'variables'),
            importantChanges: filterImportantChanges(diffLines, this.analyzer)
        };
    }

    /** Aggregate items from essences */
    private aggregateItems(essences: CodeEssence[], key: keyof CodeEssence): string[] {
        return essences.reduce((acc: string[], essence) => {
            const items = essence[key] || [];
            return [...acc, ...items];
        }, []);
    }

    /** Generate diff lines for analysis */
    private async generateDiffLines(essences: CodeEssence[]): Promise<string[]> {
        // Mock impl using existing data
        return essences.flatMap(essence => [
            `diff --git a/${essence.filePath} b/${essence.filePath}`,
            ...(essence.imports || []).map(line => `+ ${line}`),
            ...(essence.functions || []).map(line => `+ ${line}`),
            ...(essence.variables || []).map(line => `+ ${line}`)
        ]);
    }

    /** Clean empty/undefined values */
    cleanResults(data: PreprocessedData): PreprocessedData {
        return {
            ...data,
            aggregatedImports: data.aggregatedImports.filter(Boolean),
            aggregatedFunctions: data.aggregatedFunctions.filter(Boolean),
            aggregatedVariables: data.aggregatedVariables.filter(Boolean),
            importantChanges: data.importantChanges.filter(Boolean)
        };
    }
}

// Example usage
/*
async function main() {
    const preprocessor = new Preprocessor();
    const results = await preprocessor.processDirectory('./src');
    const cleaned = preprocessor.cleanResults(results);
    console.log('Preprocessed data:', cleaned);
}

main().catch(console.error);
*/

export { Preprocessor, PreprocessedData };