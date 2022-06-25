import Image from './Image'
import Table from './Table'
import PDF from './PDF'
import Simple from './Simple'
import Video from './Video'

// A registry of content components for both built in and external.
// TODO Have a go at typing this.
const registry = new Map()

registry.set('Image', Image)
registry.set('Table', Table)
registry.set('PDF', PDF)
registry.set('Simple', Simple)
registry.set('Video', Video)

// TODO Load external content components

export default registry
