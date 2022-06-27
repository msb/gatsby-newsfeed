import { GatsbyNode } from 'gatsby'
import { kebabCase } from 'lodash'
import path from 'path'

const INDEX_NODE_TYPE = 'Index'
const SECRET_SLUG = 'secret'

// Minimal frontmatter required to support page creation.
export type BaseFrontmatter = {
  slug?: string
  title: string
  secret?: boolean
}

// Returns `slug`, if available, or else makes a slug of the `title`.
export const makeSlug = ({ title, slug }: BaseFrontmatter): string => (
  slug || kebabCase(title)
)

// Gets the base data for creating an index node from a node.
export const getIndexDataFromNode = (({
  type, title, slug, date, image, keywords, secret,
}) => ({
  type, title, slug, date, image, keywords, secret,
}))

// A map of all file node ids keyed on their absolute path
const fileNodeIds = {}

// a function for creating an `INDEX_NODE_TYPE` node.
const createIndexNode = (index, {
  actions: { createNode }, createNodeId, createContentDigest,
}, indexNodeType = INDEX_NODE_TYPE) => (
  createNode({
    ...index,
    id: createNodeId(`${indexNodeType}-${makeSlug(index)}`), // hashes the inputs into an ID
    internal: {
      type: indexNodeType,
      content: JSON.stringify(index),
      contentDigest: createContentDigest(index),
    },
    parent: null,
    children: [],
  })
)

// a function for creating FIXME
export const createTransitionalIndexNode = (index, node, helpers) => {
  const { getNode, getNodesByType } = helpers

  if (Object.keys(fileNodeIds).length === 0) {
    // Create a map of all file node ids keyed on their absolute path
    getNodesByType('File').forEach((fileNode) => {
      fileNodeIds[fileNode.absolutePath] = fileNode.id
    })
  }

  // get the absolute path of the image
  const imagePath = path.join(getNode(node.parent).dir, index.image)
  createIndexNode({
    ...index,
    slug: makeSlug(index),
    // overwrite with the id of the image's node
    image: fileNodeIds[imagePath],
  }, helpers, `${INDEX_NODE_TYPE}${node.internal.type}`)
}

export const sourceNodes = (args) => {
  const { getNodesByType } = args
  // create the transitional nodes for all the `Mdx` nodes
  getNodesByType('Mdx').forEach((node) => (
    createTransitionalIndexNode(getIndexDataFromNode(node.frontmatter), node, args)
  ))
}

export const onCreateNode = async (args) => {
  const { actions: { createNodeField }, node } = args
  // For all `INDEX_NODE_TYPE` nodes ..
  if (node.internal.type === INDEX_NODE_TYPE) {
    // .. use the image id provided by `sourceNodes()` to create the `image` `File` node field.
    createNodeField({ node, name: 'image', value: node.image })
  } else if (node.internal.type.startsWith(INDEX_NODE_TYPE)) {
    createIndexNode(getIndexDataFromNode(node), args)
  }
}

// define the `INDEX_NODE_TYPE.image` field as a `File` node
export const createSchemaCustomization = async ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Index implements Node {
      type: String!
      title: String!
      slug: String!
      date: Date!
      image: File! @link(from: "fields.image")
      keywords: [String!]
      secret: Boolean
    }
    type Site implements Node {
      siteMetadata: SiteMetadata
    }
    type SiteMetadata {
      title: String!
      secretSlug: String
    }
  `)
}

const TEMPLATE_DIR = './src/templates'

// The type of data expected from a base content query.
type BaseContentResult = {
  allMdx: {
    nodes: {
      id: string
      frontmatter: BaseFrontmatter
    }[]
  }
}

// The type of data expected from an `INDEX_NODE_TYPE` content query.
type IndexContentResult = {
  allIndex: {
    nodes: (BaseFrontmatter & {
      id: string
      type: string
    })[]
  }
}

// The type of data expected from a site metadata query.
type SiteMetadataResult = {
  site: {
    siteMetadata: {
      title: string
      secretSlug?: string
    }
  }
}

// Fields common to all graphQL results.
export const COMMON_FIELDS = `
  title
  slug
  date
  keywords
  image {
    childImageSharp {
      gatsbyImageData
    }
  }
`

// A map of specific fields required for each content type.
const EXTRA_FIELDS_FOR_BASE_CONTENT = {
  Simple: '',
  Image: `
    leftWidthRatio
  `,
  Video: `
    embedUrl
    file {
      publicURL
    }
    aspectRatio
  `,
  Table: `
    headers
    widths
    data
    maxWidth
    breakWidth
  `,
}

const [INDEX_QUERY, SECRET_QUERY] = ['filter: { secret: { ne: true } },', ''].map((filter) => `
  query {
    allIndex(${filter} sort: {fields: date, order: DESC}) {
      nodes {
        id
        type
        ${COMMON_FIELDS}
      }
    }
  }
`)

export const createPages: GatsbyNode['createPages'] = async (
  { graphql, actions: { createPage } },
) => {
  // TODO the difference between the ways of creating pages for different content types
  // should be abstracted.
  // TODO allow for an optional `image` - if not specified, a stock type image should be used.

  // Retrieve site metadata
  const siteResultMetadata = await graphql<SiteMetadataResult>(`
    query {
      site {
        siteMetadata {
          secretSlug
          title
        }
      }
    }
  `)

  // Create a promise for the data for each base content type.
  const resultPromises = Object.entries(EXTRA_FIELDS_FOR_BASE_CONTENT).map(([type, query]) => (
    graphql<BaseContentResult>(`
      query {
        allMdx (filter: { frontmatter: { type: { eq: "${type}" } } }) {
          nodes {
              id
              frontmatter {
                type
                ${COMMON_FIELDS}
                ${query}
            }
            body
          }
        }
      }
    `)
  ))

  // Await and process the promise data.

  const results = await Promise.all(resultPromises)

  results.forEach((result) => {
    // Process the base content type.
    result.data?.allMdx.nodes.forEach((node) => {
      // Create the content page.
      createPage({
        path: makeSlug(node.frontmatter),
        component: path.resolve(`${TEMPLATE_DIR}/mdx.tsx`),
        context: node,
      })
    })
  })

  // Retrieve and process the `INDEX_NODE_TYPE` data.
  const indexResult = await graphql<IndexContentResult>(INDEX_QUERY)

  // Create the index page.
  createPage({
    path: '/',
    component: path.resolve(`${TEMPLATE_DIR}/index.tsx`),
    context: {
      nodes: indexResult.data?.allIndex.nodes,
      title: siteResultMetadata.data?.site.siteMetadata.title,
    },
  })

  // Retrieve and process the secret `INDEX_NODE_TYPE` data.
  const secretResult = await graphql<IndexContentResult>(SECRET_QUERY)

  // Create the secret index page.
  createPage({
    path: siteResultMetadata.data?.site.siteMetadata.secretSlug || SECRET_SLUG,
    component: path.resolve(`${TEMPLATE_DIR}/index.tsx`),
    context: {
      nodes: secretResult.data?.allIndex.nodes,
      title: siteResultMetadata.data?.site.siteMetadata.title,
    },
  })
}
