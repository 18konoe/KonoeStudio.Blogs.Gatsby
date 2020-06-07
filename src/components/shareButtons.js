import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  LineShareButton,
  LineIcon,
  PocketShareButton,
  PocketIcon,
} from "react-share";

// import data from "../../site-meta-data.json";

export default function ShareButtons({ url, title, summary, siteMetadata }) {
  return (
    <div className="blog-post-share">
      <TwitterShareButton
        title={title}
        hashtags={["KonoeStudio"]}
        related={[siteMetadata.twitterUser]}
        url={url}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton
        title={title}
        summary={summary}
        source={siteMetadata.title}
        url={url}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <LineShareButton title={title} url={url}>
        <LineIcon size={32} round />
      </LineShareButton>
      <PocketShareButton title={title} url={url}>
        <PocketIcon size={32} round />
      </PocketShareButton>
    </div>
  );
}
