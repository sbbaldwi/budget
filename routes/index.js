const express = require('express');
const routes = express.Router();

const accountsRouter = require('./accounts');
const budgetItemsRouter = require('./budget_items');

routes.use('/accounts', accountsRouter);
routes.use('/budget-items', budgetItemsRouter);

module.exports = routes;