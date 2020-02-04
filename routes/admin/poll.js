const express = require('express');
const router = express.Router();

const pollController= require('../../controllers/admin/poll');
const isAuth= require('../../middleware/user/is-auth');
const auth= require('../../middleware/admin/auth');

router.get('/create',auth, pollController.getCreate);
router.post('/create', pollController.postCreate);
router.get('/polls', pollController.getAllPolls);
router.post('/poll-delete', pollController.deletePoll);
router.get('/managepolls',auth, pollController.manageAllPolls);
router.get('/polls/:id', pollController.viewPollGetController);
router.post('/polls/:id', pollController.viewPollPostController);

module.exports=router;