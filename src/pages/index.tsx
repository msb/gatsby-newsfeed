import * as React from "react"
import { graphql, PageProps } from 'gatsby'
import styled from "styled-components"
import VisibilitySensor from 'react-visibility-sensor'
import { Layout, LinkProperties, links } from "../components"

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

type Post = LinkProperties & {
  id: string
  type: string
  component?: string
  keywords: string[]
} 

type DataProps = {
  allIndexYaml: {
    nodes: Post[]
  }
}

const IndexPage = ({ data: { allIndexYaml: { nodes: list } } }: PageProps<DataProps>) => {

  const [isVisible, setIsVisible] = React.useState(true)

  // FIXME
  const indexQuery = undefined

  return (
    <Layout>
      <Container>
        {
          list.length === 0
          ?
          (
            indexQuery
            ?
            <h3>
              Nothing found for '{ query }'
            </h3>
            :
            null
          )
          :
          list.map(item => {
            const Template = links[item.component || item.type]
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
