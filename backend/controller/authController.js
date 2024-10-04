exports.googleCallback = (req, res) => {
    res.redirect(`http://localhost:3000/dashboard?user=${JSON.stringify(req.user)}`);
  };
  
  exports.getUser = (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  };