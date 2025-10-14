export default {
  up: async (queryInterface, Sequelize) => {
    const slots = await queryInterface.sequelize.query(
      `SELECT id FROM venue_slots LIMIT 10;`
    );
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'user' LIMIT 7;`
    );
    
    const slotList = slots[0];
    const userList = users[0];
    
    const slotUsers = [];
    
    slotList.forEach((slot, slotIndex) => {
      // Mỗi slot có 2-4 users
      const numUsers = Math.floor(Math.random() * 3) + 2;
      
      for (let i = 0; i < numUsers && i < userList.length; i++) {
        const userIndex = (slotIndex + i) % userList.length;
        slotUsers.push({
          slotId: slot.id,
          userId: userList[userIndex].id,
          role: i === 0 ? 'member' : (Math.random() > 0.5 ? 'default' : 'guest'),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    return queryInterface.bulkInsert('slot_users', slotUsers.slice(0, 30));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('slot_users', null, {});
  }
};