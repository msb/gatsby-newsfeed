import React from 'react'
import styled from "styled-components"

const Main = styled.main`
  max-width: 1500px;
  margin: auto;
`

// The main layout component
const Layout = ({children}: React.PropsWithChildren<unknown>) => (
  <Main>{children}</Main>
)

export default Layout
