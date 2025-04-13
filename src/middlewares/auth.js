const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: "Erro ao receber Token" });
  }

  try {
    // verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ error: "Problema com o token ou expirou" });
  }
};

module.exports = authenticate;