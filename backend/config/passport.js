const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/User');

const setupPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          console.log(accessToken);
          console.log(refreshToken);
          console.log(profile);
          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0].value,
              username: profile.emails?.[0].value.split('@')[0] // Use email prefix as username
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error, undefined);
        }
      }
    )
  );
};

module.exports = setupPassport;