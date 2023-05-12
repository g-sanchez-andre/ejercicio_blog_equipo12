const { User } = require("../models");
const authController = require("../controllers/authController");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  res.render("login");
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("register");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, email, password } = req.body;
  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    },
  });
  if (created) {
    req.login(user, () => res.redirect("/admin"));
  } else {
    res.redirect("back");
  }
}

// Login
async function login(req, res) {}

// Logout
async function logout(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  // index,
  show,
  create,
  store,
  // edit,
  // update,
  // destroy,
};
