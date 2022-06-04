import React, { ReactElement } from 'react'
import { PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ContentLayout } from '../components'
import { BasePost } from '.'

type DataProps = {
  // The MDX frontmatter
  frontmatter: BasePost
  // The MDX content
  body: string
}

// A newfeed page that renders simple/custom MDX pages.
function MdxContent(
  { pageContext: { body, frontmatter } }: PageProps<never, DataProps>,
): ReactElement {
  return (
    <ContentLayout>
      <MDXRenderer {...frontmatter}>{ body }</MDXRenderer>
    </ContentLayout>
  )
}

export default MdxContent
