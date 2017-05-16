import React from 'react'

export default function Jumbotron({children}) {
  return (
    <div className="jumbotron">
      <h1>Cat Meow Side</h1>
      <p>How Bow Dat</p>
      <p>
        <a className="btn btn-primary btn-lg"
          target='_blank'
          href='https://github.com/benz2012/cat-meow-side'>
          <i className="fa fa-github" aria-hidden="true"></i>
          &nbsp;Make it Better
        </a>
      </p>
    </div>
  )
}
