import React, {ReactNode, useCallback} from 'react'
import styled from "styled-components"
import { useQuery } from '../providers/QueryProvider'
import Icon from './Icon'

const Main = styled.main`
  max-width: 1500px;
  margin: auto;
  /* allows the content to be seen passed the nav bar */
  margin-bottom: 44px;
`

const BottomFixed = styled.div`
  position: fixed;
  bottom: 8px;
  left: 8px;
  right: 8px;
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
`

const SEARCH_WIDTH = `
  width: 300px;
  @media (max-width: 600px) {
    width: 100%;
  }
`

const NavSearch = styled.div`
  ${SEARCH_WIDTH}
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
  navbar?: ReactNode
}

// The main layout component
const Layout = ({navbar, children}: React.PropsWithChildren<LayoutProps>) => {

  const {query, setQuery} = useQuery()

  const handleSubmit = useCallback((event) => {
    // FIXME
  }, [])

  // if (typeof window === `undefined`) {
  //   return <></>
  // }

  return (
    <Main>
      <BottomFixed>
        <Nav>
          <NavButtons>{navbar}</NavButtons>
          <NavSearch>
            <SearchForm onSubmit={handleSubmit}>
              <SearchInput 
                type="search" placeholder="Search the content" name="search"
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
