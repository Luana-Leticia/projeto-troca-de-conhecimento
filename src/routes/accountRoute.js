const express = require('express');
const router = express.Router();

const controller = require('../controllers/accountController');

router.post('/create', controller.add);
router.get('/', controller.find);
router.get('/id/:id', controller.findById);
router.get('/username/:username', controller.findByName);
router.get('/interest/:interest', controller.findByDomain);
router.put('/edit/:id', controller.edit);
router.delete('/remove/:id', controller.remove);

module.exports = router;