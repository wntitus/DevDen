module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    collabInvite: {
      type: DataTypes.STRING
    },
    collabReq: {
      type: DataTypes.STRING
    },
    collaborators: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.BLOB
    }
  });
  Project.associate = function(models) {
    Project.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Project.hasMany(models.Collabs, {
      onDelete: "cascade"
    });
  };
  return Project;
};
