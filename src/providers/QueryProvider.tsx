import React, { FC } from 'react';

type Query = {
  query: string
  setQuery: (query: string) => void
}

// React context for the current index query.
const QueryContext = React.createContext<Query>({query: "", setQuery: () => null})

// Context provider for the current query text.
const QueryProvider: FC = ({children}) => {

  const [query, setQuery] = React.useState("")

  return <QueryContext.Provider value={{query, setQuery}}>
    { children }
  </QueryContext.Provider>
}

export default QueryProvider

export const useQuery = (): Query => React.useContext(QueryContext)