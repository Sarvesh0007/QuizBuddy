const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flashconnect = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./handlers/index");
const userRouter = require("./handlers/User/UserRoutes");
const courseRouter = require("./handlers/Course/CourseRoutes");
const questionRouter = require("./handlers/Question/QuestionRoutes");
const quizRouter = require("./handlers/Quiz/QuizRoutes");

require("./config/passport")(passport);

const connectDb = require("./utility/dbConnect");
const { isVerified, isTeacher } = require("./handlers/auth/authController");

const app = express();

connectDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// session i.e express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "navigus",
    resave: true,
    saveUninitialized: false,
    cookie: { _expires: 600000 },
  })
);
app.use(flashconnect());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error = req.flash("error");

  next();
});

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/quizes", quizRouter);
app.use("/question", questionRouter);

app.get("/test", [isVerified, isTeacher], (req, res) => {
  return res.send("You have Successfully Logged In");
});
app.get("/test1", (req, res) => {
  console.log(req.user);
  if (req.user.role === "TEACHER") {
    return res.redirect("/users/teachers");
  }
  return res.redirect("/users/students");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
