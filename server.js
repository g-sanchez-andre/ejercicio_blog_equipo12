require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

const methodOverride = require("method-override");

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);
app.use(passport.session());
passport.use(
  new LocalStrategy((username, password, cb) => {
    // Aquí adentro es necesario validar (contra nuestra base de datos)
    // que username y password sean correctos.
    // Ver la documentación de Passport por detalles.
  }),
);

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
