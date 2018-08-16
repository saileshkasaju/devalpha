import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../commons/Spinner';

class Dashboard extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const {
      auth: { user },
      profile: { profile, loading },
    } = this.props;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = { getCurrentProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
