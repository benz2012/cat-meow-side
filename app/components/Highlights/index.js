import React from 'react'
// import timeAgo from 'time-ago'
const timeAgo = require('time-ago')()

export default class Highlights extends React.Component {
  mapInputData() {
    const { highlights } = this.props
    if (!highlights) { return null }
    return highlights.map(h => {
      return (
        <a key={h.id} href={h.html_url}
          className='list-group-item' target='_blank'>
          <h4 className='list-group-item-heading'>{h.title}</h4>
          <div className='list-group-item-text'>
            <div>Added {timeAgo.ago(h.closed_at)}</div>
          </div>
        </a>
      )
    })
  }
  render() {
    return (
      <div>
        <div className='list-group'>
          <a className='list-group-item active'>
            What's New?
          </a>
          {this.mapInputData()}
        </div>
      </div>
    )
  }
}
