
module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true
    },
    supplier: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'users',
    indexes: [
      { unique: true, fields: ['email'] },
    ]
  });

  Users.associate = (models) => {
    // Users.hasOne(models.Trader, { as: 'Trader', foreignKey: 'trader_base_id' })
  }

  return Users;
};
