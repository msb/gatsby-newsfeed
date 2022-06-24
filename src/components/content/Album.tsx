import React, { ReactElement, useState } from 'react'
import { useWindowSize } from 'react-use'
import styled from 'styled-components'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { MdxComponentProps } from '.'
import Picture from '../Picture'
import '@reach/dialog/styles.css'

// TODO re-org code - Lightbox component?
// TODO album title?
// TODO photo caption
// TODO back button
// TODO close button
// TODO extract fitToBox()

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: flex-start;
`

const WIDTH = 300;
const HEIGHT = 200;

const ThumbnailBox = styled.div`
  position: relative;
  overflow: clip;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  background-color: grey;
  margin: 1px;
`

type DimProps = {
  $width: number
  $height: number
}

const BlurredBack = styled.img.attrs({ decoding: 'async' })<DimProps>`
  transition: opacity 0.4s;
  display: block;
  position: absolute;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  left: ${({ $width }) => (WIDTH - $width) / 2}px;
  top: ${({ $height }) => (HEIGHT - $height) / 2}px;
  filter: blur(12px);
`

const Thumbnail = styled.img.attrs({ decoding: 'async' })<DimProps>`
  transition: opacity 0.4s;
  display: block;
  position: absolute;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  left: ${({ $width }) => (WIDTH - $width) / 2}px;
  top: ${({ $height }) => (HEIGHT - $height) / 2}px;
`

// Styled image to use as the main image in a content component.
const MainImage = styled.img.attrs({ decoding: 'async' })`
  width: 100%;
  height: auto;
`

const StyledDialogOverlay = styled(DialogOverlay)`
  background: rgba(0, 0, 0, 0.9);
`

type StyledDialogContentProps = DimProps & {
  $left: number
  $top: number
}

const StyledDialogContent = styled(DialogContent)<StyledDialogContentProps>`
  transition: opacity 0.4s;
  padding: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
`

type Photo = {
  photo: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  caption: string | null
}

type AlbumProps = MdxComponentProps & {
  // FIXME
  photos: Photo[]
}

// FIXME
const HEIGHT_CORRECTION = 7;

function Album({ photos }: AlbumProps): ReactElement {
  const {width: winWidth, height: winHeight} = useWindowSize();
  const [index, setIndex] = useState<number>(-1)
  // if no selection, then set the selected photo to 0 (TODO something better?)
  const selectedPhoto = photos[index === -1 ? 0 : index]
  const { caption, photo: { childImageSharp: { gatsbyImageData: { images: selImages, width: selWidth, height: selHeight } } } } = selectedPhoto
  const minWinRatio = Math.min(Math.min(winWidth, 1500) / selWidth, (winHeight - HEIGHT_CORRECTION) / selHeight, 1)
  return (
    <>
      <Container>
        {
          photos.map((photo, index) => {
            const { caption, photo: { childImageSharp: { gatsbyImageData } } } = photo
            const { images, width, height } = gatsbyImageData
            const minRatio = Math.min(WIDTH / width, HEIGHT / height)
            const maxRatio = Math.max(WIDTH / width, HEIGHT / height)
            return (
              <ThumbnailBox key={images.fallback?.src}>
                <Picture sources={images.sources}>
                  <BlurredBack
                    {...images.fallback}
                    alt={caption || ''}
                    $width={width * maxRatio}
                    $height={height * maxRatio}
                  />
                </Picture>
                <Picture sources={images.sources}>
                  <Thumbnail
                    {...images.fallback}
                    alt={caption || ''}
                    $width={width * minRatio}
                    $height={height * minRatio}
                    onClick={() => setIndex(index)}
                  />
                </Picture>
              </ThumbnailBox>
            )
          })
        }
      </Container>
      <StyledDialogOverlay
        isOpen={index !== -1}
        onDismiss={() => setIndex(-1)}
      >
        <StyledDialogContent
          aria-labelledby="FIXME"
          $width={selWidth * minWinRatio}
          $height={selHeight * minWinRatio}
          $left={(winWidth - (selWidth * minWinRatio)) / 2}
          $top={(winHeight - (selHeight * minWinRatio)) / 2}
        >
          <Picture sources={selImages.sources}>
            <MainImage
              {...selImages.fallback}
              alt={caption || ''}
              onClick={() => setIndex((index + 1) % photos.length)}
            />
          </Picture>
        </StyledDialogContent>
      </StyledDialogOverlay>
    </>
  )
}

export default Album
