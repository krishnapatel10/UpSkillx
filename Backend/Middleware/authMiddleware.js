import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = decoded; // JWT payload { id, email, role }
    next();
  });
};

export default authMiddleware;

// ✅ Admin check
// export const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied. Admin only!" });
//   }
//   next();
// };
