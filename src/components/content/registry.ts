import ImageObject from './ImageObject'
import Recipe from './Recipe'
import Table from './Table'
import PDF from './PDF'
import VideoObject from './VideoObject'

// A registry of content components for both built in and external.
// TODO Have a go at typing this.
const registry = new Map()

registry.set('ImageObject', ImageObject)
registry.set('Recipe', Recipe)
registry.set('Table', Table)
registry.set('PDF', PDF)
registry.set('VideoObject', VideoObject)

// TODO Load external content components

export default registry
