# Blog Post Format

Write your blog posts as markdown files in this folder. Each post needs YAML frontmatter at the top.

## Template

```markdown
---
title: Your Post Title
date: 2024-12-27
slug: your-post-slug
summary: A brief description for previews and SEO.
tags:
  - topic
  - another-topic
---

Your content here. Write in standard markdown.

## Headings Work

So do **bold**, *italic*, and `code`.

![Image description](./assets/your-image.png)
```

## Frontmatter Fields

### Required

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Post title | `"My Amazing Post"` |
| `date` | Publication date | `2024-12-27` |
| `slug` | URL path (lowercase, hyphens) | `my-amazing-post` |
| `summary` | Short description | `"Learn how to..."` |

### Optional

| Field | Description | Default |
|-------|-------------|---------|
| `author` | Author name | Site owner |
| `category` | Post category (e.g. Tutorial, Note, Review) | Article |
| `tags` | List of tags | None |
| `cover` | Cover image filename (not implemented, yet) | None |
| `updated` | Last updated date | None |
| `draft` | Hide from listing | `false` |
| `featured` | Pin to top of list | `false` |

## Images

1. Place images in the `assets/` subfolder
2. Reference them in your content:
   - **Cover image**: Use just the filename in the `cover` field
   - **In-content**: Use `![alt text](./assets/filename.png)`

## Tips

- Use descriptive slugs that match your title
- Keep summaries under 160 characters for SEO
- Use 3-5 relevant tags per post
- Set `draft: true` while writing to hide from visitors