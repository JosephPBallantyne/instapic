module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('images', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // userId: {
      //   type: new Sequelize.INTEGER(),
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      // },
      description: {
        type: new Sequelize.STRING(255),
      },
      source: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('images'),
};
