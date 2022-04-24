import React, { FC, ReactElement } from 'react'
import { IGatsbyImageData  } from 'gatsby-plugin-image';
import Picture from '../Picture';
import TwoPanelLayout from './TwoPanelLayout';
import MainImage from './MainImage';

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
const Recipe: FC<RecipeProps> = ({ body, image: { childImageSharp }, title }): ReactElement => {
  const { gatsbyImageData: {images, width} } = childImageSharp

  if (images.sources === undefined) {
    // sources appears never to be `undefined` (maybe poor typing?) so no need
    // to handle this gracefully.
    return <></>
  }

  return <TwoPanelLayout title={title} body={body} >
    <Picture sources={images.sources}>
      <MainImage decoding="async" {...images.fallback} alt={title} width={width} />
    </Picture>
  </TwoPanelLayout>
}

export default Recipe