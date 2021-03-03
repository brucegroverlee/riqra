import Sequelize from 'sequelize';
import { connection } from "../config/config";

export class UsersModel extends Sequelize.Model {}

UsersModel.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  first_name: {
    type: Sequelize.STRING(250),
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING(250),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(250),
    allowNull: false,
    unique: true
  },
  supplier: {
    type: Sequelize.STRING(250),
    allowNull: true
  },
  username: {
    type: Sequelize.STRING(250),
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
},
{
  sequelize: connection,
  modelName: 'user',
  tableName: 'users',
  timestamps: true,
  underscored: true,
  indexes: [
    { unique: true, fields: ['email'] },
  ]
});

export default UsersModel;