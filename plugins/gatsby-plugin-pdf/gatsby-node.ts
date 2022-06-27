import { GatsbyNode } from 'gatsby'
import path from 'path'
import {
  BaseFrontmatter, COMMON_FIELDS, createTransitionalIndexNode, getIndexDataFromNode, makeSlug,
} from '../../gatsby-node'

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

export const sourceNodes = (args) => {
  const { getNodesByType } = args
  // create the transitional nodes for all the `Mdx` nodes
  getNodesByType('pdf').forEach((node) => (
    createTransitionalIndexNode(getIndexDataFromNode({ ...node, type: 'PDF' }), node, args)
  ))
}

const TEMPLATE_DIR = './src/templates'

// The type of data expected from a PDF content query.
type PdfContentResult = {
  allPdf: {
    nodes: (BaseFrontmatter & {
      id: string
    })[]
  }
}

export const createPages: GatsbyNode['createPages'] = async (
  { graphql, actions: { createPage } },
) => {
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
  pdfResult.data?.allPdf.nodes.forEach((node) => {
    // Create the PDF content page.
    createPage({
      path: makeSlug(node),
      component: path.resolve(`${TEMPLATE_DIR}/pdf.tsx`),
      context: node,
    })
  })
}
