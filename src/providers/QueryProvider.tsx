import React, {
  useState, useMemo, ReactNode, ReactElement,
} from 'react'

type Query = {
  query: string
  setQuery: (query: string) => void // eslint-disable-line no-unused-vars
}

// React context for the current index query.
const QueryContext = React.createContext<Query>({ query: '', setQuery: () => null })

// Context provider for the current query text.
function QueryProvider({ children }: { children: ReactNode }): ReactElement {
  const [query, setQuery] = useState('')

  const value = useMemo(() => ({ query, setQuery }), [query, setQuery])

  return (
    <QueryContext.Provider value={value}>
      { children }
    </QueryContext.Provider>
  )
}

export default QueryProvider

export const useQuery = (): Query => React.useContext(QueryContext)
