const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "yourSecretKey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
};
