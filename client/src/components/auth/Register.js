import React, { Component } from 'react';

class Register extends Component {
  state = {
    errors: {},
  };
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
    console.log(newUser);
  };
  render() {
    const { ...data } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={data.name || ''}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={data.email || ''}
                    onChange={this.onChange}
                    autoComplete="username"
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={data.password || ''}
                    onChange={this.onChange}
                    autoComplete="new-password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={data.password2 || ''}
                    onChange={this.onChange}
                    autoComplete="new-password"
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
