import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../validations/isEmpty';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';

// Select options for status
const options = [
  { label: '* Select Professional Status', value: 0 },
  { label: 'Developer', value: 'Developer' },
  { label: 'Junior Developer', value: 'Junior Developer' },
  { label: 'Senior Developer', value: 'Senior Developer' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Student or Learning', value: 'Student or Learning' },
  { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
  { label: 'Intern', value: 'Intern' },
  { label: 'Other', value: 'Other' },
];
// social inputs list
const socialInputList = [
  { name: 'twitter', icon: 'fab fa-twitter', placeholder: 'Twitter Profile URL' },
  { name: 'facebook', icon: 'fab fa-facebook', placeholder: 'Facebook Profile URL' },
  { name: 'linkedin', icon: 'fab fa-linkedin', placeholder: 'Linkedin Profile URL' },
  { name: 'youtube', icon: 'fab fa-youtube', placeholder: 'Youtube Profile URL' },
  { name: 'instagram', icon: 'fab fa-instagram', placeholder: 'Instagram Profile URL' },
];

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = { createProfile, getCurrentProfile };

class EditProfile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
  };
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {},
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.error) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join();

      // Check for social object
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      // If profile field doesn't exist, make empty string
      this.setState({
        handle: profile.handle || '',
        company: profile.company || '',
        website: profile.website || '',
        location: profile.location || '',
        status: profile.status || '',
        skills: skillsCSV || '',
        bio: profile.bio || '',
        githubusername: profile.githubusername || '',
        twitter: profile.social.twitter || '',
        facebook: profile.social.facebook || '',
        linkedin: profile.social.linkedin || '',
        youtube: profile.social.youtube || '',
        instagram: profile.social.instagram || '',
      });
    }
  }
  onChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { displaySocialInputs, errors, ...data } = this.state;
    this.props.createProfile(data, this.props.history);
  };
  render() {
    const { displaySocialInputs, errors, ...data } = this.state;
    let socialInputs = null;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          {socialInputList.map(each => (
            <InputGroup
              key={each.name}
              icon={each.icon}
              placeholder={each.placeholder}
              name={each.name}
              value={data[each.name]}
              onChange={this.onChange}
              error={errors[each.name]}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={data.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  name="status"
                  value={data.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={data.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={data.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={data.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={data.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={data.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short bio"
                  name="bio"
                  value={data.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.setState(state => ({ displaySocialInputs: !state.displaySocialInputs }))}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
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
)(withRouter(EditProfile));
