"use strict";

export default {
  async up(queryInterface, Sequelize) {
    const [bookings] = await queryInterface.sequelize.query(`
      SELECT id, userId, venueId 
      FROM bookings 
      WHERE status = 'confirmed' 
      LIMIT 10;
    `);

    if (!bookings || bookings.length === 0) {
      throw new Error("⚠️ Không có booking nào có status = 'confirmed'.");
    }

    const comments = [
      "Sân đẹp, sạch sẽ, nhân viên thân thiện. Sẽ quay lại!",
      "Vị trí thuận lợi, giá cả hợp lý. Rất hài lòng.",
      "Chất lượng tốt nhưng giá hơi cao so với mặt bằng chung.",
      "Cơ sở vật chất hiện đại, đầy đủ tiện nghi.",
      "Sân thoáng mát, có chỗ đậu xe rộng rãi.",
      "Nhân viên hỗ trợ nhiệt tình, sân đúng như mô tả.",
      "Trải nghiệm tuyệt vời, chắc chắn sẽ giới thiệu bạn bè.",
      "Sân hơi cũ nhưng vẫn sử dụng tốt.",
      "Không gian thoải mái, phù hợp cho gia đình.",
      "Dịch vụ tốt, giá cả phải chăng. Recommend!",
    ];

    const reviews = bookings.map((b, i) => ({
      bookingId: b.id,
      userId: b.userId,
      venueId: b.venueId,
      rating: Math.floor(Math.random() * 2) + 4, // random 4–5 sao
      comment: comments[i % comments.length],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("reviews", reviews);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
