const express = require('express');
const router = express.Router();

const incomeController = require('../controller/income');
const { incomeValidationRules, validate } = require('../validation');

router.post('/income', incomeValidationRules(), validate, incomeController.createIncome);

router.get('/', incomeController.getAllIncome);
router.get('/:id', incomeController.getSingleIncome);
router.post('/', incomeController.createIncome);
router.put('/:id', incomeController.updateIncome);
router.delete('/:id', incomeController.deleteIncome);

module.exports = router;