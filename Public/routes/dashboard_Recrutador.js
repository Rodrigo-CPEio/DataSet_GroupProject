const express = require('express');
const path    = require('path');
const { spawn } = require('child_process');
const router  = express.Router();

const views = path.join(__dirname, '..', 'views');
const predictScript = path.join(__dirname, '..', 'ml_models', 'predict_jobsat.py');
const salaryPredictScript = path.join(__dirname, '..', 'ml_models', 'predict_salary.py');
const salaryLanguagePredictScript = path.join(__dirname, '..', 'ml_models', 'predict_salary_language.py');

/* Parte do Recrutador */
router.get('/',                (req, res) => res.sendFile(path.join(__dirname, '..', 'Overview_Recrutador.html')));
router.get('/tech-trends_Recrutador',     (req, res) => res.sendFile(path.join(views, 'tech-trends_Recrutador.html')));
router.get('/career-paths_Recrutador',    (req, res) => res.sendFile(path.join(views, 'career-paths_Recrutador.html')));
router.get('/ai-tools_Recrutador',        (req, res) => res.sendFile(path.join(views, 'ai-tools_Recrutador.html')));
router.get('/learning_Recrutador',        (req, res) => res.sendFile(path.join(views, 'learning_Recrutador.html')));
router.get('/salary-explorer_Recrutador', (req, res) => res.sendFile(path.join(views, 'salary-explorer_Recrutador.html')));
router.get('/demographics_Recrutador',    (req, res) => res.sendFile(path.join(views, 'demographics_Recrutador.html')));
router.get('/machine-learning_Recrutador', (req, res) => res.sendFile(path.join(views, 'machine-learning_Recrutador.html')));

router.post('/api/predict-jobsat', (req, res) => {
  const input = {
    YearsCodePro_Num: req.body.YearsCodePro_Num,
    WorkExp: req.body.WorkExp,
    Age_Code: req.body.Age_Code,
    JobSatPoints_1: req.body.JobSatPoints_1,
    JobSatPoints_4: req.body.JobSatPoints_4,
    JobSatPoints_5: req.body.JobSatPoints_5,
  };

  const python = spawn('python', [predictScript, JSON.stringify(input)]);
  let output = '';
  let error = '';

  python.stdout.on('data', data => {
    output += data.toString();
  });

  python.stderr.on('data', data => {
    error += data.toString();
  });

  python.on('close', code => {
    if (code !== 0) {
      return res.status(500).json({
        error: 'Prediction failed',
        details: error.trim() || 'Python process exited with an error.',
      });
    }

    try {
      res.json(JSON.parse(output));
    } catch (parseError) {
      res.status(500).json({
        error: 'Invalid prediction output',
        details: output.trim(),
      });
    }
  });
});

router.post('/api/predict-salary', (req, res) => {
  const input = {
    YearsCodePro_Num: req.body.YearsCodePro_Num,
    WorkExp: req.body.WorkExp,
    Age_Code: req.body.Age_Code,
  };

  const python = spawn('python', [salaryPredictScript, JSON.stringify(input)]);
  let output = '';
  let error = '';

  python.stdout.on('data', data => {
    output += data.toString();
  });

  python.stderr.on('data', data => {
    error += data.toString();
  });

  python.on('close', code => {
    if (code !== 0) {
      return res.status(500).json({
        error: 'Prediction failed',
        details: error.trim() || 'Python process exited with an error.',
      });
    }

    try {
      res.json(JSON.parse(output));
    } catch (parseError) {
      res.status(500).json({
        error: 'Invalid prediction output',
        details: output.trim(),
      });
    }
  });
});

router.post('/api/predict-salary-language', (req, res) => {
  const input = {
    Language: req.body.Language,
    YearsCodePro_Num: req.body.YearsCodePro_Num,
    WorkExp: req.body.WorkExp,
    Age_Code: req.body.Age_Code,
  };

  const python = spawn('python', [salaryLanguagePredictScript, JSON.stringify(input)]);
  let output = '';
  let error = '';

  python.stdout.on('data', data => {
    output += data.toString();
  });

  python.stderr.on('data', data => {
    error += data.toString();
  });

  python.on('close', code => {
    if (code !== 0) {
      return res.status(500).json({
        error: 'Prediction failed',
        details: error.trim() || 'Python process exited with an error.',
      });
    }

    try {
      res.json(JSON.parse(output));
    } catch (parseError) {
      res.status(500).json({
        error: 'Invalid prediction output',
        details: output.trim(),
      });
    }
  });
});

module.exports = router;
