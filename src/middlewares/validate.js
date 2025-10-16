import Joi from "joi";

/**
 * Middleware validate request body với Joi schema
 * @param {Joi.Schema} schema - schema Joi
 */
// Hàm trung gian kiểm tra hình dạng và quy tắc data validate gửi lên.
export const validate = (schema) => {
	return (req, res, next) => {
		// kiểm trả lỗi
		const { error } = schema.validate(req.body, { abortEarly: false }); // abortEarly: false => kiểm tra all field và trả về all error cùng lúc.
		// Có lỗi thì báo lỗi
		if (error) {
			return res.status(400).json({
				error: "Validation error",
				details: error.details.map((d) => d.message),
			});
		}
		// k có lỗi chuyển hàm tiếp theo.
		next();
	};
};
