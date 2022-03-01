const jwt = require('jsonwebtoken');
require('dotenv').config();

const jsonWebTokenControl = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Token okunamadı'
    });
  }
};

const encodeToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data;
};

module.exports = { jsonWebTokenControl, encodeToken };
