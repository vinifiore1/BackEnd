const model = require("../models");
const User = model.User;
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "login", passwordField: "password" },
      (login, password, done) => {
        User.findOne({ where: { login: login } }).then((user) => {
          if (!user) {
            return done(null, false, { msg: "Usuario não encontrado!" });
          }
          const res = bcrypt.compare(
            password,
            user.password,
            (err, response) => {
              if (response) {
                return done(null, user);
              } else {
                return done(null, false, { msg: "Senha incorreta" + err });
              }
            }
          );
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id: id } }).then((res) => {
      if (res) {
        return done(null, false, { msg: "Usuario não encontrado!" });
      } else {
        return done(null, res);
      }
    });
  });
};
