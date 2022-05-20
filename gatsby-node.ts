exports.onCreateWebpackConfig = ({
  stage,
  loaders,
  actions,
}) => {
  if (['develop-html', 'build-html'].includes(stage)) {
    // suppress the use of `react-pdf` during the build
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-pdf/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
