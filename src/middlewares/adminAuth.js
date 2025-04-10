const authenticate = require('./auth');
const authenticateAdmin = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: "Acesso negado" });
    }
    next();
  });
};
module.exports = authenticateAdmin;

  