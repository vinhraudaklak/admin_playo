export default {
	secret: process.env.JWT_SECRET || "my_secret_key",
	refreshSecret: process.env.JWT_REFRESH_SECRET || "my_refresh_secret",
	expiresIn: process.env.JWT_EXPIRES_IN || "7d",
	refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
};
