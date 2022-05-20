import React, { FC, ReactElement, useState } from 'react'
import styled from 'styled-components'
import { pdfjs, Document, Page } from 'react-pdf'
import { ThemedPropsBase, spacing } from '../../theme'
import { MdxComponentProps } from '.'

// configured `react-pdf` to use minified worker (https://www.npmjs.com/package/react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

const CENTRE_STYLE = `
  display: flex;
  align-items: center;
  justify-content: center;
`

const Centred = styled.div`
  ${CENTRE_STYLE}
`

const Title = styled.h2<ThemedPropsBase>`
  ${CENTRE_STYLE}

  @media (min-width: ${({ theme }) => theme.break}px) {
    display: none;
  }
`

const StyledDocument = styled(Document)<ThemedPropsBase>`
  @media (max-width: ${({ theme }) => theme.break}px) {
    display: none;
  }
`

const DownloadButton = styled.a.attrs({ download: true })<ThemedPropsBase>`
  display: block;
  width: 115px;
  height: 25px;
  background: #4285f4;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  line-height: 25px;
  margin-top: ${spacing}px;
  &:hover {
    filter: brightness(120%);
  }
  &::before {
    content: "Download";
  }
`

const StyledPage = styled(Page)<ThemedPropsBase>`
  margin-top: ${spacing}px
`

type TextDigitalDocumentProps = MdxComponentProps & {
  // The link to the PDF
  file: { publicURL: string }
}

// A content component that renders a PDF document
const TextDigitalDocument: FC<TextDigitalDocumentProps> = ({
  title, file: { publicURL },
}): ReactElement => {
  const [numPages, setNumPages] = useState(1)

  const pages = []
  for (let i = 1; i <= numPages; i += 1) {
    pages.push(<StyledPage key={i} pageNumber={i} />)
  }

  return (
    <>
      <Title>{ title }</Title>
      <Title as="h4">Please download to view.</Title>
      <Centred>
        <StyledDocument file={publicURL} onLoadSuccess={({ numPages: n }) => setNumPages(n)}>
          { pages }
        </StyledDocument>
      </Centred>
      <Centred>
        <DownloadButton href={publicURL} />
      </Centred>
    </>
  )
}

export default TextDigitalDocument
