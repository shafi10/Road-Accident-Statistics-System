const express = require('express');
const router = express.Router();

const signInValidator = require('../../validator/admin/signInValidator')
const adminController= require('../../controllers/admin/admin');
const auth= require('../../middleware/admin/auth');

router.get('/dashboard',auth, adminController.getDashboard);
router.get('/dashboard/details/:id',auth, adminController.getDashboardDetails);
router.get('/sign', adminController.getSignUp);
router.post('/sign', adminController.postSignUp);
router.get('/adminlog', adminController.getLogIn);
router.post('/adminlog',signInValidator, adminController.postLogIn);
router.post('/adminlogout', adminController.postLogOut);

module.exports=router;