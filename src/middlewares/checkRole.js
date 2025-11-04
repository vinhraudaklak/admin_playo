// Kiểm tra hợp lý: có req.user chưa, có role hợp lệ chưa.

export const checkRole = (...allowedRoles) => {
	return (req, res, next) => {
		try {
			if (!req.user) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			if (!allowedRoles.includes(req.user.role)) {
				return res
					.status(403)
					.json({ error: `Forbidden: ${allowedRoles.join(", ")} only` });
			}

			next();
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	};
};
