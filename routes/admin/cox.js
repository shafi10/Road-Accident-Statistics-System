const express = require('express');
const router = express.Router();

const coxController= require('../../controllers/admin/cox');
const auth= require('../../middleware/admin/auth');

router.get('/coxchart', coxController.getChartCox);
router.get('/cox',auth, coxController.getCoxBazar);
router.post('/cox', coxController.postCoxBazar);
router.get('/cox/view',auth, coxController.viewCox);
//router.get('/cox/edit/:coxId',auth, coxController.getEditCox);
router.post('/cox/edit/:id',coxController.postEditCox);
//router.get('/cox/editt/:coxId',auth, coxController.getEdittCox);
router.post('/cox/editt/:id',coxController.postEdittCox);
//router.get('/cox/edittt/:coxId',auth, coxController.getEditttCox);
router.post('/cox/edittt/:id',coxController.postEditttCox);
router.get('/cox/chart', coxController.getCoxChart);

module.exports=router;