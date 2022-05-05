import React, { FC } from 'react'
import styled from "styled-components"
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ThemedPropsBase, spacing } from '../../theme'
import { Paper } from '..'
import { MdxComponentProps } from '.'

const BREAK_WIDTH = 1200

const Title = styled.h2<ThemedPropsBase>`
  margin-left: ${spacing}px;
`

const Container = styled.div<ThemedPropsBase>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  padding: ${spacing}px;
`

type PanelProps = ThemedPropsBase & {
  // The percentage width of a panel
  $width: number
}

// creates common width style
const makeWidthStyle = (width: number) => (`
  max-width: ${width}%;
  flex-basis: ${width}%;
`)

const PanelLeft = styled.div<PanelProps>`
  margin-bottom: ${spacing}px;
  flex-grow: 0;
  ${makeWidthStyle(100)}
  @media (min-width: ${BREAK_WIDTH}px) {
    ${({ $width }: PanelProps) => makeWidthStyle($width)}
    justify-content: space-between;
  }
  display: flex;
  justify-content: center;
`

const PanelRight = styled.div<PanelProps>`
  flex-grow: 0;
  ${makeWidthStyle(100)}
  @media (min-width: ${BREAK_WIDTH}px) {
    ${({ $width }: PanelProps) => makeWidthStyle($width)}
  }
`

const PanelRightPaper = styled(Paper)<ThemedPropsBase>`
  @media (min-width: ${BREAK_WIDTH}px) {
    margin-left: ${spacing}px;
  }
`

export type TwoPanelLayoutProps = MdxComponentProps & {
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
      <PanelLeft $width={leftWidthRatio * 100}>{ children }</PanelLeft>
      <PanelRight $width={(1 - leftWidthRatio) * 100}>
        <PanelRightPaper>
          <MDXRenderer>{ body }</MDXRenderer>
        </PanelRightPaper>
      </PanelRight>
    </Container>
  </>
)

export default TwoPanelLayout