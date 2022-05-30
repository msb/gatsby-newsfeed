import React, { ReactElement } from 'react'
import { PageProps } from 'gatsby'
import { ContentLayout } from '../components'
import ContentPDF, {
  PDFProps,
} from '../components/content/PDF'

// A newfeed page that renders PDF content.
function PDF({ pageContext }: PageProps<never, PDFProps>): ReactElement {
  return (
    <ContentLayout>
      <ContentPDF {...pageContext} />
    </ContentLayout>
  )
}

export default PDF
