const User = require("../models/user");

module.exports.renderSignupForm=(req, res) => {
  res.render("users/signup.ejs");
};



module.exports.signup=async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
}
module.exports.login=async (req, res) => {
  let redirectUrl=res.locals.redirectUrl || "/listings"
  res.redirect(redirectUrl);
}

module.exports.renderloginForm=async (req, res) => {
res.render("users/login");
}
module.exports.logout=(req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/listings");
  });
}


