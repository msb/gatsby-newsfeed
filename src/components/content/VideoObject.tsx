import React, { FC, ReactElement } from 'react'
import styled from "styled-components"
import ReactPlayer from 'react-player'
import TwoPanelLayout from './TwoPanelLayout'
import { MdxComponentProps } from '.'

type WrapperProps = {
  // The aspect ratio to be applied to the video.
  aspect: string
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  aspect-ratio: ${({ aspect }) => aspect || "16 / 9"};
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%; 
`

export type VideoObjectObjectProps = MdxComponentProps & {
  // The url of an external video resource (either embedUrl or file must be given).
  embedUrl: null | string
  // A static video resource with it's public URL (either embedUrl or file must be given).
  file: null | {
    publicURL: string    
  }
  // The aspect ratio to be applied to the video (if any)
  aspectRatio?: string
}

// A component that renders video object content.
const VideoObject: FC<VideoObjectObjectProps> = (
  { title, body, embedUrl, file, aspectRatio = "16 / 9"}
): ReactElement => {
  const url = (embedUrl || file?.publicURL) as string
  return <TwoPanelLayout title={title} body={body} leftWidthRatio={0.65} >
    <Wrapper aspect={aspectRatio}>
      {
        url.includes("drive.google.com")
        ?
        /* TODO: Investigate the possibility of `react-player` embedding Google Drive videos. */
        <Iframe title={title} src={url} frameBorder={0} allowFullScreen />
        :
        <ReactPlayer url={url} controls={true} width="100%" height="100%"/>
      }
    </Wrapper>
  </TwoPanelLayout>
}

export default VideoObject