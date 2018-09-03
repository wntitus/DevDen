module.exports = function(sequelize, DataTypes) {
  var Collaborator = sequelize.define("Collaborator", {
    numOfCommits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    collaboratorID: {
      type: DataTypes.INTEGER
    }
  });
  Collaborator.associate = function(models) {
    Collaborator.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Collaborator;
};
