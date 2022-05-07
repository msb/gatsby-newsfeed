import { IGatsbyImageData } from 'gatsby-plugin-image'
import Icon from './Icon'
import Layout from './Layout'
import Paper from './Paper'
import Picture from './Picture'
import PortholeLink from './PortholeLink'
import Title from './Title'

// The properties of an index page image link component.
type LinkProps = {
  // the link's title
  title: string
  // the slug (used to link to the content page)
  slug: string
  // the date the content was published (TODO show this somewhere)
  date: Date
  // the link's image data (Gatsby specific)
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

export type { LinkProps }
export { Icon, Layout, PortholeLink, Paper, Picture, Title }
