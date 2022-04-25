import React, { FC, ReactElement } from 'react'
import { IGatsbyImageData  } from 'gatsby-plugin-image'
import { Picture } from '..'
import TwoPanelLayout from './TwoPanelLayout'
import MainImage from './MainImage'

export type RecipeProps = {
  // The content's title
  title: string
  // The content's main image data
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  // The content's text data
  body: string,
}

// A component that renders recipe content.
const Recipe: FC<RecipeProps> = (
  { body, image: { childImageSharp: { gatsbyImageData: { images, width } } }, title }
): ReactElement => (
  <TwoPanelLayout title={title} body={body} >
    <Picture sources={images.sources}>
      <MainImage decoding="async" {...images.fallback} alt={title} width={width} />
    </Picture>
  </TwoPanelLayout>
)

export default Recipe