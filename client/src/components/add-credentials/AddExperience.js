import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addExperience } from '../../actions/profileActions';

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = { addExperience };

class AddExperience extends Component {
  static propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  state = {
    errors: {},
    disabled: false,
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onCheck = e =>
    this.setState(state => ({
      current: !state.current,
      disabled: !state.disabled,
    }));
  handleSubmit = e => {
    e.preventDefault();
    const { ...expData } = this.state;
    delete expData['disabled'];
    delete expData['errors'];

    this.props.addExperience(expData, this.props.history);
  };
  render() {
    const { errors, ...data } = this.state;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  onChange={this.onChange}
                  value={data.title}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  onChange={this.onChange}
                  value={data.company}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  onChange={this.onChange}
                  value={data.location}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  onChange={this.onChange}
                  value={data.from}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  onChange={this.onChange}
                  value={data.to}
                  disabled={data.disabled ? 'disabled' : ''}
                  error={errors.to}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={data.current || false}
                    checked={data.current || false}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={data.description}
                  info="Some of your responsabilities, etc"
                  onChange={this.onChange}
                  error={errors.description}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddExperience));
