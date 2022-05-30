import React, { PropsWithChildren, ReactElement } from 'react'
// eslint-disable-next-line import/no-unresolved
import { SourceProps } from 'gatsby-plugin-image/dist/src/components/picture';

export type PictureProps = {
  // image data for the `<source>` elements
  sources?: SourceProps[]
}

// Simple component that renders a <picture> element along with it's <source> elements.
function Picture({ sources, children }: PropsWithChildren<PictureProps>): ReactElement {
  return (
    <picture>
      { (sources || []).map((source: SourceProps) => <source key={source.type} {...source} />) }
      { children }
    </picture>
  )
}

export default Picture
