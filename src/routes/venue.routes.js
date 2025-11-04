import express from "express";
import {
	getAllVenues,
	getVenueById,
	createVenue,
	updateVenue,
	deleteVenue,
} from "../controllers/venue.controller.js";

// Nếu có validate thì import vào:
// import { validate } from "../middlewares/validate.js";
// import { createVenueSchema, updateVenueSchema } from "../validators/venue.validator.js";

const router = express.Router();

// 🟢 Lấy danh sách tất cả venues
router.get("/", getAllVenues);

// 🟢 Lấy chi tiết venue theo id
router.get("/:id", getVenueById);

// 🟢 Tạo mới venue
// router.post("/", validate(createVenueSchema), createVenue);
router.post("/", createVenue);

// 🟢 Cập nhật venue
// router.put("/:id", validate(updateVenueSchema), updateVenue);
router.put("/:id", updateVenue);

// 🟢 Xóa venue
router.delete("/:id", deleteVenue);

export default router;
