export default {
	up: async (queryInterface, Sequelize) => {
		const today = new Date();
		const carts = [];

		const items = [
			{ name: "Sân bóng đá Phú Mỹ Hưng", price: 500000 },
			{ name: "Sân cầu lông Thành Công", price: 80000 },
			{ name: "Sân tennis Thủ Đức", price: 150000 },
			{ name: "Sân bóng rổ Downtown", price: 200000 },
			{ name: "Sân bóng chuyền Thanh Niên", price: 120000 },
			{ name: "Bể bơi Aqua Center", price: 100000 },
			{ name: "Gym & Fitness Pro", price: 50000 },
			{ name: "Yoga Zen Studio", price: 150000 },
			{ name: "CLB Bóng bàn Việt Nam", price: 60000 },
			{ name: "Pickleball Arena", price: 100000 },
		];

		for (let i = 0; i < 10; i++) {
			const item = items[i];
			const bookingDate = new Date(today);
			bookingDate.setDate(today.getDate() + (i % 3));

			const basePrice = item.price;
			const discountAmount = i % 3 === 0 ? basePrice * 0.1 : 0;
			const totalAmount = basePrice - discountAmount;

			carts.push({
				itemName: item.name,
				bookingDate: bookingDate.toISOString().split("T")[0],
				startTime: `${8 + (i % 12)}:00:00`,
				basePrice: basePrice,
				currency: "VND",
				discountAmount: discountAmount,
				totalAmount: totalAmount,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		return queryInterface.bulkInsert("carts", carts);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("carts", null, {});
	},
};
