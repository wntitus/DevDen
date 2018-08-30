module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define("Messages", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Messages.associate = function(models) {
    Messages.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Messages;
};
