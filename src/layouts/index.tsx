import React, { FC } from 'react';
import QueryProvider from '../providers/QueryProvider';

// This layout is used by "gatsby-plugin-layout" and exists purely to persist context over
// different pages.
const ContextLayout: FC = ({children}) => (
  <QueryProvider>{children}</QueryProvider>
)

export default ContextLayout
