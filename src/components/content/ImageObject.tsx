import React, { FC, ReactElement } from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Picture } from '..'
import TwoPanelLayout from './TwoPanelLayout'
import MainImage from './MainImage'
import { MdxComponentProps } from '.'

export type ImageObjectProps = MdxComponentProps & {
  // The content's main image data
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

// A component that renders image object content.
const ImageObject: FC<ImageObjectProps> = ({
  body, image: { childImageSharp: { gatsbyImageData: { images, width } } }, title,
}): ReactElement => (
  <TwoPanelLayout title={title} body={body} leftWidthRatio={0.65}>
    <Picture sources={images.sources}>
      <MainImage {...images.fallback} alt={title} $width={width} />
    </Picture>
  </TwoPanelLayout>
)

export default ImageObject
