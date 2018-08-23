import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/actions';

class Navbar extends Component {
  static propTypes = {
    clearCurrentProfile: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  render() {
    const {
      auth: { isAuthenticated, user },
    } = this.props;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/feed">
            Post Feed
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link" onClick={this.onLogoutClick}>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </NavLink>
              </li>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = { logoutUser, clearCurrentProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
