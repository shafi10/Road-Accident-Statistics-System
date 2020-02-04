const {body } = require('express-validator');

module.exports = [
    body('email')
    .isEmail().withMessage('Enter a valid email'),
    body('password')
    .not().isEmpty().withMessage('Password can not be empty')
]