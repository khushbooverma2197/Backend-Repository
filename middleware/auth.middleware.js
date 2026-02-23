// Simple authentication middleware
module.exports = (req, res, next) => {
  // Example: check for an auth token in headers
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // TODO: Validate token (add real logic)
  next();
};
