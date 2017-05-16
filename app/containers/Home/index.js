import React from 'react'

import Game from 'containers/Game'
import Jumbotron from 'components/Jumbotron'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron />
        <Game />
      </div>
    )
  }
}
