const express = require('express');
const path    = require('path');
const fs      = require('fs');
const router  = express.Router();

const views = path.join(__dirname, '..', 'views');
// Diz ao Express para também disponibilizar os ficheiros da pasta Notebooks
// Permite que o servidor Express aceda e sirva os ficheiros da pasta Notebooks


/* Parte do Engenheiro Informático */
router.get('/',                (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));
router.get('/tech-trends',     (req, res) => res.sendFile(path.join(views, 'tech-trends.html')));
router.get('/career-paths',    (req, res) => res.sendFile(path.join(views, 'career-paths.html')));
router.get('/ai-tools',        (req, res) => res.sendFile(path.join(views, 'ai-tools.html')));
router.get('/learning',        (req, res) => res.sendFile(path.join(views, 'learning.html')));
router.get('/salary-explorer', (req, res) => res.sendFile(path.join(views, 'salary-explorer.html')));
router.get('/demographics',    (req, res) => res.sendFile(path.join(views, 'demographics.html')));
router.get('/recommendation', (req, res) => res.sendFile(path.join(views, 'recommendation_Developer.html')));

module.exports = router;