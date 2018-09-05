var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // userID: DataTypes.UUID,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://www.cadcorp.com/images/uploads/product-images/cadcorp_developer_200x200.png"
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobTitle: {
      type: DataTypes.STRING,
      defaultValue: "devDen Denizen"
    },
    phoneNumber: {
      type: DataTypes.STRING,
      defaultValue: "555-555-5555"
    }
  });
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  User.associate = function(models) {
    User.hasMany(models.Project, {
      as: "collaboratorId",
      foreignKey: "collaboratorId"
    });
    User.hasMany(models.Project, {
      as: "ownerId",
      foreignKey: "ownerId"
    });
    User.hasMany(models.Messages, {
      onDelete: "cascade"
    });
    User.hasMany(models.Skill, {
      onDelete: "cascade"
    });
  };

  return User;
};
