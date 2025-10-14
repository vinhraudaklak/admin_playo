export const checkRoles = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.roles) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const hasRole = req.user.roles.some((r) => roles.includes(r));
      if (!hasRole) {
        return res
          .status(403)
          .json({ error: `Forbidden: requires one of [${roles.join(", ")}]` });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};
