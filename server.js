require("dotenv").config();
const passportConfig = require("./config/passportConfig");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const methodOverride = require("method-override");
const flash = require("express-flash");
const makeUserAvailableInViews = require("./middleware/makeUserAvailableInViews");

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
///////// AUTENTICACION DE USUARIO
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());
app.use(flash());
passportConfig();
/////////////////////////
app.use(makeUserAvailableInViews);
routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
