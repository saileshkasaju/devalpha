import React, { Component } from 'react';

class Login extends Component {
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
    const user = {
      email: data.email,
      password: data.password,
    };
    console.log(user);
  };
  render() {
    const { ...data } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
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
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={data.password || ''}
                    onChange={this.onChange}
                    autoComplete="current-password"
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

export default Login;
