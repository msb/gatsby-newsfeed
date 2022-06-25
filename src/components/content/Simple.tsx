import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ThemedPropsBase, spacing } from '../../theme'
import { MdxComponentProps } from '.'

const Container = styled.div<ThemedPropsBase>`
  max-width: 800px;
  margin: auto;
  padding-left: ${spacing}px;
  padding-right: ${spacing}px;
`

// A component that renders simple content.
function Simple({ body, ...frontmatter }: MdxComponentProps): ReactElement {
  return (
    <Container>
      <MDXRenderer {...frontmatter}>{ body }</MDXRenderer>
    </Container>
  )
}

export default Simple
