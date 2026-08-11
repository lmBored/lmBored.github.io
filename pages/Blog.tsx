import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getPublishedPosts } from '../content/index';

const Blog: React.FC = () => {
  const posts: BlogPost[] = getPublishedPosts();

  return (
    <div className="blog-page">
      <h1>Blog</h1>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.slug} className="post-item">
            <Link to={`/blog/${post.slug}`} className="post-title">{post.title}</Link>
            <span className="post-date">({post.date})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
