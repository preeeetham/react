exports.googleCallback = (req, res) => {
  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
  res.redirect(`${frontendURL}/dashboard?user=${JSON.stringify(req.user)}`);
};

exports.getUser = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};