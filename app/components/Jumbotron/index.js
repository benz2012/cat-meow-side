import React from 'react'

export default function Jumbotron({children}) {
  return (
    <div className="jumbotron">
      <h1>Cats Meow Side</h1>
      <p>How Bow Dat</p>
      <p>
        <a className="btn btn-primary btn-lg"
          target='_blank'
          href='https://github.com/benz2012/cat-meow-side'>
          <i className="fa fa-github" aria-hidden="true"></i>
          &nbsp;Improve this Game
        </a>
      </p>
    </div>
  )
}
