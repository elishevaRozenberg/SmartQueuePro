const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "You are not logged in" });
  }
  next();
};

module.exports = checkAuth;
