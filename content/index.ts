import { BlogPost } from '../types';
import { parseMD } from './parser';

const postModules = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const assetModules = import.meta.glob('./posts/assets/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const assetUrls: Record<string, string> = {};
Object.entries(assetModules).forEach(([path, url]) => {
  const filename = path.split('/').pop() || '';
  assetUrls[filename] = url;
});

const parseDate = (dateStr: string) => {
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[0].length !== 4) {
    const [d, m, y] = parts.map(Number);
    return new Date(y, m - 1, d).getTime();
  }
  return new Date(dateStr).getTime();
};

// export function getAssetUrl(filename: string): string | undefined {
//   return assetUrls[filename];
// }

const allPosts: BlogPost[] = Object.entries(postModules)
  .filter(([path]) => !path.endsWith('README.md'))
  .map(([path, raw]) => {
    // TODO: Show readTime
    const { frontmatter, content, readTime } = parseMD(raw);

    let processedContent = content;

    // Replace /assets/filename with actual url
    processedContent = processedContent.replace(
      /\]\(\.\/assets\/([^)]+)\)/g,
      (match, filename) => {
        const url = assetUrls[filename];
        return url ? `](${url})` : match;
      }
    );

    return {
      slug: frontmatter.slug,
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary,
      content: processedContent,
      author: frontmatter.author,
      category: frontmatter.category,
      tags: frontmatter.tags,
      draft: frontmatter.draft,
      featured: frontmatter.featured,
      // TODO: This doesnt work, it looks ugly just appending the image
      cover: frontmatter.cover ? assetUrls[frontmatter.cover] : undefined,
      updated: frontmatter.updated,
      readTime,
    };
  });

export function getPublishedPosts(): BlogPost[] {
  return allPosts
    .filter(post => !post.draft)
    .sort((a, b) => {
      // Featured posts first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then by date
      return parseDate(b.date) - parseDate(a.date);
    });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find(post => post.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  allPosts
    .filter(post => !post.draft)
    .forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
  return Array.from(tags).sort();
}
