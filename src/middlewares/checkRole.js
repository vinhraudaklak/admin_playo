export const checkRole = (role) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.roles) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!req.user.roles.includes(role)) {
        return res.status(403).json({ error: `Forbidden: ${role} only` });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};
