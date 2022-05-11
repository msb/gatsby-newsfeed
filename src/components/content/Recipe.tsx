import React, { FC, ReactElement } from 'react'
import { Picture } from '..'
import TwoPanelLayout from './TwoPanelLayout'
import MainImage from './MainImage'
import { ImageObjectProps } from './ImageObject'

// A component that renders recipe content.
const Recipe: FC<ImageObjectProps> = ({
  body, image: { childImageSharp: { gatsbyImageData: { images, width } } }, title,
}): ReactElement => (
  <TwoPanelLayout title={title} body={body}>
    <Picture sources={images.sources}>
      <MainImage {...images.fallback} alt={title} $width={width} />
    </Picture>
  </TwoPanelLayout>
)

export default Recipe
