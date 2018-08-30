module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define("Skill", {
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
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });
  Skill.associate = function(models) {
    Skill.belongsTo(models.User, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Skill;
};
