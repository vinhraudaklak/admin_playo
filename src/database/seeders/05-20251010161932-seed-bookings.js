export default {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'user' LIMIT 7;`
    );
    const venues = await queryInterface.sequelize.query(
      `SELECT id, sportId, pricePerHour FROM venues LIMIT 10;`
    );
    const slots = await queryInterface.sequelize.query(
      `SELECT id FROM venue_slots LIMIT 10;`
    );
    
    const userList = users[0];
    const venueList = venues[0];
    const slotList = slots[0];
    
    const bookings = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const user = userList[i % userList.length];
      const venue = venueList[i];
      const slot = slotList[i];
      
      const bookingDate = new Date(today);
      bookingDate.setDate(today.getDate() + (i % 5));
      
      const hours = 2;
      const ticketPrice = parseFloat(venue.pricePerHour);
      const totalPrice = ticketPrice * hours;
      
      bookings.push({
        venueId: venue.id,
        userId: user.id,
        slotId: slot.id,
        sportId: venue.sportId,
        bookingDate: bookingDate.toISOString().split('T')[0],
        startTime: '08:00:00',
        endTime: '10:00:00',
        status: ['pending', 'confirmed', 'cancelled'][i % 3],
        hourly: true,
        ticketPrice: ticketPrice,
        totalPrice: totalPrice,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    return queryInterface.bulkInsert('bookings', bookings);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  }
};
	