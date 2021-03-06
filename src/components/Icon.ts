import styled from 'styled-components'

type IconProps = {
  // size of the icon font in px
  size?: number
}

// Simple component encapsulating styles for the material icons font.
// https://developers.google.com/fonts/docs/material_icons
const Icon = styled.i<IconProps>`
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: ${({ size }: IconProps) => size || 24}px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;
  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;
  /* Support for IE. */
  font-feature-settings: 'liga';
`

export default Icon
