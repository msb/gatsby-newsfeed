import React, {useCallback} from 'react'
import { useWindowSize } from 'react-use'
import styled from "styled-components"
import Icon from './Icon'

const Main = styled.main`
  max-width: 1500px;
  margin: auto;
  /* allows the content to be seen passed the nav bar */
  margin-bottom: 44px;
  background-color: palegoldenrod;
`

const NavRight = styled.div`
  position: fixed;
  bottom: 8px;
  z-index: 99;
`

const Search = styled.form`
  display: flex;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.40);
`

const SearchInput = styled.input`
  border: none;
  height: 40px;
  /* TODO tie back to theme */
  font-family: "Roboto Mono";
  padding: 0 4px;
  &:focus{
    outline: none;
  }
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

export const calcNavOffset = (width: number) => (
  8 + Math.max(width - 1500, 0) / 2
)

const Layout = ({children}: React.PropsWithChildren<unknown>) => {

  // const {query, setQuery} = useIndex()
  const query = "" // FIXME

  const handleChange = useCallback((value) => {
    // FIXME
  }, [])

  const handleSubmit = useCallback((event) => {
    // FIXME
  }, [])

  const { width } = useWindowSize()

  // suppress SSR because of dynamic <NavRight> positioning
  if (typeof window === `undefined`) {
    return <></>
  }

  return (
    <Main>
      <NavRight style={{right: calcNavOffset(width)}}>
        <Search onSubmit={handleSubmit}>
          <SearchInput 
            type="text" placeholder="Search the content" name="search"
            onChange={event => handleChange(event.target.value)}
            value={query}
          />
          <SearchButton type="submit">
            <Icon>search</Icon>
          </SearchButton>
        </Search>
      </NavRight>
      {children}
    </Main>
  )
}

export default Layout
