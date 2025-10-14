export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sports', [
      {
        name: 'Bóng đá',
        description: 'Môn thể thao vua với 11 cầu thủ mỗi đội',
        imgUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/53/53283.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cầu lông',
        description: 'Môn thể thao vợt phổ biến ở Châu Á',
        imgUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2907/2907164.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tennis',
        description: 'Môn thể thao quý tộc với vợt và bóng',
        imgUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/857/857402.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bóng rổ',
        description: 'Môn thể thao đồng đội với rổ và bóng',
        imgUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/889/889453.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bóng chuyền',
        description: 'Môn thể thao đánh bóng qua lưới',
        imgUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2965/2965390.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bơi lội',
        description: 'Môn thể thao dưới nước',
        imgUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2965/2965299.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gym/Fitness',
        description: 'Tập luyện thể hình và sức khỏe',
        imgUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2936/2936886.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yoga',
        description: 'Luyện tập thể chất và tinh thần',
        imgUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3143/3143595.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bóng bàn',
        description: 'Môn thể thao vợt trong nhà',
        imgUrl: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2150/2150510.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pickleball',
        description: 'Môn thể thao kết hợp tennis và bóng bàn',
        imgUrl: 'https://images.unsplash.com/photo-1626186715510-9c7e69d0c51b',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/9103/9103691.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sports', null, {});
  }
};
