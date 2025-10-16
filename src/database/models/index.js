import { Sequelize } from "sequelize";
import AppConfig from "../../config/index.js";

// Import models
import userModel from "./user.js";
import sportModel from "./sport.js";
import venueModel from "./venue.js";
import bookingModel from "./booking.js";
import paymentModel from "./payment.js";
import reviewModel from "./review.js";
import venueSlotModel from "./venueSlot.js";
import slotUserModel from "./slotUser.js";
import cartModel from "./cart.js";
import refreshTokenModel from "./refreshToken.js";

// Khởi tạo Sequelize instance
const sequelize = new Sequelize(AppConfig.database.url, {
	dialect: AppConfig.database.dialect,
	pool: AppConfig.database.pool,
	logging: false,
});

// Đăng ký models
const db = {
	sequelize,
	Sequelize,
	User: userModel(sequelize),
	Sport: sportModel(sequelize),
	Venue: venueModel(sequelize),
	Booking: bookingModel(sequelize),
	Payment: paymentModel(sequelize),
	Review: reviewModel(sequelize),
	VenueSlot: venueSlotModel(sequelize),
	SlotUser: slotUserModel(sequelize),
	Cart: cartModel(sequelize),
	RefreshToken: refreshTokenModel(sequelize),
};

// Setup associations
Object.values(db).forEach((model) => {
	if (model?.associate) model.associate(db);
});

export default db;
