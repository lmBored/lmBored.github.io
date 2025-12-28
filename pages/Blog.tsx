import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getPublishedPosts } from '../content/index';

export const Blog: React.FC = () => {
  const posts: BlogPost[] = getPublishedPosts();

  return (
    <div>
      <div className="blog-header">
        <h1>Blog</h1>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="post-card">
            <div className="post-card-shadow" />
            <div className="post-card-content">
              <div className="post-card-header">
                <h2 className="post-card-title">{post.title}</h2>
                <span className="post-card-date">{post.date}</span>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="post-card-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}

              <p className="post-card-summary">{post.summary}</p>

              <span className="post-card-link">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
