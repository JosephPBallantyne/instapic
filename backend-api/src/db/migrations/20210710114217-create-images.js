module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('images', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: new Sequelize.STRING(255),
      },
      filename: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      uuid: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      userId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'users',
          key: 'id',
        },
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
