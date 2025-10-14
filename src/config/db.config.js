export default {
	url: "mysql://avnadmin:AVNS_ntE4fOFCx-XuuLKDDbj@mysql-3bd87855-vinhpro0972-dd81.d.aivencloud.com:19531/defaultdb?ssl-mode=REQUIRED",
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT || "mysql",
	logging: false, // hoặc true nếu bạn muốn log query

	pool: {
		max: parseInt(process.env.DB_POOL_MAX, 10) || 5,
		min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
		acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
		idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
	},
};
