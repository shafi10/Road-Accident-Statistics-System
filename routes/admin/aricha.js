const express = require('express');
const router = express.Router();

const arichaValidator = require('../../validator/admin/arichaValidator')

const arichaController= require('../../controllers/admin/aricha');
const auth= require('../../middleware/admin/auth');

router.get('/arichachart', arichaController.getChart);
router.get('/admin',auth,arichaController.getAricha);
router.post('/admin',arichaValidator, arichaController.postAricha);
router.get('/admin/view',auth, arichaController.viewAricha);
//router.get('/admin/edit/:arichaId',auth, arichaController.getEditAricha);
router.post('/admin/edit/:id',arichaController.postEditAricha);
//router.get('/admin/editt/:arichaId',auth, arichaController.getEdittAricha);
router.post('/admin/editt/:id',arichaController.postEdittAricha);
//router.get('/admin/edittt/:arichaId', auth, arichaController.getEditttAricha);
router.post('/admin/edittt/:id',arichaController.postEditttAricha);
router.get('/aricha/chart',arichaController.getArichaChart);

module.exports=router;