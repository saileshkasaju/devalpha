const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/keys');

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
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'email already exists' });
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
  const {
    body: { email, password },
  } = req;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        // Create JWT payload
        const payload = {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        };
        // Sign Token
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        });
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
