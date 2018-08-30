module.exports = function(sequelize, DataTypes) {
  var Skills = sequelize.define("Skills", {
    technology: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proficiency: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accolades: {
      type: DataTypes.INTEGER
    }
  });
  Skills.associate = function(models) {
    Skills.belongsTo(models.User, {
      // onDelete: "cascade"
    });
  };
  return Skills;
};
