import React from "react";
import { StaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

export default ({ tag, className, filename }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(quality: 90, maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((n) => {
        return n.node.relativePath.includes(filename);
      });

      if (!image) return;

      const imageData = image.node.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag={tag}
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        ></BackgroundImage>
      );
    }}
  />
);
