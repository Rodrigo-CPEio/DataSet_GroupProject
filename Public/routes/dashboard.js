const express = require('express');
const path    = require('path');
const fs      = require('fs');
const router  = express.Router();

const views = path.join(__dirname, '..', 'views');
// Diz ao Express para também disponibilizar os ficheiros da pasta Notebooks
// Permite que o servidor Express aceda e sirva os ficheiros da pasta Notebooks
router.use('/notebooks-files', express.static(path.join(__dirname, '..', '..', 'Notebooks')));
let recomendacoesAtuais = { recommendations: ["Python", "JavaScript", "SQL"] };
/* Parte do Engenheiro Informático */
router.get('/',                (req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));
router.get('/tech-trends',     (req, res) => res.sendFile(path.join(views, 'tech-trends.html')));
router.get('/career-paths',    (req, res) => res.sendFile(path.join(views, 'career-paths.html')));
router.get('/ai-tools',        (req, res) => res.sendFile(path.join(views, 'ai-tools.html')));
router.get('/learning',        (req, res) => res.sendFile(path.join(views, 'learning.html')));
router.get('/salary-explorer', (req, res) => res.sendFile(path.join(views, 'salary-explorer.html')));
router.get('/demographics',    (req, res) => res.sendFile(path.join(views, 'demographics.html')));

/* 1. ENDPOINT PARA O PYTHON ENVIAR OS DADOS (Muda os dados na memória) */
router.post('/api/update-recommendations', express.json(), (req, res) => {
    if (req.body && req.body.recommendations) {
        recomendacoesAtuais = req.body;
        console.log("🚀 Algoritmo Python atualizou as recomendações em memória:", recomendacoesAtuais.recommendations);
        return res.json({ success: true, message: "Recomendações atualizadas!" });
    }
    res.status(400).json({ success: false, message: "Dados inválidos" });
});

/* 2. ENDPOINT PARA O DASHBOARD LER OS DADOS */
router.get('/api/recommend', (req, res) => {
    res.json(recomendacoesAtuais);
});

module.exports = router;