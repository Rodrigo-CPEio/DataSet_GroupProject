/* app.js*/
const express = require('express');
const path    = require('path');

const dashboardRoutes = require('./routes/dashboard');
const dashboardRecrutadorRoutes = require('./routes/dashboard_Recrutador');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz → redireciona para login
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use(express.static(path.join(__dirname)));
app.use('/developer', dashboardRoutes);
app.use('/recrutador', dashboardRecrutadorRoutes);


// Rota do login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

module.exports = app;
