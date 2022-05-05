import styled from "styled-components"
import { ThemedPropsBase, spacing } from '../../theme'

type MainImageProps = ThemedPropsBase & {
  // The image width
  $width: number
}

// Styled image to use as the main image in a content component.
const MainImage = styled.img.attrs({decoding: "async"})<MainImageProps>`
  max-width: ${({ $width }: MainImageProps) => $width}px;
  width: 100%;
  height: auto;
  margin-right: ${spacing}px;
`

export default MainImage