import dotenv from "dotenv";
dotenv.config();
import database from "./db.config.js";
import jwt from "./jwt.config.js";

export default {
	database,
	port: process.env.PORT,
	jwt,
	// logging: process.env.LOGGING === "true",
	apiVersion: process.env.API_VERSION || "v1",
	environment: process.env.NODE_ENV || "development",
};
