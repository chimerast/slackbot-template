const { FuseBox, JSONPlugin } = require('fuse-box')
const { YAMLPlugin } = require('fuse-box-yaml')
const { src, task, context } = require('fuse-box/sparky')

context(class {
  getConfig (isProduction) {
    return FuseBox.init({
      homeDir: 'src',
      target: 'server@esnext',
      output: 'dist/$name.js',
      sourceMaps: !isProduction,
      useTypescriptCompiler: true,
      allowSyntheticDefaultImports: true,
      plugins: [
        JSONPlugin(),
        YAMLPlugin()
      ]
    })
  }
})

task('serve', ['clean'], async context => {
  const server = context.getConfig()
  server.bundle('server')
    .completed(proc => proc.start())
    .instructions('> [index.ts]').watch()
  await server.run()
})

task('build', ['clean'], async context => {
  const server = context.getConfig(true)
  server.bundle('server')
    .instructions('> [index.ts]')
  await server.run()
})

task('clean', async context => {
  await src('dist/').clean('dist/').exec()
})
