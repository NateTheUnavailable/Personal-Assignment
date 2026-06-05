const express = require('express');
const passport = require('passport');

const generateToken =
  require('../utils/generateToken');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  (req, res) => {
    const token = generateToken(req.user);

    res.json({
      success: true,
      token,
      user: req.user,
    });
  }
);

module.exports = router;