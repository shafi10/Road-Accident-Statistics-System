const {body } = require('express-validator');

module.exports = [
    body('roadname')
    .not().isEmpty().withMessage('Can not be Empty'),
    body('noaccident')
    .isNumeric().withMessage('Please enter accident number').trim(),
    body('location')
    .not().isEmpty().withMessage('Can not be Empty'),
    body('busname')
    .isLength({min:2,max:15}).withMessage('Name must be 2 to 15 characters')
    .not().isEmpty().withMessage('Can not be Empty'),
    body('month')
    .not().isEmpty().withMessage('Can not be Empty')

]