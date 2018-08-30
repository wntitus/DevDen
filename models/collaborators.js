module.exports = function(sequelize, DataTypes) {
  var Collabs = sequelize.define("Collabs", {
    numOfCommits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    collaboratorID: {
      type: DataTypes.INTEGER
    }
  });
  Collabs.associate = function(models) {
    Collabs.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Collabs;
};
