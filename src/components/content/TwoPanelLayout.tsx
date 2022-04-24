import React, { FC } from 'react'
import styled from "styled-components"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Paper } from '..'

const BREAK_WIDTH = 1200

const Title = styled.h2`
  margin-left: 8px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  padding: 8px;
`

type PanelProps = {
  // The percentage width of a panel
  width: number
}

// creates common width style
const makeWidthStyle = (width: number) => (`
  max-width: ${width}%;
  flex-basis: ${width}%;
`)

const PanelLeft = styled.div<PanelProps>`
  margin-bottom: 8px;
  flex-grow: 0;
  ${makeWidthStyle(100)}
  @media (min-width: ${BREAK_WIDTH}px) {
    ${({ width }: PanelProps) => makeWidthStyle(width)}
    justify-content: space-between;
  }
  display: flex;
  justify-content: center;
`

const PanelRight = styled.div<PanelProps>`
  flex-grow: 0;
  ${makeWidthStyle(100)}
  @media (min-width: ${BREAK_WIDTH}px) {
    ${({ width }: PanelProps) => makeWidthStyle(width)}
  }
`

const PanelRightPaper = styled(Paper)`
  @media (min-width: ${BREAK_WIDTH}px) {
    margin-left: 8px;
  }
`

export type TwoPanelLayoutProps = {
  // The page's title.
  title: string
  // The MDX text content.
  body: string,
  // The width ratio of the left hand panel.
  leftWidthRatio?: number
}

// This component renders a responsive two panel layout with the image/video etc in the left hand
// panel and the text content in the right hand panel.
const TwoPanelLayout: FC<TwoPanelLayoutProps> = (
  { title, body, children, leftWidthRatio = 0.5 }
): React.ReactElement => (
  <>
    <Title>{ title }</Title>
    <Container>
      <PanelLeft width={leftWidthRatio * 100}>{ children }</PanelLeft>
      <PanelRight width={(1 - leftWidthRatio) * 100}>
        <PanelRightPaper>
          <MDXRenderer>{ body }</MDXRenderer>
        </PanelRightPaper>
      </PanelRight>
    </Container>
  </>
)

export default TwoPanelLayout