const express = require('express');
const router = express.Router();

const controller = require('../controllers/meetingController');
const auth = require('../middlewares/accountAuth');

router.use(auth.authenticate);

//@route POST meeting
//@params :otherAccountId
//@desc Create new meeting between two accounts by other account id
//@acess Private
//@endpoint http://localhost:port/meeting/create/otherParticipant/:otherAccountId'
router.post('/create/otherParticipant/:otherAccountId', controller.add);

//@route GET meeting
//@desc Return account meetings
//@acess Private
//@endpoint http://localhost:port/meeting
router.get('/', controller.find);

//@route GET meeting
//@params :topic
//@desc Return account meetings by topic
//@acess Private
//@endpoint http://localhost:port/meeting/topic/:topic
router.get('/topic/:topic', controller.findByTopic);

//@route PUT meeting
//@params :meetingId
//desc Update account meeting by meetingId: identifier
//access Private
//@endpoint http://localhost:port/meeting/edit/:meetingId
router.put('/edit/:meetingId', controller.edit);

//@route DELETE meeting
//@params :meetingId
//desc Delete account meeting by meetingId: identifier
//access Private
//@endpoint http://localhost:port/meeting/remove/:meetingId
router.delete('/remove/:meetingId', controller.remove);

module.exports = router;