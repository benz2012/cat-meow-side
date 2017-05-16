import React from 'react'

import Jumbotron from 'components/Jumbotron'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Cat Meow Side</h1>
          <p>How Bow Dat</p>
          <p><a className="btn btn-primary btn-lg" target='_blank' href='https://github.com/benz2012/cat-meow-side'>Make it Better </a></p>
        </Jumbotron>
      </div>
    )
  }
}
