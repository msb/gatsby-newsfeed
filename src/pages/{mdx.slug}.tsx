import React, { ReactElement } from 'react'
import styled from "styled-components"
import { graphql, PageProps, Link } from 'gatsby'
import { Post } from '.'
import { Icon, Layout } from '../components'
import { ImageObject, Recipe } from '../components/content'

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
    frontmatter: Post
    body: string
  }
}

// Select the component to render the content based on the `component` or `type` fields defined in
// the frontmatter.
// TODO I think we can do better than an if statement - maybe some kind of content component
// registry.
const selectComponent = (post: Post, body: string): ReactElement => {
  const component = post.component || post.type
  if (component === 'Recipe') {
    return <Recipe {...{...post, body}} />
  } else if (component === 'ImageObject') {
    return <ImageObject {...{...post, body}} />
  }

  throw `${component} content isn't recognised`
}

// A newfeed page that renders all content sourced from MDX nodes. The content is rendered by
// different `content` components depending the `type` defined in the frontmatter.
const MdxContent = (
  { data: { mdx: { body, frontmatter } } }: PageProps<DataProps>
): ReactElement => (
  <Layout navbar={<IconLink to="/"><Icon>home</Icon></IconLink>}>
    { selectComponent(frontmatter, body) }
  </Layout>
)

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
      }
      body
    }
  }
`

export default MdxContent