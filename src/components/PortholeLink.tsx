import React, { useState } from 'react'
import { Link } from "gatsby"
import styled from "styled-components"
import { ThemedPropsBase, spacing } from '../theme'
import Picture from './Picture'
import { LinkProps } from '.'

// The size of the porthole in px.
const PORTHOLE_SIZE = 200
// The hover size of the image in px.
const HOVER_SIZE = PORTHOLE_SIZE + 40

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

const Porthole = styled.div<ThemedPropsBase>`
  border: 15px solid #c4d4e0;
  border-radius: ${PORTHOLE_SIZE}px;
  height: ${PORTHOLE_SIZE}px;
  width: ${PORTHOLE_SIZE}px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.80);
  margin-top: ${spacing}px;
`

type StyledLinkProps = {
  // the width to height ratio of the contained image
  ratio: number
}

// This styled <Link> sizes itself based on it's contained image's `ratio` and the
// `PORTHOLE_SIZE`. It also handles the zoom effect when the mouse hovers over.
const StyledLink = styled(Link)<StyledLinkProps>`
  border-radius: ${PORTHOLE_SIZE}px;
  display: block;
  overflow: hidden;
  position: absolute;
  z-index: 90;
  transition: all 0.2s ease-in-out;

  width: ${({ratio}) => PORTHOLE_SIZE * ratio}px;
  height: ${PORTHOLE_SIZE}px;
  top: 0px;
  left: ${({ratio}) => - (PORTHOLE_SIZE * ratio - PORTHOLE_SIZE) / 2}px;

  &:hover {
    width: ${({ratio}) => HOVER_SIZE * ratio}px;
    height: ${HOVER_SIZE}px;
    top: ${- (HOVER_SIZE - PORTHOLE_SIZE) / 2}px;
    left: ${({ratio}) => - (ratio * HOVER_SIZE - PORTHOLE_SIZE) / 2}px;
  }
`

const LinkImage = styled.img`
  width: 100%;
  height: 100%;
  transition: opacity 0.4s;
`

// Based closely on https://codepen.io/mackorichardson/pen/prJyq, this component renders a page
// link styled as a porthole with an image framed in the porthole. The hover event causes the image
// to zoom slightly.
const PortholeLink:React.FC<LinkProps> = ({ title, slug, image: { childImageSharp } }) => {

  const { gatsbyImageData: {images, width, height} } = childImageSharp

  const [opacity, setOpacity] = useState(0)

  return <>
    <Wrapper>
      <Porthole>
        <StyledLink to={ slug } ratio={width / height}>
          <Picture sources={images.sources}>
            <LinkImage decoding="async" {...images.fallback} alt={title}
              onLoad={() => setOpacity(1)} style={{opacity}}
            />
          </Picture>
        </StyledLink>
      </Porthole>
    </Wrapper>
    <Title>
      <h3>{ title }</h3>
    </Title>
  </>
}

export default PortholeLink
