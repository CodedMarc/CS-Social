/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const gitRoute = require('./routes/gitRoute');
const postsRoute = require('./routes/postsRoute');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cookieParser());

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

// root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'));
});

// GITHUB OAUTH
// taken to login
app.get('/auth', (req, res) => {
  console.log('landed on /auth');
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GIT_ID}&scope=read:org&scope=read:user&scope=user:email`);
});
// redirects back to this url to get user data
app.get('/OAuth', (req, res, next) => {
  const { code } = req.query;
  const body = {
    client_id: process.env.GIT_ID,
    client_secret: process.env.GIT_SECRET,
    code,
  };
  const options = {
    headers: { accept: 'application/json' },
  };
  axios.post('https://github.com/login/oauth/access_token', body, options)
    .then((response) => {
      console.log(response);
      res.locals.token = response.data.access_token;
      console.log(`token: ${res.locals.token}`);
      res.redirect('http://localhost:8000/home');
    })
    .catch((err) => next({
      log: 'Failed to authenticate github user',
      status: 400,
      message: { err },
    }));
});

// Posts Route
app.use('/posts', postsRoute);
app.use('/user', userRoute);

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
