import * as fs from 'fs';
import * as path from 'path';
import { types } from 'util';

interface ChangeType {
  pattern: RegExp;
  description: string;
  priority: number;
}

const languagePatterns: Record<string, ChangeType[]> = {
    javascript: [
        { pattern: /^\s*function\s+\w+/, description: 'function declarations', priority: 1 },
        { pattern: /^\s*const\s+\w+\s*=\s*\([^)]*\)\s*=>/, description: 'arrow functions', priority: 1 },
        { pattern: /^\s*class\s+\w+/, description: 'class definitions', priority: 1 },
        { pattern: /^\s*import\s+/, description: 'import statements', priority: 2 },
    ],
    python: [
        { pattern: /^\s*def\s+\w+/, description: 'function definitions', priority: 1 },
        { pattern: /^\s*class\s+\w+/, description: 'class definitions', priority: 1 },
        { pattern: /^\s*@\w+/, description: 'decorators', priority: 2 },
    ],
    typescript: [
        { pattern: /^\s*function\s+\w+/, description: 'function declarations', priority: 1 },
        { pattern: /^\s*const\s+\w+\s*=\s*\([^)]*\)\s*=>/, description: 'arrow functions', priority: 1 },
        { pattern: /^\s*class\s+\w+/, description: 'class definitions', priority: 1 },
        { pattern: /^\s*import\s+/, description: 'import statements', priority: 2 },
    ],
    c: [
        { pattern: /^\s*#include\s+/, description: 'include statements', priority: 2 },
        { pattern: /^\s*int\s+\w+\s*\(/, description: 'function declarations', priority: 1 },
        { pattern: /^\s*void\s+\w+\s*\(/, description: 'function declarations', priority: 1 },
    ],
    java: [
        { pattern: /^\s*import\s+/, description: 'import statements', priority: 2 },
        { pattern: /^\s*public\s+class\s+\w+/, description: 'class definitions', priority: 1 },
        { pattern: /^\s*public\s+void\s+\w+\s*\(/, description: 'method declarations', priority: 1 },
    ],
    ruby: [
        { pattern: /^\s*require\s+/, description: 'require statements', priority: 2 },
        { pattern: /^\s*def\s+\w+/, description: 'method definitions', priority: 1 },
        { pattern: /^\s*class\s+\w+/, description: 'class definitions', priority: 1 },
    ],
    php: [
        { pattern: /^\s*require\s+/, description: 'require statements', priority: 2 },
        { pattern: /^\s*function\s+\w+/, description: 'function definitions', priority: 1 },
        { pattern: /^\s*class\s+\w+/, description: 'class definitions', priority: 1 },
    ],
    go: [
        { pattern: /^\s*package\s+\w+/, description: 'package declarations', priority: 2 },
        { pattern: /^\s*func\s+\w+/, description: 'function declarations', priority: 1 },
        { pattern: /^\s*type\s+\w+/, description: 'type declarations', priority: 1 },
    ],
    rust: [
        { pattern: /^\s*use\s+/, description: 'use statements', priority: 2 },
        { pattern: /^\s*fn\s+\w+/, description: 'function declarations', priority: 1 },
        { pattern: /^\s*struct\s+\w+/, description: 'struct declarations', priority: 1 },
    ],
    swift: [
        { pattern: /^\s*import\s+/, description: 'import statements', priority: 2 },
        { pattern: /^\s*func\s+\w+/, description: 'function declarations', priority: 1 },
        { pattern: /^\s*class\s+\w+/, description: 'class declarations', priority: 1 },
    ],
    kotlin: [
        { pattern: /^\s*import\s+/, description: 'import statements', priority: 2 },
        { pattern: /^\s*fun\s+\w+/, description: 'function declarations', priority: 1 },
        { pattern: /^\s*class\s+\w+/, description: 'class declarations', priority: 1 },
    ],
    csharp: [
        { pattern: /^\s*using\s+/, description: 'using statements', priority: 2 },
        { pattern: /^\s*public\s+class\s+\w+/, description: 'class declarations', priority: 1 },
        { pattern: /^\s*public\s+void\s+\w+/, description: 'method declarations', priority: 1 },
    ],
    scala: [
        { pattern: /^\s*import\s+/, description: 'import statements', priority: 2 },
        { pattern: /^\s*def\s+\w+/, description: 'function declarations', priority: 1 },
        { pattern: /^\s*class\s+\w+/, description: 'class declarations', priority: 1 },
    ],
    perl: [
        { pattern: /^\s*use\s+/, description: 'use statements', priority: 2 },
        { pattern: /^\s*sub\s+\w+/, description: 'sub declarations', priority: 1 },
        { pattern: /^\s*package\s+\w+/, description: 'package declarations', priority: 1 },
    ],
};

const relevantExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.rb', '.php', '.go', '.rs', '.swift', '.kt', '.cs', '.c', '.h', '.scala', '.pl',];

const importRegex = /^(import|from|require)\b.*$/i;
const functionRegex = /^(function|def|fun)\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(/i;
const variableRegex = /^(var|let|const|val)\s+[a-zA-Z_][a-zA-Z0-9_]*$/i;

export interface CodeEssence {
  filePath: string;
  imports?: string[];
  functions?: string[];
  variables?: string[];
}

async function extractEssenceFromFile(filePath: string): Promise<CodeEssence> {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  const lines = content.split('\n');

  const essence: CodeEssence = {
    filePath,
    imports: [],
    functions: [],
    variables: [],
  };

  let multilineComment = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '' || trimmed.startsWith('//')) {
      continue;
    }

    if (trimmed.startsWith('/*')) {
      multilineComment = true;
      continue;
    }

    if (multilineComment) {
      if (trimmed.includes('*/')) {
        multilineComment = false;
      }
      continue;
    }

    if (importRegex.test(trimmed)) {
      essence.imports!.push(trimmed);
    } else if (functionRegex.test(trimmed)) {
      essence.functions!.push(trimmed);
    } else if (variableRegex.test(trimmed)) {
      essence.variables!.push(trimmed);
    }
  }

  return essence;
}

export async function searchDirectory(root: string): Promise<CodeEssence[]> {
  const results: CodeEssence[] = [];

  async function processDirectory(directory: string): Promise<void> {
    const entries = await fs.promises.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (isRelevantFile(fullPath)) {
        try {
          const essence = await extractEssenceFromFile(fullPath);
          results.push(essence);
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err);
        }
      }
    }
  }

  await processDirectory(root);
  return results;
}

