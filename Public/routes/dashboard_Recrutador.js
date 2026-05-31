const express = require('express');
const path    = require('path');
const { spawn } = require('child_process');
const router  = express.Router();

const views = path.join(__dirname, '..', 'views');

/* Parte do Recrutador */
router.get('/',                (req, res) => res.sendFile(path.join(__dirname, '..', 'Overview_Recrutador.html')));
router.get('/tech-trends_Recrutador',     (req, res) => res.sendFile(path.join(views, 'tech-trends_Recrutador.html')));
router.get('/career-paths_Recrutador',    (req, res) => res.sendFile(path.join(views, 'career-paths_Recrutador.html')));
router.get('/ai-tools_Recrutador',        (req, res) => res.sendFile(path.join(views, 'ai-tools_Recrutador.html')));
router.get('/learning_Recrutador',        (req, res) => res.sendFile(path.join(views, 'learning_Recrutador.html')));
router.get('/salary-explorer_Recrutador', (req, res) => res.sendFile(path.join(views, 'salary-explorer_Recrutador.html')));
router.get('/demographics_Recrutador',    (req, res) => res.sendFile(path.join(views, 'demographics_Recrutador.html')));
router.get('/recommendation', (req, res) => res.sendFile(path.join(views, 'recommendation_Recrutador.html')));


module.exports = router;