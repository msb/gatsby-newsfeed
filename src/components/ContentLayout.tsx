import React, { PropsWithChildren, ReactElement } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { useIndexPage } from '../providers/IndexPageProvider'
import { Icon, Layout } from '.'

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

type ContentLayoutProps = {
  // The page's title
  title?: string
}

// The layout component all content pages
function ContentLayout({ children, title }: PropsWithChildren<ContentLayoutProps>): ReactElement {
  // the index page context
  const { indexPage } = useIndexPage()

  return (
    <Layout title={title} navbar={<IconLink to={indexPage}><Icon>home</Icon></IconLink>}>
      { children }
    </Layout>
  )
}

export default ContentLayout
