export default {
  up: async (queryInterface, Sequelize) => {
    const venues = await queryInterface.sequelize.query(
      `SELECT id, sportId FROM venues LIMIT 10;`
    );
    const venueList = venues[0];
    
    const slots = [];
    const today = new Date();
    
    venueList.forEach((venue, index) => {
      // Tạo 10 slots cho mỗi venue trong 5 ngày tới
      for (let day = 0; day < 5; day++) {
        const slotDate = new Date(today);
        slotDate.setDate(today.getDate() + day);
        
        // Sáng: 6-8h, 8-10h
        slots.push({
          venueId: venue.id,
          sportId: venue.sportId,
          level: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
          listUsers: JSON.stringify([]),
          date: slotDate.toISOString().split('T')[0],
          startTime: '06:00:00',
          endTime: '08:00:00',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        slots.push({
          venueId: venue.id,
          sportId: venue.sportId,
          level: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
          listUsers: JSON.stringify([]),
          date: slotDate.toISOString().split('T')[0],
          startTime: '08:00:00',
          endTime: '10:00:00',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    return queryInterface.bulkInsert('venue_slots', slots.slice(0, 100)); // Limit 100 slots
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('venue_slots', null, {});
  }
};