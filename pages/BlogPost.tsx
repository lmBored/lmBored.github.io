import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { getPostBySlug } from '../content/index';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? getPostBySlug(id) : undefined;

  if (!post) {
    // Redirect to blog if post not found
    React.useEffect(() => {
      navigate('/blog');
    }, [navigate]);
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="fade-in">
      <Link to="/blog" className="post-back">
        <ArrowLeft size={18} /> Back to blog
      </Link>

      <Card className="post-article">
        <div className="post-header">
          <div className="post-meta">
            <span className="post-category">{post.category || 'Article'}</span>
            <div className="post-date-author">
              <span className="post-date">{post.date}</span>
              {post.author && (
                <span className="post-author"> by {post.author}</span>
              )}
            </div>
          </div>

          <h1 className="post-title">{post.title}</h1>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map(tag => (
                <span key={tag} className="post-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="post-content">
          <ReactMarkdown
            className="prose"
            components={{
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              blockquote: ({ children }) => <blockquote>{children}</blockquote>,
              code: ({ className, children }) => {
                const isBlock = String(children).includes('\n');
                return isBlock
                  ? <pre><code>{children}</code></pre>
                  : <code>{children}</code>;
              },
              a: ({ href, children }) => <a href={href}>{children}</a>,
              img: ({ src, alt }) => <img src={src} alt={alt} />,
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="post-footer">
          EOF
        </div>
      </Card>
    </div>
  );
};
