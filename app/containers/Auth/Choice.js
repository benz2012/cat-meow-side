import React from 'react'

import Highlights from 'components/Highlights'

export default class Choice extends React.Component {
  render() {
    return (
      <div className='row'>

        <div className='col-md-4 col-md-push-7 col-sm-6 col-sm-push-6'>
          <div style={{margin: '60px 0px'}}>
            <button
              id='choice-login'
              className='btn btn-primary btn-block'
              onClick={this.props.makeChoice.bind(this)}>
              Login
            </button>
            <button
              id='choice-signup'
              className='btn btn-default btn-block'
              onClick={this.props.makeChoice.bind(this)}>
              Create Account
            </button>
          </div>
        </div>

        <div className='col-md-4 col-md-pull-3 col-sm-6 col-sm-pull-6'>
          <div style={{marginTop: '60px'}}>
            <Highlights highlights={this.props.highlights} />
          </div>
        </div>

      </div>
    )
  }
}
