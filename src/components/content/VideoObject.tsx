import React, { FC, ReactElement } from 'react'
import styled from "styled-components"
import ReactPlayer from 'react-player'
import TwoPanelLayout from './TwoPanelLayout'
import { MdxComponentProps } from '.'

type WrapperProps = {
  // The aspect ratio to be applied to the video.
  $aspectRatio: string
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio || "16 / 9"};
`

const Iframe = styled.iframe.attrs({frameBorder: 0, allowFullScreen: true})`
  width: 100%;
  height: 100%; 
`

export type VideoObjectObjectProps = MdxComponentProps & ({
  // A static video resource with it's public URL
  file: { publicURL: string }
  // null if `file` is set
  embedUrl: null
} | {
  // The url of an external video resource
  embedUrl: string
  // null if `embedUrl` is set
  file: null
}) & {
  // The aspect ratio to be applied to the video (if any)
  aspectRatio?: string
}

// A component that renders video object content.
const VideoObject: FC<VideoObjectObjectProps> = (
  { title, body, embedUrl, file, aspectRatio = "16 / 9"}
): ReactElement => {
  const url = (embedUrl || file?.publicURL) as string
  return <TwoPanelLayout title={title} body={body} leftWidthRatio={0.65} >
    <Wrapper $aspectRatio={aspectRatio}>
      {
        url.includes("drive.google.com")
        ?
        /* TODO: Investigate the possibility of `react-player` embedding Google Drive videos. */
        <Iframe title={title} src={url} />
        :
        <ReactPlayer url={url} controls={true} width="100%" height="100%"/>
      }
    </Wrapper>
  </TwoPanelLayout>
}

export default VideoObject