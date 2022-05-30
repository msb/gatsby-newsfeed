import React, { ReactElement, ReactNode } from 'react';
import QueryProvider from '../providers/QueryProvider';

// This layout is used by "gatsby-plugin-layout" and exists purely to persist context over
// different pages.
function ContextLayout({ children }: { children: ReactNode }): ReactElement {
  return <QueryProvider>{children}</QueryProvider>
}

export default ContextLayout
