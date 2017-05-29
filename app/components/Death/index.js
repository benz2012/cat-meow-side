import React from 'react'

export default class Death extends React.Component {
  render() {
    return(
      <div className='modal'
        style={{display: 'block', top: '50%', transform: 'translateY(-50%)'}}>
        <div className='modal-dialog' style={{width: '200px'}}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'
                style={{textAlign: 'center'}}>
                You Died!
              </h4>
            </div>
            <div className='modal-footer'>
              <button type='button'
                className='btn btn-primary btn-block'
                onClick={this.props.resetGame}>
                <i className='fa fa-refresh' aria-hidden='true'></i>
                &nbsp;&nbsp;
                Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