export function isRelevantFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return relevantExtensions.includes(ext);
}

export interface DiffAnalyzer {
  maxLines: number;
  contextLines: number;
  importantFiles: string[];
  ignorePatterns: RegExp[];
}

export function newDiffAnalyzer(): DiffAnalyzer {
  return {
    maxLines: 2000,
    contextLines: 3,
    importantFiles: ['main', 'core', 'api', 'service', 'controller', 'model', 'repository'],
    ignorePatterns: [/^\s*\/\//, /^\s*#/, /^\s*\/\*/, /^\s*\*/, /^\s*\*\//, /^\s*$/],
  };
}

export function filterImportantChanges(lines: string[], analyzer: DiffAnalyzer): string[] {
  const filtered: string[] = [];

  let language = '';
  let isImportantFile = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('diff --git')) {
      language = detectLanguage(line);
      isImportantFile = analyzer.importantFiles.some((keyword) => line.includes(keyword));
    }

    if (isImportantFile && isSignificantChange(line, language)) {
      const start = Math.max(0, i - analyzer.contextLines);
      filtered.push(...lines.slice(start, i + 1));
    }
  }

  return filtered;
}

function isSignificantChange(line: string, language: string): boolean {
  const patterns = languagePatterns[language] || [];
  return patterns.some((pattern) => pattern.pattern.test(line));
}

function detectLanguage(diffLine: string): string {
  if (diffLine.endsWith('.js') || diffLine.endsWith('.ts')) return 'javascript';
  if (diffLine.endsWith('.py')) return 'python';
  return '';
}
