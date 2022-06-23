import type { GatsbyConfig } from 'gatsby'
import path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Gatsby News Feed',
    siteUrl: 'https://www.yourdomain.tld',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'drive',
        path: path.resolve('data'),
      },
    },
    {
      resolve: '@fs/gatsby-plugin-drive',
      options: {
        folderId: '1634d_6lSDjtz1X-SBH0wDQe2Arpk7ACz',
        keyFile: 'terraform-admin@bank-download-43d518.iam.gserviceaccount.com.json',
        destination: 'drive',
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
    // Allows the publicUrl of a file resource to be used.
    'mdx.frontmatter.file': 'File.base',
  },
}

export default config
