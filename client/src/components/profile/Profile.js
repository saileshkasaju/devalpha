import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Link from 'react-router-dom/Link';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
// import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
  };
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const {
      profile: { profile, loading },
    } = this.props;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <ProfileHeader />
          <ProfileAbout />
          <ProfileCreds />
          <ProfileGithub />
        </div>
      );
    }
    return profileContent;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = { getProfileByHandle };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
