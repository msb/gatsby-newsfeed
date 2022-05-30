import React, { ReactElement } from 'react'
import { PageProps } from 'gatsby'
import { ContentLayout } from '../components'
import ContentTextDigitalDocument, {
  TextDigitalDocumentProps,
} from '../components/content/TextDigitalDocument'

// A newfeed page that renders PDF content.
function TextDigitalDocument(
  { pageContext }: PageProps<never, TextDigitalDocumentProps>,
): ReactElement {
  return (
    <ContentLayout>
      <ContentTextDigitalDocument {...pageContext} />
    </ContentLayout>
  )
}

export default TextDigitalDocument
