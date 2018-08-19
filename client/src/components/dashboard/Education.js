import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import isEmpty from '../../validations/isEmpty';
import { deleteEducation } from '../../actions/profileActions';

const mapStateToProps = null;

const mapDispatchToProps = { deleteEducation };

class Education extends Component {
  static propTypes = {
    deleteEducation: PropTypes.func.isRequired,
    education: PropTypes.array,
  };
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const { education } = this.props;
    if (isEmpty(education)) return null;
    const allEducations = education.map(exp => (
      <tr key={`exp-${exp._id}`}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
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
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{allEducations}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Education);
