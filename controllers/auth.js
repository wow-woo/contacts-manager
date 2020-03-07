const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //get token within header
  const token = req.header("auth-token");

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const jwtDecoded = jwt.verify(token, config.get("jwtSeceret"));

    // req.user?
    req.user = jwtDecoded.user;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "token is not valid" });
  }
};
