export interface PostFrontmatter {
    title: string;
    date: string;
    slug: string;
    summary: string;
    author?: string;
    category?: string;
    tags?: string[];
    draft?: boolean;
    featured?: boolean;
    cover?: string;
    updated?: string;
}

export interface ParsedPost {
    frontmatter: PostFrontmatter;
    content: string;
    readTime: number;
}

// Parse a md file with yaml frontmatter
export function parseMD(raw: string): ParsedPost {
    const regex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = raw.match(regex);

    if (!match) {
        throw new Error('Invalid markdown');
    }

    const [, yaml, markdown] = match;
    const frontmatter = parseYaml(yaml);
    const content = markdown.trim();
    const readTime = calculateReadTime(content);

    return { frontmatter, content, readTime };
}

function parseYaml(yaml: string): PostFrontmatter {
    const result: Record<string, unknown> = {};
    const lines = yaml.split('\n');
    let currentKey = '';
    let inArray = false;
    let arrayItems: string[] = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Array item
        if (trimmed.startsWith('- ') && inArray) {
            arrayItems.push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ''));
            continue;
        }

        // Save previous array if exiting
        if (inArray && !trimmed.startsWith('- ')) {
            result[currentKey] = arrayItems;
            inArray = false;
            arrayItems = [];
        }

        const colonIndex = trimmed.indexOf(':');
        if (colonIndex > 0) {
            const key = trimmed.slice(0, colonIndex).trim();
            const value = trimmed.slice(colonIndex + 1).trim();

            if (value === '') {
                // Start of array
                currentKey = key;
                inArray = true;
                arrayItems = [];
            } else {
                result[key] = parseValue(value);
            }
        }
    }

    // Trailing array
    if (inArray) {
        result[currentKey] = arrayItems;
    }

    return result as unknown as PostFrontmatter;
}

// Parse a YAML value into appropriate type
function parseValue(value: string): string | number | boolean {
    const unquoted = value.replace(/^["']|["']$/g, '');

    if (unquoted === 'true') return true;
    if (unquoted === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(unquoted)) return parseFloat(unquoted);

    return unquoted;
}

function calculateReadTime(content: string): number {
    const words = content.split(/\s+/).filter(Boolean).length;
    // Assume 200wpm
    return Math.max(1, Math.ceil(words / 200));
}
