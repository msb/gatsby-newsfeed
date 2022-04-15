import React from 'react'
import Layout from './Layout'
import Icon from './Icon'

import Link, { LinkProperties } from './PortholeLink'
import * as content from './content'

const links:{ [id: string] : React.FC<LinkProperties> } = {}

for (let component in content) {
    links[component] = Link
}

export type { LinkProperties }

export { links, Layout, Icon }
