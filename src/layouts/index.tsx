import React, { ReactElement, ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import QueryProvider from '../providers/QueryProvider';
import IndexPageProvider from '../providers/IndexPageProvider';

// This layout is used by "gatsby-plugin-layout" and exists purely to persist context over
// different pages.
function ContextLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <MDXProvider components={{ Link }}>
      <QueryProvider>
        <IndexPageProvider>
          {children}
        </IndexPageProvider>
      </QueryProvider>
    </MDXProvider>
  )
}

export default ContextLayout
