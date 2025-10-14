import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import AppConfig from "./config/index.js";
import routes from "./routes/index.js";
import db from "./database/models/index.js";

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", routes);

// Test & sync database
(async () => {
	try {
		await db.sequelize.authenticate();
		console.log("✅ Database connected successfully.");

		// (Optional) sync tables in dev mode
		// await db.sequelize.sync({ alter: true });
	} catch (error) {
		console.error("❌ Database connection failed:", error);
		process.exit(1); // Dừng server nếu kết nối DB lỗi
	}
})();

// Start server
const PORT = AppConfig.port || 5000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
