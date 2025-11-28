const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const session = require("express-session");
/* SQL */
const {connection, models} = require('./database/database');
const { connection1 } = require('./database/database1');

const routes = require('./routes');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const porta = 3500;

module.exports = {
  app,
  http,
  io,
  porta,
  connection,
  models,
  connection1,
  routes,
  express,
  bodyParser,
};

