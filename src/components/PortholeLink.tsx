import React, { useState } from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Link } from "gatsby";
import styled from "styled-components"
import { kebabCase } from "lodash"
import { IResponsiveImageProps, SourceProps } from 'gatsby-plugin-image/dist/src/components/picture';

// The size of the porthole in px.
const PORTHOLE_SIZE = 200;
// The hover size of the image in px.
const HOVER_SIZE = PORTHOLE_SIZE + 40;

const Title = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  max-width: 230px;
  text-align: center;
`

const Wrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
`

const Porthole = styled.div`
  border: 15px solid #c4d4e0;
  border-radius: ${PORTHOLE_SIZE}px;
  height: ${PORTHOLE_SIZE}px;
  width: ${PORTHOLE_SIZE}px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.80);
  margin-top: 8px;
`

// TODO experiment with <a>> wrapping the <img> and being the sized element
// -> allows the hover to act on <a> -> allows the hover to be style driven.
const StyledLink = styled(Link)`
  border-radius: ${PORTHOLE_SIZE}px;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.80);
  display: block;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 90;
  text-indent: -9999px;
`

const BASE_IMAGE_STYLE: React.CSSProperties = {
  width: "auto",
  position: "absolute",
  transition: "all 0.2s ease-in-out",
}

type LinkImageProps = {
  // image data for the `<sources>` element
  sources: SourceProps[]
  // image data for the `<img>` element
  fallback?: { src: string } & Partial<IResponsiveImageProps>
  // the image alt text
  alt: string
  // the image style
  style: React.CSSProperties
}

// Renders the `<picture>` element of the page link. I couldn't use `<GatsbyImage>` here
// because of the styling requirements.
const LinkImage:React.FC<LinkImageProps> = ({ sources, fallback, alt, style }) => (
  <picture>
    { sources.map((source: SourceProps) => <source key={source.type} {...source}/>) }
    <img decoding="async" {...fallback} alt={alt} style={style}/>
  </picture>
)

// TODO doesn't belong here as PortholeLink is a specific instance of a page link.
export type LinkProperties = {
  // the link's title
  title: string
  // the slug (used to link to the content page)
  slug?: string
  // the date the content was published (TODO show this somewhere)
  date: Date
  // the link's image data (Gatsby specific)
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

// Based closely on https://codepen.io/mackorichardson/pen/prJyq, this component renders a page
// link styled as a porthole with an image framed in the porthole. The hover event causes the image
// to zoom slightly.
const PortholeLink:React.FC<LinkProperties> = ({ title, slug, image: { childImageSharp } }) => {

  const { gatsbyImageData: imageData } = childImageSharp
  const sizedWidth = PORTHOLE_SIZE * imageData.width / imageData.height

  const initialImagePositionStyle = {
    height: PORTHOLE_SIZE, top: 0, left: - (sizedWidth - PORTHOLE_SIZE) / 2
  }

  const [imagePositionStyle, setImagePositionStyle] = useState(initialImagePositionStyle);

  // hover start
  const onMouseEnter = () => setImagePositionStyle({
    height: HOVER_SIZE,
    top: - (HOVER_SIZE - PORTHOLE_SIZE) / 2,
    left: - (sizedWidth * HOVER_SIZE / PORTHOLE_SIZE - PORTHOLE_SIZE) / 2,
  })

  // hover finish
  const onMouseLeave = () => setImagePositionStyle(initialImagePositionStyle)

  if (imageData.images.sources === undefined || imageData.images.fallback === undefined) {
    // these properties appear never to be `undefined` (maybe poor typing?) so no need
    // to handle this gracefully.
    return null
  }

  return <>
    <Wrapper>
      <Porthole>
        <StyledLink
          to={ slug || kebabCase(title) } 
          onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        >
          { title }
        </StyledLink>
        <LinkImage
          sources={imageData.images.sources}
          fallback={imageData.images.fallback}
          alt={title}
          style={{...BASE_IMAGE_STYLE, ...imagePositionStyle}}
        />
      </Porthole>
    </Wrapper>
    <Title>
      <h3>{ title }</h3>
    </Title>
  </>
}

export default PortholeLink;
