import React from 'react'

import Center from 'components/Center'
import SettingsForm from './SettingsForm'
import { GAME } from 'config'
// console.log(GAME)

export default class UserSettings extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      color: '0',
      type: '0',
    }
  }
  updateValue(e) {
    switch (e.target.id) {
      case 'display-name':
        this.setState({name: e.target.value})
        break
      case 'cat-color':
        this.setState({color: e.target.options[e.target.selectedIndex].value})
        break
      case 'attack-type':
        this.setState({type: e.target.options[e.target.selectedIndex].value})
        break
    }
  }
  submit() {
    const { firebase, uid } = this.props
    const { name, color, type } = this.state
    firebase.database().ref('cats/' + uid).set({
      name: name,
      color: color,
      type: type,
      hp_full: GAME.CAT.HP[this.getKeyByValue(GAME.CAT.TYPE, parseInt(type))],
    })
  }
  cancel() {
    location.reload(true)
  }
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  render() {
    return (
      // <Center>
        <div className='row'>

          <div className='col-md-4 col-md-offset-2 col-sm-6'>
            <div className='panel panel-info'>
              <div className='panel-heading'>
                <h3 className='panel-title'>💧&nbsp;&nbsp;Worrier Cat</h3>
              </div>
              <div className='panel-body'>
                <p>Attack Type: Ranged</p>
                <p>Spends most of it's time worrying and shedding tears. Using these tears it has the ability to unlock unique spells and potions. Conviently, you can throw tears at other cats and hurt them.</p>
              </div>
            </div>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                <h3 className='panel-title'>⚔️&nbsp;&nbsp;&nbsp;Warrior Cat</h3>
              </div>
              <div className='panel-body'>
                <p>Attack Type: Melee</p>
                <p>Rough and tough, this cat has spent many nights on the streets of NYC. Spends most of it's time in crossfit, giving it increased agility and health. These skills come in handy when chasing down other cats.</p>
              </div>
            </div>
          </div>

          <div className='col-md-4 col-sm-6'>
            <h1>User Settings</h1>
            <h4 className='text-warning'>Please set the following settings before playing the game.</h4>
            <SettingsForm
              updateValue={this.updateValue.bind(this)}
              submit={this.submit.bind(this)}
              cancel={this.cancel.bind(this)}
              {...this.state}
            />
          </div>

        </div>
      // </Center>
    )
  }
}
