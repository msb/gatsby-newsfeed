import styled from "styled-components"
import { ThemedPropsBase, spacing } from '../theme'

// Simple component encapsulating styles for a paper component.
const Paper = styled.div<ThemedPropsBase>`
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%);
  padding: ${spacing}px;
  /* included to handle MDX content with no text */
  &:empty {
    display: none;
  }
  margin-bottom: ${spacing}px;
`

export default Paper
