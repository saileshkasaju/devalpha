import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileCreds = props => {
  const { education, experience } = props;

  // Experience list
  const expItems = experience.map(exp => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="MMM, YYYY">{exp.from}</Moment> -{' '}
        {exp.current ? 'Current' : <Moment format="MMM, YYYY">{exp.to}</Moment>}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      {exp.location && (
        <p>
          <strong>Location:</strong> {exp.location}
        </p>
      )}
      {exp.description && (
        <p>
          <strong>Description:</strong> {exp.description}
        </p>
      )}
    </li>
  ));

  // Education list
  const eduItems = education.map(edu => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.school}</h4>
      <p>
        <Moment format="MMM, YYYY">{edu.from}</Moment> -{' '}
        {edu.current ? 'Current' : <Moment format="MMM, YYYY">{edu.to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {edu.fieldofstudy}
      </p>
      {edu.description && (
        <p>
          <strong>Description:</strong> {edu.description}
        </p>
      )}
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        {expItems.length > 0 ? (
          <ul className="list-group">{expItems}</ul>
        ) : (
          <p className="text-center">No Experience Listed</p>
        )}
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        {eduItems.length > 0 ? <ul className="list-group">{eduItems}</ul> : <p className="text-center">No Education</p>}
      </div>
    </div>
  );
};

ProfileCreds.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
};

export default ProfileCreds;
