import { Sequelize, Model, DataTypes } from 'sequelize';

class Users extends Model {
  public id!: number;

  public username!: string;

  public password!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    return Users.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: new DataTypes.STRING(255),
          unique: true,
          allowNull: true,
        },
        password: {
          type: new DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'users',
        deletedAt: false,
      }
    );
  }

  public static initAssocation(): void {}
}

export default Users;
