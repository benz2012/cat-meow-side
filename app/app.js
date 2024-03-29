// Third Party Imports
import React from 'react'
import { render } from 'react-dom'
import 'pixi'
import 'p2'
import Phaser from 'phaser'

// Import root app
import App from './containers/App'

// Render the app into the DOM
render(<App />, document.getElementById('app'))
