const express = require('express');
const router = express.Router();

const budget_itemsController = require('../controller/budget_items');
const { budgetItemValidationRules, validate } = require('../validation');

router.post('/budget-items', budgetItemValidationRules(), validate, budget_itemsController.createBudgetItem);

router.get('/', budget_itemsController.getAllBudgetItems);
router.get('/:id', budget_itemsController.getSingleBudgetItem);
router.post('/', budget_itemsController.createBudgetItem);
router.put('/:id', budget_itemsController.updateBudgetItem);
router.delete('/:id', budget_itemsController.deleteBudgetItem);

module.exports = router;
