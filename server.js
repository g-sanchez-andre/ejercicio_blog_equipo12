require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const {User} = require("./models");

const methodOverride = require("method-override");
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);

app.use(passport.session());

passport.use(new LocalStrategy({
usernameField: 'email',
passwordField: 'password'
},
  async(username, password, done) => {
  try{
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("El usuario no existe");
      return done(null, false, { message: "Credenciales incorrectas."});
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("La contraseña es inválida.");
      return done(null, false, { message: "Credenciales incorrectas." })
  } catch (error) {
    return done(error);
  }
}})
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
   
const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("El usuario no existe");
      return done(null, false, { message: "Credenciales incorrectas."})
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("La contraseña es inválida.");
      return done(null, false, { message: "Credenciales incorrectas." })
  }

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
