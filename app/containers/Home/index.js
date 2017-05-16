import React from 'react'

import GameContainer from 'containers/Game'
import Jumbotron from 'components/Jumbotron'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron />
        <GameContainer />
      </div>
    )
  }
}
