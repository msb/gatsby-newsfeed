import React, { ReactElement } from 'react'
import styled from "styled-components"
import { graphql, PageProps, Link } from 'gatsby'
import { Icon, Layout } from '../components'
import registry from '../components/content/registry'
import { BasePost } from '.'

const IconLink = styled(Link)`
  background-color: gray;
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.40);
  text-decoration: none;
  color: black;
  &:hover {
    background: #ccc;
  }
`

type DataProps = {
  mdx: {
    // The MDX frontmatter (we only type the field sufficiently for resolving the component)
    frontmatter: BasePost
    // The MDX content
    body: string
  }
}

// A newfeed page that renders all content sourced from MDX nodes. The content is rendered by
// different `content` components depending the `type` defined in the frontmatter.
const MdxContent = (
  { data: { mdx: { body, frontmatter } } }: PageProps<DataProps>
): ReactElement => {
  const Component = registry.get(frontmatter.component || frontmatter.type)
  return <Layout navbar={<IconLink to="/"><Icon>home</Icon></IconLink>}>
    { <Component {...{...frontmatter, body}} /> }
  </Layout>
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        component
        type
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
        embedUrl
        file {
          publicURL
        }
        aspectRatio
      }
      body
    }
  }
`

export default MdxContent