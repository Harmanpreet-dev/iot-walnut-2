import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split("Bearer ")[1]
      : null;
  if (!token) {
    return res.status(401).json({ error: "Access denied: No token provided" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decodedToken;
    req.email = email;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const isSuperAdmin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split("Bearer ")[1]
      : null;
  if (!token) {
    return res.status(401).json({ error: "Access denied: No token provided" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { version, email } = decodedToken;
    if (version === 0) {
      return res
        .status(403)
        .json({ error: "Access denied: You don't have enough permissions" });
    }
    req.email = email;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
export { isAuthorized, isSuperAdmin };
