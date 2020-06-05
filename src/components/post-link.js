import React from "react";
import { Link } from "gatsby";

const PostLink = ({ post }) => (
  <article className="card">
    <Link to={post.frontmatter.path}>
      {!!post.frontmatter.thumbnail && (
        <div
          className="card-img"
          style={{ backgroundImage: `url(${post.frontmatter.thumbnail})` }}
        ></div>
      )}
    </Link>
    <header>
      <h2 className="post-title">
        <Link to={post.frontmatter.path} className="post-link">
          {post.frontmatter.title}
        </Link>
      </h2>
      <div className="post-meta">{post.frontmatter.date}</div>
    </header>
  </article>
);
export default PostLink;
