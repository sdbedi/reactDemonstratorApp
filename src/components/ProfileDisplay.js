import React, { Component } from 'react'
import axios from 'axios'

import './styles.css'

class ProfileDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = { formOpen: false, username: '', profile: ''}
  }


  render() {
    const { username, profile, imageUrl } = this.props
    return (
      <div className="profile">

        <img className="profilePicture" src={imageUrl || 'http://lorempixel.com/250/250/'} />
        <h1>{(this.state.username.length < 1 ? username : this.state.username)}</h1>
        <p>{(this.state.profile.length < 1 ? profile : this.state.profile)}</p>

        
      </div>
    )
  }
}

export default ProfileDisplay