import React, { ReactElement, ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import { Paper, Title } from '../components'
import QueryProvider from '../providers/QueryProvider';

// This layout is used by "gatsby-plugin-layout" and exists purely to persist context over
// different pages.
function ContextLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <MDXProvider components={{ Link, Paper, Title }}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </MDXProvider>
  )
}

export default ContextLayout
