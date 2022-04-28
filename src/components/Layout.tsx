import { navigate } from 'gatsby'
import React from 'react'
import styled from "styled-components"
import { useQuery } from '../providers/QueryProvider'
import Icon from './Icon'

const Main = styled.main`
  max-width: 1500px;
  margin: auto;
  background-color: palegoldenrod;
  /* ensures the background color is applied to the whole height of the viewport */
  min-height: 100vh;
  /* allows the content to be seen passed the nav bar */
  padding-bottom: 44px;
  /* hack to apply background color to top of headings */
  padding-top: 1px;
`

const BottomFixed = styled.div`
  position: fixed;
  bottom: 8px;
  left: 0;
  right: 0;
  z-index: 99;
`

const Nav = styled.nav`
  max-width: 1500px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`

const NavButtons = styled.div`
  display: flex;
  padding-left: 8px;
`

// TODO On the index page (for small screens) the search bar has too much LH padding.
const NavSpacer = styled.div`
  width: 8px;
`

const SEARCH_WIDTH = `
  width: 300px;
  @media (max-width: 600px) {
    width: 100%;
  }
`

const NavSearch = styled.div`
  ${SEARCH_WIDTH}
  padding-right: 8px;
`

const SearchForm = styled.form`
  display: flex;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.40);
`

const SearchInput = styled.input`
  border: none;
  height: 40px;
  /* TODO tie back to theme */
  font-family: "Roboto Mono";
  padding: 0 8px;
  &:focus{
    outline: none;
  }
  font-size: 1em;
  ${SEARCH_WIDTH}
`

const SearchButton = styled.button`
  background: gray;
  border: none;
  cursor: pointer;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #ccc;
  }
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
    <Main>
      <BottomFixed>
        <Nav>
          <NavButtons>{navbar}</NavButtons>
          <NavSpacer/>
          <NavSearch>
            <SearchForm onSubmit={handleSubmit}>
              <SearchInput 
                type="search" placeholder="Search the content"
                onChange={event => setQuery(event.target.value)}
                value={query}
              />
              <SearchButton type="submit">
                <Icon>search</Icon>
              </SearchButton>
            </SearchForm>
          </NavSearch>
        </Nav>
      </BottomFixed>
      {children}
    </Main>
  )
}

export default Layout
