require("dotenv").config();

const methodOverride = require("method-override");
const passport = require("passport");
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");

const passportConfig = require("./config/passport");
const routes = require("./routes");
const makeUserAvailableInViews = require("./middleware/makeUserAvailableInViews");
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

///////// AUTENTICACION DE USUARIO
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());
passportConfig();

/////////////////
app.use(makeUserAvailableInViews);
routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
