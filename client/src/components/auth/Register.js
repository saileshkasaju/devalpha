import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../commons/TextFieldGroup';

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      user: PropTypes.object.isRequired,
    }).isRequired,
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
    const { ...data } = this.state;
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      password2: data.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { ...data } = this.state;
    const { errors } = data;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  value={data.name}
                  placeholder="Name"
                  error={errors.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email Address"
                  error={errors.email}
                  onChange={this.onChange}
                  autoComplete="username"
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                  error={errors.password}
                  onChange={this.onChange}
                  autoComplete="new-password"
                />
                <TextFieldGroup
                  type="password"
                  name="password2"
                  value={data.password2}
                  placeholder="Confirm Password"
                  error={errors.password2}
                  onChange={this.onChange}
                  autoComplete="new-password"
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

const mapDispatchToProps = { registerUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Register));
