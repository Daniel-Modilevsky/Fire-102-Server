const express = require('express');
const { middlewareExcerciseId, getAllexcercises, getExcercise, createExcercise, updateExcercise, deleteExcercise, getByStep, sendParamsRandom  } = require('./reports-controller');
let router = express.Router();


//Middlewares
router.get('/api/step/:stepName', getByStep); 


//Routes
router.get('/api/excercisies/', getAllexcercises)
      .post('/api/excercisies/', createExcercise);
router.get('/api/excercisies/:id',middlewareExcerciseId, getExcercise)
      .put('/api/excercisies/:id',middlewareExcerciseId, updateExcercise)
      .delete('/api/excercisies/:id',middlewareExcerciseId, deleteExcercise);
router.post('/api/random/', sendParamsRandom);


module.exports = router;