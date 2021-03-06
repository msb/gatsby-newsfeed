import { navigate } from 'gatsby'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { useQuery } from '../providers/QueryProvider'
import { useIndexPage } from '../providers/IndexPageProvider'
import Theme, { ThemedPropsBase, spacing } from '../theme'
import SearchForm from './SearchForm'

const APP_MAX_WIDTH = 1500
const MAIN_TOP = 1
const MAIN_BOTTOM = 40

const Background = styled.div`
  background-color: beige;
`

const Main = styled.main`
  font-family: Roboto Mono;
  max-width: ${APP_MAX_WIDTH}px;
  margin: auto;
  background-color: palegoldenrod;
  /* hack to apply background color to top of headings */
  padding-top: ${MAIN_TOP}px;
  /* allows the content to be seen passed the nav bar */
  padding-bottom: ${MAIN_BOTTOM}px;
  /* ensures the background color is applied to the whole height of the viewport */
  min-height: calc(100vh - ${MAIN_TOP + MAIN_BOTTOM}px);
`

const BottomFixed = styled.div<ThemedPropsBase>`
  position: fixed;
  bottom: ${spacing}px;
  left: 0;
  right: 0;
  z-index: 99;
`

const Nav = styled.nav`
  max-width: ${APP_MAX_WIDTH}px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`

const NavButtons = styled.div<ThemedPropsBase>`
  display: flex;
  padding-left: ${spacing}px;
`

// TODO On the index page (for small screens) the search bar has too much LH padding.
const NavSpacer = styled.div<ThemedPropsBase>`
  width: ${spacing}px;
`

const NavSearch = styled.div<ThemedPropsBase>`
  width: 300px;
  @media (max-width: ${({ theme }) => theme.break}px) {
    width: 100%;
  }
  padding-right: ${spacing}px;
`

type LayoutProps = {
  // React component(s) to place in the navbar (left hand)
  navbar?: React.ReactNode
  // The page's title
  title?: string
}

// The main layout component
function Layout({ navbar, title, children }: PropsWithChildren<LayoutProps>): ReactElement {
  // the query context
  const { query, setQuery } = useQuery()

  // the index page context
  const { indexPage } = useIndexPage()

  // submitting any search will navigate to the home page
  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();
    navigate(indexPage)
  }, [indexPage])

  return (
    <Theme>
      <Helmet>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto Mono" rel="stylesheet" />
        {/* remove any margin on the <body> */}
        <style>body&#123;margin:0;&#125;</style>
        <title>{ title }</title>
      </Helmet>
      <Background>
        <Main>
          <BottomFixed>
            <Nav>
              <NavButtons>{navbar}</NavButtons>
              <NavSpacer />
              <NavSearch>
                <SearchForm
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onSubmit={handleSubmit}
                />
              </NavSearch>
            </Nav>
          </BottomFixed>
          {children}
        </Main>
      </Background>
    </Theme>
  )
}

export default Layout
