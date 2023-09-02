const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const passport = require('passport');
const {strategy, Strategy} = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
require('dotenv').config();

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2
};

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET
}

function verifyCallback(accessToken,refreshToken,profile,done){
  console.log('Google profile',profile);
  done(null,profile);
};

passport.use(new Strategy(AUTH_OPTIONS,verifyCallback));

passport.serializeUser((user,done) => {
  done(null,user.displayName);
});

passport.deserializeUser((displayName,done) => {
  done(null,displayName);
});

const app = express();

app.use(helmet());

app.use(cookieSession({
  name:'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.COOKIE_KEY_1,config.COOKIE_KEY_2]
}));

app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req,res,next){
  console.log('Current user is:',req.user);
  const isLoggedIn = req.isAuthenticated() && req.user; //TODO
  if(!isLoggedIn){
    return res.status(401).json({
      Error: 'You Must Log In'
    });
  };
  next();
};

app.get('/auth/google',
  passport.authenticate('google',{
    scope:['email','profile']
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google',{
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true
  }),(req,res) => {
    console.log('Google called us back!');
  }
);

app.get('/auth/logout',(req,res) => {
  req.logout();
  return res.redirect('/');
});

app.get('/secret',checkLoggedIn,(request, response)=> {
  return response.send('Your personal secret number is 42');
});

app.get('/failure', (req,res) => {
  return res.send('Failed to Login')
});

app.get('/',(request, response) =>{
  response.sendFile(path.join(__dirname, 'public','index.html'));
});

https.createServer({
  key: fs.readFileSync('./HTTPS/key.pem'),
  cert: fs.readFileSync('./HTTPS/cert.pem')
},app).listen(PORT, () => {
  console.log('Application is listening on port:', PORT)
})