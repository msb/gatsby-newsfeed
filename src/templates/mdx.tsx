import React, { ReactElement } from 'react'
import { PageProps } from 'gatsby'
import { ContentLayout } from '../components'
import registry from '../components/content/registry'
import { BasePost } from '.'

type DataProps = {
  // The MDX frontmatter (we only type the field sufficiently for resolving the component)
  frontmatter: BasePost
  // The MDX content
  body: string
}

// A newfeed page that renders all content sourced from MDX nodes. The content is rendered by
// different `content` components depending the `type` defined in the frontmatter.
function MdxContent(
  { pageContext: { body, frontmatter } }: PageProps<never, DataProps>,
): ReactElement {
  const Component = registry.get(frontmatter.type)
  return (
    <ContentLayout>
      <Component {...{ ...frontmatter, body }} />
    </ContentLayout>
  )
}

export default MdxContent
