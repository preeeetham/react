import passport from 'passport';
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userModel.findOne({ githubId: profile.id });
      if (user) {
        return done(null, user);
      }
      user = new userModel({
        name: profile.displayName,
        email: profile.emails[0].value,
        githubId: profile.id
      });
      await user.save();
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

const githubAuthCallback = (req, res, next) => {
  passport.authenticate('github', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');
    const token = createToken(user._id);
    res.redirect(`/dashboard?token=${token}`);
  })(req, res, next);
};

export {
    githubAuth,
    githubAuthCallback
}