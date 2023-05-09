require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const methodOverride = require("method-override");
const { User } = require("./models");

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

///////// AUTENTICACION DE USUARIO
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
  }),
);

app.use(passport.session());
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
          console.log("Usuario no existe.");
          return done(null, false, { message: "Email incorrecto." });
        }
        // const match = await bcrypt.compare(password, user.password);
        if (user.password !== password) {
          console.log("La contraseña es inválida.");
          return done(null, false, { message: "Credenciales incorrectas." });
        }
        console.log("Credenciales verificadas correctamente");
        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
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

// app.get("/welcome", function (req, res) {
//   if (req.isAuthenticated()) {
//     res.send("Te damos la bienvenida");
//   } else {
//     res.redirect("/admin");
//   }
// });

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);
/////////////////

routes(app);
app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
