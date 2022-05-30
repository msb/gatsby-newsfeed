import { GatsbyNode } from 'gatsby'
import { kebabCase } from 'lodash'
import path from 'path'

const TEMPLATE_DIR = './src/templates'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  loaders,
  actions,
}) => {
  if (['develop-html', 'build-html'].includes(stage)) {
    // suppress the use of `react-pdf` during the build
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-pdf/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

// Minimal frontmatter required to support page creation.
type BaseFrontmatter = {
  slug?: string
  title: string
}

// The type of data expected from a base content query.
type BaseContentResult = {
  allMdx: {
    nodes: {
      id: string
      frontmatter: BaseFrontmatter
    }[]
  }
}

// The type of data expected from a PDF content query.
type PdfContentResult = {
  allPdf: {
    nodes: (BaseFrontmatter & {
      id: string
    })[]
  }
}

// Fields common to all graphQL results.
const COMMON_FIELDS = `
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
  ImageObject: '',
  Recipe: '',
  VideoObject: `
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

// Returns `slug`, if available, or else makes a slug of the `title`.
const makeSlug = ({ title, slug }: BaseFrontmatter): string => (
  slug || kebabCase(title)
)

export const createPages: GatsbyNode['createPages'] = async (
  { graphql, actions: { createPage } },
) => {
  // TODO the difference between the ways of creating pages for different content types
  // should be abstracted.
  // TODO allow for an optional `image` - if not specified, a stock type image should be used.

  // A list of the common data for each page required to create the index page.
  const index = []

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
    result.data.allMdx.nodes.forEach((node) => {
      // Create the content page.
      createPage({
        path: makeSlug(node.frontmatter),
        component: path.resolve(`${TEMPLATE_DIR}/mdx.tsx`),
        context: node,
      })
      // ..and add a record for the index page.
      index.push({ ...node.frontmatter, id: node.id, slug: makeSlug(node.frontmatter) })
    })
  })

  // Retrieve and process the PDF content data.
  const pdfResult = await graphql<PdfContentResult>(`
    query {
      allPdf {
        nodes {
          id
          ${COMMON_FIELDS}
          file {
            publicURL
          }
        }
      }
    }
  `)
  pdfResult.data.allPdf.nodes.forEach((node) => {
    // Create the PDF content page.
    createPage({
      path: makeSlug(node),
      component: path.resolve(`${TEMPLATE_DIR}/pdf.tsx`),
      context: node,
    })
    // ..and add a record for the index page.
    index.push({ ...node, type: 'PDF', slug: makeSlug(node) })
  })

  // Create the index page.
  createPage({
    path: '/',
    component: path.resolve(`${TEMPLATE_DIR}/index.tsx`),
    context: { nodes: index.sort((a, b) => (a.date < b.date ? 1 : -1)) },
  })
}
