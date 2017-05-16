const path = require('path')

module.exports = {
  entry: [
    './app/app.js'
  ],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react']
          }
        }
      }
    ]
  },
  resolve: {
    modules: ['app', 'node_modules'],
  }
}
