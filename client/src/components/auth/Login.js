import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  state = {
    errors: {},
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });
  onSubmit = e => {
    e.preventDefault();
    const { errors, ...data } = this.state;
    this.props.loginUser(data);
  };
  render() {
    const { errors, ...data } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email Address"
                  error={errors.email}
                  onChange={this.onChange}
                  autoComplete="username"
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                  error={errors.password}
                  onChange={this.onChange}
                  autoComplete="current-password"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = { loginUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
