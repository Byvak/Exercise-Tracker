const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const dbUri = process.env.MONGO_URI;
var user_dao = require('./models/user_dao');
const { call } = require('body-parser');








