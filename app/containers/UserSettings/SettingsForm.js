import React from 'react'

import { GAME } from 'config'

export default class SettingsForm extends React.Component {
  checkKey(e) {
    if (e.keyCode == 13) {
      this.props.submit()
    }
  }
  colorOptions() {
    let options = []
    Object.keys(GAME.CAT.COLOR).forEach((key) => {
      options.push(
        <option key={key} value={GAME.CAT.COLOR[key]}>{key}</option>
      )
    })
    return options
  }
  typeOptions() {
    let options = []
    Object.keys(GAME.CAT.TYPE).forEach((key) => {
      options.push(
        <option key={key} value={GAME.CAT.TYPE[key]}>{key}</option>
      )
    })
    return options
  }
  render() {
    const { name, color, type } = this.props
    return (
      <div>

        <div className='form-group'>
          <label className='control-label' htmlFor='display-name'>Display Name</label>
          <input type='text' className='form-control' id='display-name'
            placeholder='display name' value={name} onChange={this.props.updateValue.bind(this)}
            onKeyUp={this.checkKey.bind(this)}
          />
        </div>

        <div className='form-group'>
          <label className='control-label' htmlFor='cat-color'>Cat Color</label>
          <select className='form-control' id='cat-color' value={color}
            onChange={this.props.updateValue.bind(this)}>
            {this.colorOptions()}
          </select>
        </div>

        <div className='form-group'>
          <label className='control-label' htmlFor='attack-type'>Attack Style</label>
          <select className='form-control' id='attack-type' value={type}
            onChange={this.props.updateValue.bind(this)}>
            {this.typeOptions()}
          </select>
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.props.submit.bind(this)}>
            Submit
          </button>
          <button
            type="reset"
            className="btn btn-default"
            onClick={this.props.cancel.bind(this)}>
            Cancel
          </button>
        </div>

      </div>
    )
  }
}
