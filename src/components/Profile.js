import React, { Component } from 'react'
import axios from 'axios'

import './styles.css'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { formOpen: false, username: '', profile: ''}
    this.RenderProfileForm = this.RenderProfileForm.bind(this)
    this.UsernameChange = this.UsernameChange.bind(this)
    this.ProfileChange = this.ProfileChange.bind(this)
    this.ProfileSubmit = this.ProfileSubmit.bind(this)
  }

  RenderProfileForm() {
    this.setState({ formOpen: !this.state.formOpen })
  }

  UsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  ProfileChange(e) {
    this.setState({ profile: e.target.value })
  }
  
  ProfileSubmit(e) {
    e.preventDefault()
    const newAccount = {username: this.state.username, profile: this.state.profile, email: this.props.email}
    console.log(newAccount);
    axios.post('http://localhost:4040/account', newAccount).then(this.setState({ formOpen: !this.state.formOpen }));
  }

  render() {
    const { username, profile, imageUrl } = this.props
    return (
      <div className="profile">

        <img className="profilePicture" src={imageUrl || 'http://lorempixel.com/250/250'} />
        <h1>{(this.state.username.length < 1 ? username : this.state.username)}</h1>
        <p>{(this.state.profile.length < 1 ? profile : this.state.profile)}</p>

        <form className={this.state.formOpen ? 'shown' : 'notShown'} onSubmit={this.ProfileSubmit.bind(this)} >
          <input type="text" placeholder="Username" value={this.state.username} onChange={this.UsernameChange} />
          <input type="text" placeholder="Profile" value={this.state.profile} onChange={this.ProfileChange} />
          <input type="submit" value="Submit"/>
        </form>
        <button className={this.state.formOpen ? 'notShown' : 'shown'} onClick={this.RenderProfileForm}>Change Profile</button>

        { this.props.showOtherProfiles ? <button onClick={this.props.showProfile}>Click to View My Profile</button> : <button onClick={this.props.showProfile}>Click to View All Profiles</button> }

      </div>
    )
  }
}

export default Profile
