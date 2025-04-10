const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // pegar o token do header (Bearer <token>)
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: "Erro ao receber Token" });
  }

  try {
    // verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // dados do usuário na requisição
    next();
  } catch (error) {
    res.status(401).json({ error: "deu ruim no token ou tá expirado" });
  }
};

module.exports = authenticate;