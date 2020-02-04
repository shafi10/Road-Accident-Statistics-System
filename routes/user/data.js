const path = require('path');

const express = require('express');

const dataValidator = require('../../validator/auth/dataValidator')

const dataController= require('../../controllers/user/data');

const router = express.Router();
const isAuth= require('../../middleware/user/is-auth');
const upload = require('../../middleware/uploadMiddleware')

router.get('/', dataController.getAddData );
router.get('/info',isAuth, dataController.getAddDatainfo );
router.post('/info',upload.single('image'),dataValidator, dataController.postAddDatainfo );
router.get('/profile',isAuth, dataController.getProfile );


module.exports=router;