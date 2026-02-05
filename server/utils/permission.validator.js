import { PERMISSION } from "../validators/constants.js";
import UserModel from "../model/user.js";

const authorization = (role, permission) => {
  return async (req, res, next) => {
    try {
      const email = req.user; // set by authenticate middleware

      if (!role || !permission) {
        return res.status(403).json({ error: true, message: "Access denied" });
      }

      // Find user
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ error: true, message: "Unauthorized user" });
      }

      // Role validation
      if (user.role !== role) {
        return res
          .status(403)
          .json({ error: true, message: "Insufficient role" });
      }

      // Permission validation
      const allowedPermissions = PERMISSION[role];

      if (!allowedPermissions.includes(permission)) {
        return res
          .status(403)
          .json({ error: true, message: "Permission denied" });
      }

      next();
    } catch (error) {
      console.error("Authorization Error:", error);
      res.status(500).json({ error: true, message: "Server error" });
    }
  };
};

export default authorization;
