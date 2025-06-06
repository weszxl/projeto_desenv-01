const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  // verificação do token em diferentes locais
  let token = req.headers.authorization || req.query.token || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: 'acesso negado' });
  }
  
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'token inválido' });
  }
  
  req.user = decoded;
  next();
};