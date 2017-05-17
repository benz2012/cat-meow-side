const path = require('path')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

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
            presets: ['env', 'es2015', 'react', 'stage-2']
          }
        }
      },
      {
        test: /pixi\.js/,
        use: {
          loader: 'expose-loader',
          options: 'PIXI'
        }
      },
      {
        test: /phaser-split\.js/,
        use: {
          loader: 'expose-loader',
          options: 'Phaser'
        }
      },
      {
        test: /p2\.js/,
        use: {
          loader: 'expose-loader',
          options: 'p2'
        }
      }
    ]
  },
  resolve: {
    modules: ['app', 'node_modules'],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}
