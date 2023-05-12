const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models");

function passportConfig() {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          console.log("Usuario no existe.");
          return done(null, false, { message: "Email incorrecto." });
        }
        const match = await user.comparePasswords(password);
        if (!match) {
          console.log("La contraseña es inválida.");
          return done(null, false, { message: "Credenciales incorrectas." });
        }
        console.log("Credenciales verificadas correctamente");
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user); // Usuario queda disponible en req.user.
    } catch (err) {
      done(err);
    }
  });
}

module.exports = passportConfig;
