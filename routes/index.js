const express = require('express');
const routes = express.Router();

const accountsRouter = require('./accounts');
const budgetItemsRouter = require('./budget_items');
const incomeRouter = require('./income')

routes.use('/accounts', accountsRouter);
routes.use('/budget-items', budgetItemsRouter);
routes.use('./income', incomeRouter);

module.exports = routes;