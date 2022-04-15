import React from "react"
import PropTypes from "prop-types"

// TODO tie back to theme
const customBodyStyle = {
  "backgroundColor": "palegoldenrod",
  "margin": 0,
  "padding": 0,
  "fontFamily": "Roboto Mono"
}

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Linked to custom fonts */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link href='https://fonts.googleapis.com/css?family=Roboto Mono' rel='stylesheet'/>
        {props.headComponents}
      </head>
      {/* Customised body style */}
      <body {...props.bodyAttributes} style={customBodyStyle}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
