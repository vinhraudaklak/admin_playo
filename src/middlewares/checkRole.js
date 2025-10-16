// Kiểm tra hợp lý: có req.user chưa, có role hợp lệ chưa.

export const checkRole = (requiredRole) => {
	return (req, res, next) => {
		try {
			if (!req.user) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			if (req.user.role !== requiredRole) {
				return res
					.status(403)
					.json({ error: `Forbidden: ${requiredRole} only` });
			}

			next();
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	};
};
