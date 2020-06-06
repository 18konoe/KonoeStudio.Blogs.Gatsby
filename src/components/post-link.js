import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faClock } from "@fortawesome/free-solid-svg-icons";

const PostLink = ({ post }) => (
  <article className="card">
    <Link to={post.frontmatter.path} className="card-img-link">
      {!!post.frontmatter.thumbnail && (
        <div
          className="card-img"
          style={{ backgroundImage: `url(${post.frontmatter.thumbnail})` }}
        ></div>
      )}
    </Link>
    <header>
      <div className="post-meta">
        {post.frontmatter.date == post.frontmatter.lastupdate ? (
          <FontAwesomeIcon icon={faClock} />
        ) : (
          <FontAwesomeIcon icon={faSync} />
        )}
        <div className="post-date">{post.frontmatter.lastupdate}</div>
      </div>
      <h2 className="post-title">
        <Link to={post.frontmatter.path} className="post-link">
          {post.frontmatter.title}
        </Link>
      </h2>
    </header>
  </article>
);
export default PostLink;
