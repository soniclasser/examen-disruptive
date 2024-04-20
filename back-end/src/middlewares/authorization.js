const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).send(`Se requiere rol de ${role}`);
    }
  };
  
  module.exports = authorizeRole;