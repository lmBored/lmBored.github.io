import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug } from '../content/index';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    import('katex/dist/katex.min.css').catch(() => {});
  }, []);

  const post = id ? getPostBySlug(id) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="blog-post-page">
      <p className="post-back">
        <Link to="/blog">← Back to blog</Link>
      </p>

      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-date">
          {post.date}
          {post.author && <> · by {post.author}</>}
        </p>
      </div>

      <div className="post-content">
        <ReactMarkdown
          className="prose"
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;
