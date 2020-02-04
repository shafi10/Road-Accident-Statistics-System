const {body } = require('express-validator');

module.exports = [
    body('monthAccident')
    .isNumeric().withMessage('Enter a number'),
    body('month')
    .not().isEmpty().withMessage('Can not be Empty'),
    body('busAccident')
    .isNumeric().withMessage('Enter a number'),
    body('busName')
    .not().isEmpty().withMessage('Can not be Empty'),
    body('locationAccident')
    .isNumeric().withMessage('Enter a number'),
    body('location')
    .not().isEmpty().withMessage('Can not be Empty'),
    body('lat')
    .not().isEmpty().withMessage('Can not be Empty'),
    body('lng')
    .not().isEmpty().withMessage('Can not be Empty')

]