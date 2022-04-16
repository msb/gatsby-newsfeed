import * as React from "react"
import { graphql, PageProps } from 'gatsby'
import styled from "styled-components"
import VisibilitySensor from 'react-visibility-sensor'
import { Layout, LinkProperties, pageLinks } from "../components"

const Item = styled.div`
  padding-left: 8px;
  padding-right: 8px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
`

// Defines the index for a content item.
type Post = LinkProperties & {
  // gatsby id
  id: string
  // the content type (maps to the rendering component)
  type: string
  // The name of the component rendering the content.
  // Only supplied if it's different from the `type`
  component?: string
  // A list keywords to aid searching the content.
  keywords: string[]
} 

type DataProps = {
  allIndexYaml: {
    nodes: Post[]
  }
}

// Number of page link items used when rendering the next chunk of page links.
const PAGE_SIZE = 8
// The delay in ms between rendering the next chunk of page links.
const PAGE_DELAY = 100

// The newsfeed's home page - renders a list of page links ordered by date published.
// For efficiency, the only the potion of the list visible on the viewport is rendered.
// More of the list is rendered as 
const IndexPage = ({ data: { allIndexYaml: { nodes: fullList } } }: PageProps<DataProps>) => {

  const [isVisible, setIsVisible] = React.useState(true)

  const [list, setList] = React.useState<Post[]>([])

  React.useEffect(() => {
    if (isVisible && list.length !== fullList.length) {
      // I have found that this delay is required when using `<VisibilitySensor>`.
      // Otherwise it doesn't get a change to change it's state.
      setTimeout(() => setList([...fullList.slice(0, list.length + PAGE_SIZE)]), PAGE_DELAY)
    }
  }, [list, isVisible])

  return (
    <Layout>
      <Container>
        {
          list.map(item => {
            const Template = pageLinks[item.component || item.type]
            return (
              <Item key={item.title}>
                <Template {...item} />
              </Item>
            )
          })
        }
        <Item>
          <VisibilitySensor intervalDelay={50} onChange={isVisible => setIsVisible(isVisible)}>
            <div>&nbsp;</div>
          </VisibilitySensor>
        </Item>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allIndexYaml(sort: {fields: date, order: DESC}) {
      nodes {
        id
        type
        title
        date
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
        keywords
      }
    }
  }
`

export default IndexPage
