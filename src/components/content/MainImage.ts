import styled from "styled-components"

type MainImageProps = {
  // The image width
  width: number
}

// Styled image to use as the main image in a content component.
const MainImage = styled.img<MainImageProps>`
  max-width: ${({ width }: MainImageProps) => width}px;
  width: 100%;
  height: auto;
  margin-right: 8px;
`

export default MainImage