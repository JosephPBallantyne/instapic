import { Sequelize, Model, DataTypes } from 'sequelize';
// import Users from './users.model';

class Images extends Model {
  public id!: number;

  // public userId!: number;

  public description!: string;

  public source!: string;

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
        source: {
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
    // this.belongsTo(Users);
  }
}

export default Images;
