const express = require("express");
const app = express();
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const categoryRouter = require("./routes/category.js");
const session = require("express-session");
const  MongoStore=require('connect-mongo');



const dbUrl=process.env.ATLASDB_URL 

const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },touchAfter:24*3600,
})
store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE",err);
})
const flash = require("connect-flash");

const sessionOptions = {
  store:store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session()); //A web application needs the ability users as they browse from page to page.This series of requests and responses, each associated with the same user, is known as a session.

passport.use(new LocalStrategy(User.authenticate())); //every user should authenticate through localstrategy

passport.serializeUser(User.serializeUser()); //store user into session
passport.deserializeUser(User.deserializeUser()); //remove user from session

app.use(flash());
app.use((req,res,next)=>{
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user;
  next();
})
async function main() {
  await mongoose.connect(dbUrl);
}
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/category",categoryRouter)




app.get('/privacy_footer', (req, res) => {
  res.render('listings/privacy_footer'); // Render the privacy_footer.ejs file
});



app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  res.render("error.ejs", { err });
});

app.listen(3000, () => {
  console.log("server started");
});
