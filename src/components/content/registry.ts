import Recipe from './Recipe'
import ImageObject from './ImageObject'

// A registry of content components for both built in and external.
// TODO Have a go at typing this.
const registry = new Map()

registry.set('ImageObject', ImageObject)
registry.set('Recipe', Recipe)

// TODO Load external content components

export default registry
