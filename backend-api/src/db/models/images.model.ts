import { Sequelize, Model, DataTypes } from 'sequelize';
import Users from './users.model';

class Images extends Model {
  public id!: number;

  public description!: string;

  public filename!: string;

  public uuid!: string;

  public userId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    return Images.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        description: {
          type: new DataTypes.STRING(255),
          allowNull: true,
        },
        filename: {
          type: new DataTypes.STRING(255),
          allowNull: false,
        },
        uuid: {
          type: new DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'images',
        deletedAt: false,
      }
    );
  }

  public static initAssocation(): void {
    this.belongsTo(Users);
  }
}

export default Images;
