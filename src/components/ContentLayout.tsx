import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
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

// The layout component all content pages
function ContentLayout({ children }: { children: ReactNode | undefined }): ReactElement {
  return (
    <Layout navbar={<IconLink to="/"><Icon>home</Icon></IconLink>}>
      { children }
    </Layout>
  )
}

export default ContentLayout
