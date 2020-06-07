import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Iframely from "../components/iframely";
import Ogp from "../components/ogp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faClock } from "@fortawesome/free-solid-svg-icons";

const striptags = require("striptags");

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data; // data.markdownRemark holds your post data
  const { siteMetadata } = site;
  const { frontmatter, html } = markdownRemark;
  const title = `${frontmatter.title} | ${siteMetadata.title}`;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Ogp isRoot={false} title={title} description={extractSummary(html)} />
      <Iframely />
      <div className="blog-post-container">
        <article className="post">
          {!frontmatter.thumbnail && (
            <div className="post-thumbnail">
              <div className="post-meta">
                {frontmatter.date === frontmatter.lastupdate ? (
                  <FontAwesomeIcon icon={faClock} />
                ) : (
                  <FontAwesomeIcon icon={faSync} />
                )}
                <div className="post-date">{frontmatter.lastupdate}</div>
              </div>
              <h1 className="post-title">{frontmatter.title}</h1>
            </div>
          )}
          {!!frontmatter.thumbnail && (
            <div
              className="post-thumbnail"
              style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}
            >
              <div className="post-meta">
                {frontmatter.date === frontmatter.lastupdate ? (
                  <FontAwesomeIcon icon={faClock} />
                ) : (
                  <FontAwesomeIcon icon={faSync} />
                )}
                <div className="post-date">{frontmatter.lastupdate}</div>
              </div>
              <h1 className="post-title">{frontmatter.title}</h1>
            </div>
          )}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </Layout>
  );
}

function getFirstSentence(documentStr) {
  const doc = new DOMParser().parseFromString(documentStr, "text/html");
  return doc.querySelector("p").textContent;
}

function extractSummary(html) {
  const postContent = striptags(html)
    .replace(/\r?\n/g, "")
    .trim();
  return postContent.length <= 120
    ? postContent
    : postContent.slice(0, 120) + "...";
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY/MM/DD ddd")
        lastupdate(formatString: "YYYY/MM/DD ddd")
        path
        title
        thumbnail
      }
    }
  }
`;
