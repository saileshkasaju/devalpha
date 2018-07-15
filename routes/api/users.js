const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

/**
 * @route GET api/users/test
 * @description Tests users route
 * @access Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

/**
 * @route POST api/users/register
 * @description Register user route
 * @access Public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const {
        body: { name, email, password },
      } = req;
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm', // Default
      });
      const newUser = new User({
        name: name,
        email: email,
        avatar,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @route POST api/users/login
 * @description Login user / Returning JWT Token
 * @access Public
 */
router.post('/login', (req, res) => {
  // Check validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {
    body: { email, password },
  } = req;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        // Create JWT payload
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          // email: user.email,
        };
        // Sign Token
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

/**
 * @route GET api/users/current
 * @description Return current user
 * @access Private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { _id, name, email } = req.user;
  res.json({ id: _id, name, email });
});

module.exports = router;
