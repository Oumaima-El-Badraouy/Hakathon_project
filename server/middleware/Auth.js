const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // يفصل "Bearer" على التوكن

  if (!token) return res.status(401).json({ msg: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded.user; // تأكد أن `decoded.user` فعلاً كيتدار فـ token
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
const authAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};

module.exports = { userAuth, authAdmin };
