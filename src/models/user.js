"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Please enter your login",
          },
        },
      },
      password_hash: { type: DataTypes.VIRTUAL, allowNull: false },
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Please enter your email",
          },
        },
      },
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.addHook("beforeSave", async (cryptSenha) => {
    if (cryptSenha.password_hash) {
      cryptSenha.password = await bcrypt.hash(cryptSenha.password_hash, 8);
    }
  });

  return User;
};
