import React, { Component } from 'react'
import Profile from './Profile'
import ProfileDisplay from './ProfileDisplay'
import axios from 'axios'

class ProfileBoard extends Component {
  constructor(props) {
    super(props)
    this.showOtherProfiles = this.showOtherProfiles.bind(this)
    this.state = { profiles: [], showOtherProfiles: false, email: '', profile: '', username: '', imageUrl: ''}
  }

  // updates state with current users profile data
  componentDidMount() {
    const { currentProfile } = this.props;
    this.setState({ profiles: currentProfile[0].profiles, email: currentProfile[0].email, username: currentProfile[0].username, profile: currentProfile[0].profile, imageUrl: currentProfile[0].imageUrl })
  }
  // updates state to show all the profiles
  showOtherProfiles() {
    this.setState({showOtherProfiles: !this.state.showOtherProfiles})
  }

  render() {
    if (this.state.showOtherProfiles) {
      return <div>
      <button onClick={this.showOtherProfiles}>Back to my profile.</button>
      <div>{ this.props.profiles.map(p => <ProfileDisplay showProfile={this.showOtherProfiles} email={p.email} username={p.username} profile={p.profile} imageUrl={p.imageUrl}/>) }</div>
      </div>
    }
    return (
      <Profile SignupLogin={this.SignupLogin} showProfile={this.showOtherProfiles} email={this.state.email} username={this.state.username} profile={this.state.profile} imageUrl={this.state.imageUrl}/>
    )
  }
}

export default ProfileBoard
