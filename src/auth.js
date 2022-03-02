const jwt = require('jsonwebtoken');
require('dotenv').config();

const jsonWebTokenControl = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const encodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.token = encodeToken;
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Token okunamadı'
    });
  }
};

module.exports = { jsonWebTokenControl };
