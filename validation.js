const { body, validationResult } = require('express-validator');

const accountValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('phoneNumber').optional().isMobilePhone().withMessage('Phone number must be valid'),
  ];
};

const budgetItemValidationRules = () => {
  return [
    body('category').isIn(['grocery', 'gas', 'rent', 'activities', 'bills', 'miscellaneous']).withMessage('Invalid category'),
    body('description').notEmpty().withMessage('Description is required'),
    body('money').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  ];
};

const incomeValidationRules = () => {
  return [
    body('description').notEmpty().withMessage('Description is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  budgetItemValidationRules,
  incomeValidationRules,
  accountValidationRules,
  validate,
};