import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { ThemedPropsBase, spacing } from '../../theme'
import { Picture } from '..'
import TwoPanelLayout from './TwoPanelLayout'
import { MdxComponentProps } from '.'

type MainImageProps = ThemedPropsBase & {
  // The image width
  $width: number
}

// Styled image to use as the main image in a content component.
const MainImage = styled.img.attrs({ decoding: 'async' })<MainImageProps>`
  max-width: ${({ $width }: MainImageProps) => $width}px;
  width: 100%;
  height: auto;
  margin-right: ${spacing}px;
`

export type ImageProps = MdxComponentProps & {
  // The content's main image data
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  // The width ratio of the left hand panel.
  leftWidthRatio: number
}

// A component that renders image content.
function Image({
  body, title, leftWidthRatio,
  image: { childImageSharp: { gatsbyImageData: { images, width } } },
}: ImageProps): ReactElement {
  return (
    <TwoPanelLayout title={title} body={body} leftWidthRatio={leftWidthRatio || 0.5}>
      <Picture sources={images.sources}>
        <MainImage {...images.fallback} alt={title} $width={width} />
      </Picture>
    </TwoPanelLayout>
  )
}

export default Image
