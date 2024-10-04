const express = require('express');
const passport = require('passport');
const { googleCallback, getUser } = require('../controller/authController.js');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);

router.get('/user', getUser);

module.exports = router;