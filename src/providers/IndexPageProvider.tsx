import React, {
  useState, useMemo, ReactNode, ReactElement,
} from 'react'

type IndexPage = {
  indexPage: string
  setIndexPage: (indexPage: string) => void // eslint-disable-line no-unused-vars
}

// React context for the current index page.
const IndexPageContext = React.createContext<IndexPage>({ indexPage: '/', setIndexPage: () => null })

// Context provider for the current index page.
function IndexPageProvider({ children }: { children: ReactNode }): ReactElement {
  const [indexPage, setIndexPage] = useState('')

  const value = useMemo(() => ({ indexPage, setIndexPage }), [indexPage, setIndexPage])

  return (
    <IndexPageContext.Provider value={value}>
      { children }
    </IndexPageContext.Provider>
  )
}

export default IndexPageProvider

export const useIndexPage = (): IndexPage => React.useContext(IndexPageContext)
