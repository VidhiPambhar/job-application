'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `INSERT INTO roles (name, email, password, slug, createdAt, updatedAt) VALUES 
      ('Admin', 'admin@gmail.com', '123', 'admin', NOW(), NOW())`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
