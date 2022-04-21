import React, { useState, useMemo, useEffect } from "react"
import { graphql, PageProps } from 'gatsby'
import styled from "styled-components"
import VisibilitySensor from 'react-visibility-sensor'
import { Icon, Layout, LinkProperties, pageLinks } from "../components"
import { useQuery } from "../providers/QueryProvider"
import { debounce, isEqual } from "lodash"

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

  const {query} = useQuery()

  const [isVisible, setIsVisible] = useState(true)

  const [list, setList] = useState<Post[]>([])

  const [page, setPage] = useState(1)

  const filteredList = useMemo(() => (
    fullList.filter(item => {
      const tags = item.keywords || [];
      const textToSearch = [item.title, item.type, ...tags];
      return textToSearch.find(
        text => text.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    })
  ), [query])

  // FIXME scroll to top when query changes

  useEffect(() => {
    if (isVisible || page === 1) {
      if (!isEqual(list.map(item => item.id), filteredList.map(item => item.id))) {
        // I have found that this delay is required when using `<VisibilitySensor>`.
        // Otherwise it doesn't get a change to change it's state.
        setTimeout(() => {
          setList([...filteredList.slice(0, page * PAGE_SIZE)])
          setPage(page + 1)
        }, PAGE_DELAY)
      }
    }
  }, [list, filteredList, isVisible, page])

  useEffect(() => setPage(1), [query])

  return (
    <Layout navbar={<Icon>home</Icon>}>
      <Container>
        {
          filteredList.length === 0
          ?
          (
            query
            ?
            <h3>
              Nothing found for '{ query }'
            </h3>
            :
            null
          )
          :
          list.map(item => {
            const Template = pageLinks[item.component || item.type]
            return (
              <Item key={item.id}>
                <Template {...item} />
              </Item>
            )
          })
        }
        <Item style={{width: "100%"}}>
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
