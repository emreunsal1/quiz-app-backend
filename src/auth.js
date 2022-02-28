const jwt = require("jsonwebtoken");

const jsonWebTokenControl = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const encodedToken = jwt.verify(token, "secretkey");
    console.log(encodedToken);
    next();
  } catch (error) {
    res.status(401).send({
      message: "yetkisiz erişme lan",
    });
  }
};

module.exports = { jsonWebTokenControl };
