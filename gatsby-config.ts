import type { GatsbyConfig } from "gatsby"
import path from "path"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby News Feed`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: path.resolve(`data`),
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-yaml",
    "gatsby-transformer-sharp",
  ],
}

export default config
