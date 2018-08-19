import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import isEmpty from '../../validations/isEmpty';
import { deleteExperience } from '../../actions/profileActions';

const mapStateToProps = null;

const mapDispatchToProps = { deleteExperience };

class Experience extends Component {
  static propTypes = {
    deleteExperience: PropTypes.func.isRequired,
    experience: PropTypes.array,
  };
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const { experience } = this.props;
    if (isEmpty(experience)) return null;
    const allExperiences = experience.map(exp => (
      <tr key={`exp-${exp._id}`}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="MM-DD-YYYY">{exp.from}</Moment> -{' '}
          {exp.current ? 'Now' : <Moment format="MM-DD-YYYY">{exp.to}</Moment>}
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => this.onDeleteClick(exp._id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{allExperiences}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Experience);
