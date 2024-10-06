import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userModel.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }
      user = new userModel({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id
      });
      await user.save();
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');
    const token = createToken(user._id);
    res.redirect(`/dashboard?token=${token}`);
  })(req, res, next);
};

export {
    googleAuth,
    googleAuthCallback
}