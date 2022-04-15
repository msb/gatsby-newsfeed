import React, { useState } from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Link } from "gatsby";
import styled from "styled-components"
import { kebabCase } from "lodash"
import { SourceProps } from 'gatsby-plugin-image/dist/src/components/picture';

// TODO doesn't belong here
export type LinkProperties = {
  title: string
  slug?: string
  // TODO show date somewhere
  date: Date
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const PORTHOLE_SIZE = 200;
const ZOOM_SIZE = PORTHOLE_SIZE + 40;

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
// -> allows the hover to act on <a> -> allows the zoom to be style driven.
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

// based closely on this example: https://codepen.io/mackorichardson/pen/prJyq

const PortholeLink:React.FC<LinkProperties> = ({ title, slug, image: { childImageSharp: { gatsbyImageData: imageData } } }) => {

  const sizedWidth = PORTHOLE_SIZE * imageData.width / imageData.height

  const initialImagePositionStyle = {
    height: PORTHOLE_SIZE, top: 0, left: - (sizedWidth - PORTHOLE_SIZE) / 2
  }

  const [imagePositionStyle, setImagePositionStyle] = useState(initialImagePositionStyle);

  const onMouseEnter = () => setImagePositionStyle({
    height: ZOOM_SIZE,
    top: - (ZOOM_SIZE - PORTHOLE_SIZE) / 2,
    left: - (sizedWidth * ZOOM_SIZE / PORTHOLE_SIZE - PORTHOLE_SIZE) / 2,
  })

  const onMouseLeave = () => setImagePositionStyle(initialImagePositionStyle)

  return <>
    <Wrapper>
      <Porthole>
        <StyledLink to={ slug || kebabCase(title) } onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
          { title }
        </StyledLink>
        {/* FIXME lift this out as a local component */}
        <picture>
          {
            imageData.images.sources
            ?
            imageData.images.sources.map((source: SourceProps) => <source key={source.type} {...source}/>)
            :
            null
          }
          {
            imageData.images.fallback
            ?
            <img decoding="async" {...imageData.images.fallback}
              alt={title} 
              style={{...BASE_IMAGE_STYLE, ...imagePositionStyle}}/>
            :
            null
          }
        </picture>
      </Porthole>
    </Wrapper>
    <Title>
      <h3>{ title }</h3>
    </Title>
  </>
}

export default PortholeLink;
