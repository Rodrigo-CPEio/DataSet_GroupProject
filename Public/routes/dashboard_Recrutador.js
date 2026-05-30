const express = require('express');
const path    = require('path');
const { spawn } = require('child_process');
const router  = express.Router();

const views = path.join(__dirname, '..', 'views');
router.use('/notebooks-files', express.static(path.join(__dirname, '..', '..', 'Notebooks')));
/* Parte do Recrutador */
router.get('/',                (req, res) => res.sendFile(path.join(__dirname, '..', 'Overview_Recrutador.html')));
router.get('/tech-trends_Recrutador',     (req, res) => res.sendFile(path.join(views, 'tech-trends_Recrutador.html')));
router.get('/career-paths_Recrutador',    (req, res) => res.sendFile(path.join(views, 'career-paths_Recrutador.html')));
router.get('/ai-tools_Recrutador',        (req, res) => res.sendFile(path.join(views, 'ai-tools_Recrutador.html')));
router.get('/learning_Recrutador',        (req, res) => res.sendFile(path.join(views, 'learning_Recrutador.html')));
router.get('/salary-explorer_Recrutador', (req, res) => res.sendFile(path.join(views, 'salary-explorer_Recrutador.html')));
router.get('/demographics_Recrutador',    (req, res) => res.sendFile(path.join(views, 'demographics_Recrutador.html')));


router.post('/recomendar-candidatos', (req, res) => {
    // Pegar nas tecnologias enviadas pelo formulário do HTML (ex: "Python,Docker")
    const tecnologias = req.body.tecnologias || "Python"; 

    // Caminho para o teu ficheiro Python (ajusta se estiver noutra pasta)
    const scriptPython = path.join(__dirname, '..', 'Recommendation_Algorithms.py');

    // Executa o comando: python Recommendation_Algorithms.py "Python,Docker"
    const pythonProcess = spawn('python', [scriptPython, tecnologias]);

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            console.log("✅ Python gerou os gráficos com sucesso!");
            // Devolve um estado de sucesso para o teu HTML saber que pode atualizar a imagem
            res.json({ success: true, message: "Gráficos atualizados!" });
        } else {
            console.error("❌ Erro ao executar o script Python. Código:", code);
            res.status(500).json({ success: false, message: "Erro no motor de IA." });
        }
    });
});
module.exports = router;