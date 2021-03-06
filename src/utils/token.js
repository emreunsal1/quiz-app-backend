const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign(
    {
      ...data,
      exp: Math.floor(Date.now() / 1000) + 36000
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = { createToken };
