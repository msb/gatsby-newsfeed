import type { GatsbyConfig } from 'gatsby'
import path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Gatsby News Feed',
    siteUrl: 'http://http://localhost:8000/',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.resolve('data'),
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        // this assumes that YAML nodes will be named by the file's parent directory.
        typeName: ({ node }) => path.basename(path.join(node.absolutePath, '..')),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-mdx',
  ],
  // https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/#mapping-node-types
  mapping: {
    // TODO don't know why we don't need this anymore.
    // Allows the publicUrl of a file resource to be used.
    // 'mdx.frontmatter.file': 'File.base',
  },
}

export default config
