import buble from 'rollup-plugin-buble'

export default {
  entry: 'lib/index.js',
  dest: 'dist/tempest-fold.js',
  format: 'umd',
  moduleName: 'tempestFold',
  sourceMap: true,
  globals: {
    '@tempest/core': 'tempestCore'
  },
  plugins: [
    buble()
  ]
}