import React, { useState, useMemo, useEffect, ReactElement } from "react"
import { graphql, PageProps } from 'gatsby'
import styled from "styled-components"
import VisibilitySensor from 'react-visibility-sensor'
import { useQuery } from "../providers/QueryProvider"
import { isEqual } from "lodash"
import { ThemedPropsBase, spacing } from '../theme'
import { Layout, LinkProps, PortholeLink } from "../components"

const Item = styled.div<ThemedPropsBase>`
  padding-left: ${spacing}px;
  padding-right: ${spacing}px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
`

// Used as "visible" element for the <VisibilitySensor> to work with.
const ListEnd = styled.div`
  width: 100%;
  height: 1px;
  &::before {
    content: "\\a0";
  }
`

export type BasePost = {
  // the content type (maps to the rendering component)
  type: string
  // The name of the component rendering the content.
  // Only supplied if it's different from the `type`
  component?: string
} 

// Defines the index for a content item.
export type Post = BasePost & LinkProps & {
  // gatsby id
  id: string
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
// The number of the 1st page.
const STARTING_PAGE = 1

// The newsfeed's home page - renders a list of page links ordered by date published.
// For efficiency, the only the potion of the list visible on the viewport is rendered.
// More of the list is rendered as the page is scrolled down. The page also filters
// content based on the query context.
const IndexPage = ({ data: { allIndexYaml: { nodes: fullList } } }: PageProps<DataProps>): ReactElement => {

  // the query context
  const {query} = useQuery()

  // whether or not <ListEnd> is visible
  const [isVisible, setIsVisible] = useState(true)

  // The actual list of rendered items.
  const [list, setList] = useState<Post[]>([])

  // The number of item pages rendered.
  const [page, setPage] = useState(STARTING_PAGE)

  const filteredList = useMemo(() => (
    fullList.filter(item => {
      const tags = item.keywords || [];
      const textToSearch = [item.title, item.type, ...tags];
      return textToSearch.find(
        text => text.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    })
  ), [query, fullList])

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

  // reset the page count
  useEffect(() => setPage(STARTING_PAGE), [query])

  return (
    <Layout>
      <Container>
        {
          filteredList.length === 0
          ?
          (
            query
            ?
            <h3>
              Nothing found for &apos;{ query }&apos;
            </h3>
            :
            null
          )
          :
          list.map(item => (
            <Item key={item.id}>
              <PortholeLink {...item} />
            </Item>
          ))
        }
        <VisibilitySensor intervalDelay={50} onChange={isVisible => setIsVisible(isVisible)}>
          <ListEnd/>
        </VisibilitySensor>
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
        slug
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
