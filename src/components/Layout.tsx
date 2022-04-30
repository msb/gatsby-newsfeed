import { navigate } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
import styled from "styled-components"
import { useQuery } from '../providers/QueryProvider'
import Theme, { ThemedPropsBase, spacing } from '../theme'
import SearchForm from './SearchForm'

const APP_MAX_WIDTH = 1500

const Background = styled.div`
  background-color: beige;
`

const Main = styled.main`
  font-family: Roboto Mono;
  max-width: ${APP_MAX_WIDTH}px;
  margin: auto;
  background-color: palegoldenrod;
  /* ensures the background color is applied to the whole height of the viewport */
  min-height: 100vh;
  /* allows the content to be seen passed the nav bar */
  padding-bottom: 44px;
  /* hack to apply background color to top of headings */
  padding-top: 1px;
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
  @media (max-width: 600px) {
    width: 100%;
  }
  padding-right: ${spacing}px;
`

type LayoutProps = {
  // React component(s) to place in the navbar (left hand)
  navbar?: React.ReactNode
}

// The main layout component
const Layout = ({navbar, children}: React.PropsWithChildren<LayoutProps>): React.ReactElement => {

  // the query context
  const {query, setQuery} = useQuery()

  // submitting any search will navigate to the home page
  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();
    navigate("/")
  }, [])

  return (
    <Theme>
      <Helmet>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link href='https://fonts.googleapis.com/css?family=Roboto Mono' rel='stylesheet'/>
        {/* remove any margin on the <body> */}
        <style>body&#123;margin:0;&#125;</style>
      </Helmet>
      <Background>
        <Main>
          <BottomFixed>
            <Nav>
              <NavButtons>{navbar}</NavButtons>
              <NavSpacer/>
              <NavSearch>
                <SearchForm
                  value={query}
                  onChange={event => setQuery(event.target.value)}
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
