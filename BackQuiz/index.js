require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const router = require('./Router/router');
const path = require('path');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost/quiz', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, ".", "uploads")));

app.use(cors());
app.use('/', router);

app.listen(3001, () => console.log('Conectado!'));