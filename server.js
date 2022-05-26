/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const GitHubStrategy = require('passport-github2').Strategy;
// const gitRoute = require('./routes/gitRoute');
const { access } = require('fs');
const postsRoute = require('./routes/postsRoute');
const User = require('./models/userModel');
const userRoute = require('./routes/userRoute');

const app = express();

const PORT = process.env.PORT || 8000;

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'git_jwt',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
}));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/build')));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  User.findOne({ git_id: id }, (err, user) => {
    cb(err, user);
  });
});

// connect to atlas DB
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).then(() => {
  console.log('Connected to DB');
});

// PASSPORT GITHUB
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GIT_ID,
    clientSecret: process.env.GIT_SECRET,
    callbackURL: 'http://localhost:8000/OAuth',
  },
  ((accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
      name: profile.displayName,
      username: profile.username,
      git_id: profile.id,
      email: profile.email,
      imgURL: profile.photos[0].value,
    }, (err, user) => {
      console.log(user);
      app.locals.loggedInUser = user;
      done(err, user);
    });
  }),
));

app.get('/check', (req, res) => {
  console.log('logged in is: ', app.locals.loggedInUser);
  res.send(app.locals.loggedInUser);
});
app.get('/auth', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/OAuth', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/home');
});

// GITHUB OAUTH
// taken to login
// app.get('/auth', (req, res) => {
//   console.log('landed on /auth');
//   res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GIT_ID}?scope=user:email%20:email%20:org`);
// });
// redirects back to this url to get user data
// app.get('/OAuth', (req, res, next) => {
//   const { code } = req.query;
//   const body = {
//     client_id: process.env.GIT_ID,
//     client_secret: process.env.GIT_SECRET,
//     code,
//   };
//   const options = {
//     headers: { accept: 'application/json' },
//   };
//   axios.post('https://github.com/login/oauth/access_token', body, options)
//     .then(async (response) => {
//       console.log(response.data.access_token);
//       res.cookie('github_jwt', response.data.access_token);
//       // POST TO API WITH TOKEN
//       const result = await axios.get('https://api.github.com/user/emails', {
//         headers: {
//           // eslint-disable-next-line quote-props
//           'Authorization': `token ${response.data.access_token}`,
//         },
//       });
//       console.log(`result: ${result}`);
//       console.log(`token: ${response.data.access_token}`);
//       res.redirect('/home');
//     })
//     .catch((err) => next({
//       log: 'Failed to authenticate github user',
//       status: 400,
//       message: { err: `oh no: ${err}` },
//     }));
// });

// Posts Route
app.use('/posts', postsRoute);
app.use('/user', userRoute);

function ensureAuthenticated(req, res, next) {
  if (app.locals.loggedInUser) { return next(); }
  return res.redirect('/');
}
app.get('*', ensureAuthenticated, (req, res) => {
  console.log('umm...');
  res.sendFile(path.join(__dirname, './client/build/'));
});
// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
