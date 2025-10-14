import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export default {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'admin',
        email: 'admin@sportbooking.com',
        password: hashedPassword,
        phone: '0901234567',
        address: '123 Lê Lợi, Q1, TP.HCM',
        dateOfBirth: '1990-05-15',
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Trần Thị Bình',
        email: 'owner1@sportbooking.com',
        password: hashedPassword,
        phone: '0901234568',
        address: '456 Nguyễn Huệ, Q1, TP.HCM',
        dateOfBirth: '1985-08-20',
        avatar: 'https://i.pravatar.cc/150?img=2',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Lê Văn Cường',
        email: 'owner2@sportbooking.com',
        password: hashedPassword,
        phone: '0901234569',
        address: '789 Trần Hưng Đạo, Q5, TP.HCM',
        dateOfBirth: '1988-12-10',
        avatar: 'https://i.pravatar.cc/150?img=3',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Phạm Thị Dung',
        email: 'user1@gmail.com',
        password: hashedPassword,
        phone: '0901234570',
        address: '321 Võ Văn Tần, Q3, TP.HCM',
        dateOfBirth: '1995-03-25',
        avatar: 'https://i.pravatar.cc/150?img=4',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Hoàng Văn Em',
        email: 'user2@gmail.com',
        password: hashedPassword,
        phone: '0901234571',
        address: '654 Cách Mạng Tháng 8, Q10, TP.HCM',
        dateOfBirth: '1992-07-18',
        avatar: 'https://i.pravatar.cc/150?img=5',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Võ Thị Phương',
        email: 'user3@gmail.com',
        password: hashedPassword,
        phone: '0901234572',
        address: '987 Điện Biên Phủ, Bình Thạnh, TP.HCM',
        dateOfBirth: '1993-11-05',
        avatar: 'https://i.pravatar.cc/150?img=6',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Đặng Văn Giang',
        email: 'user4@gmail.com',
        password: hashedPassword,
        phone: '0901234573',
        address: '147 Phan Xích Long, Phú Nhuận, TP.HCM',
        dateOfBirth: '1991-09-12',
        avatar: 'https://i.pravatar.cc/150?img=7',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Bùi Thị Hà',
        email: 'user5@gmail.com',
        password: hashedPassword,
        phone: '0901234574',
        address: '258 Hoàng Văn Thụ, Tân Bình, TP.HCM',
        dateOfBirth: '1994-02-28',
        avatar: 'https://i.pravatar.cc/150?img=8',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Trương Văn Inh',
        email: 'user6@gmail.com',
        password: hashedPassword,
        phone: '0901234575',
        address: '369 Lý Thường Kiệt, Q11, TP.HCM',
        dateOfBirth: '1996-06-14',
        avatar: 'https://i.pravatar.cc/150?img=9',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Phan Thị Kim',
        email: 'user7@gmail.com',
        password: hashedPassword,
        phone: '0901234576',
        address: '741 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP.HCM',
        dateOfBirth: '1997-04-09',
        avatar: 'https://i.pravatar.cc/150?img=10',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
 