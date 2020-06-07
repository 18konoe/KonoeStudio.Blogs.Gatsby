import React from "react";
import Helmet from "react-helmet";

// import data from "../../site-meta-data.json";

export default function Ogp({ data, isRoot, title, description }) {
  const type = isRoot ? "website" : "article";

  return (
    <Helmet>
      <meta property="og:title" content={title || data.title} />
      <meta
        property="og:description"
        content={description || data.description}
      />

      <meta property="og:url" content={data.siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={data.title} />
      <meta property="og:image" content={data.siteUrl + data.imageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={`@${data.twitterUser}`} />
    </Helmet>
  );
}
