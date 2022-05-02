import Recipe from './Recipe'
import ImageObject from './ImageObject'
import VideoObject from './VideoObject'

// A registry of content components for both built in and external.
// TODO Have a go at typing this.
const registry = new Map()

registry.set('ImageObject', ImageObject)
registry.set('Recipe', Recipe)
registry.set('VideoObject', VideoObject)

// TODO Load external content components

export default registry
