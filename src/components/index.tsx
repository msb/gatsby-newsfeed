import React from 'react'
import Layout from './Layout'
import Icon from './Icon'

import PortholeLink, { LinkProperties } from './PortholeLink'
import * as content from './content'

// This a map page links keyed on content components.
const pageLinks:{ [id: string] : React.FC<LinkProperties> } = {}

// For now we only have one page link.
for (let component in content) {
    pageLinks[component] = PortholeLink
}

export type { LinkProperties }

export { pageLinks, Layout, Icon }
