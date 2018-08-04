const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

/**
 * @route GET api/profile/test
 * @description Tests profile route
 * @access Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

/**
 * @route GET api/profile
 * @description Get current users Profile
 * @access Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route GET api/profile/all
 * @description Get all profiles
 * @access Public
 */
router.get('/all', (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      const errors = {};
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({
        noprofile: 'There are no profiles',
      }),
    );
});

/**
 * @route GET api/profile/handle/:handle
 * @description Get profile by handle
 * @access Public
 */
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route GET api/profile/user/:user_id
 * @description Get profile by user ID
 * @access Public
 */
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({ noprofile: 'There is no profile for this user' }));
});

/**
 * @route POST api/profile
 * @description Create or edit user profile
 * @access Private
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  const {
    user: { id },
    body: {
      handle,
      company,
      website,
      location,
      status,
      bio,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    },
  } = req;
  // Get fields
  const profileFields = { user: id };
  if (handle) profileFields.handle = handle;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  // Skills - Split into array
  if (typeof skills !== 'undefined') profileFields.skills = skills.split(',');

  // Social
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  Profile.findOne({ user: id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate({ user: id }, { $set: profileFields }, { new: true }).then(profile => res.json(profile));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
});

/**
 * @route POST api/profile/experience
 * @description Add experience to profile
 * @access Private
 */
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  const {
    user: { id },
    body: { title, company, location, from, to, current, description },
  } = req;
  // Get fields
  Profile.findOne({ user: id }).then(profile => {
    const newExp = { title, company, location, from, to, current, description };

    // Add to exp array
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  });
});

/**
 * @route POST api/profile/education
 * @description Add education to profile
 * @access Private
 */
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  const {
    user: { id },
    body: { school, degree, fieldofstudy, from, to, current, description },
  } = req;
  // Get fields
  Profile.findOne({ user: id }).then(profile => {
    const newEdu = { school, degree, fieldofstudy, from, to, current, description };

    // Add to exp array
    profile.education.unshift(newEdu);

    profile.save().then(profile => res.json(profile));
  });
});

module.exports = router;
