const express = require('express');
const router = express.Router();

const controller = require('../controllers/meetingController');

router.post('/create', controller.add);
router.get('/', controller.find);
router.get('/id/:id', controller.findById);
router.get('/topic/:topic', controller.findByTopic);
router.get('/date/:date', controller.findByDate);
router.put('/edit/:id', controller.edit);
router.delete('/remove/:id', controller.remove);

module.exports = router;