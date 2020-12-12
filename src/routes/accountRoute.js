const express = require('express');
const router = express.Router();

const controller = require('../controllers/accountController');
const auth = require('../middlewares/accountAuth'); 

//@route POST account
//@desc Create new account
//@acess Private
//@endpoint http://localhost:port/account/create
router.post('/create', controller.signUp);

//@route POST account
//@desc Account login
//@acess Private
//@endpoint http://localhost:port/account/login
router.post('/login', controller.login);

//@route GET account
//@desc Return account view
//@acess Private
//@endpoint http://localhost:port/account/viewAccount
router.get('/viewAccount', auth.authenticate, controller.viewAccount);

//@route GET account
//@params :username
//@desc Return account by username
//@acess Private
//@endpoint http://localhost:port/account/username/:username
router.get('/username/:username', auth.authenticate, controller.findByName);

//@route GET account
//@params :interest
//@desc Return account by domain knowledge
//@acess Private
//@endpoint http://localhost:port/account/interest/:interest
router.get('/interest/:interest', auth.authenticate, controller.findByDomain);

//@route GET account
//@params :interest :domain
//@desc Return accounts that match with user interests
//@acess Private
//@endpoint http://localhost:port/account/interest/:interest/domain/:domain
router.get('/interest/:interest/domain/:domain', auth.authenticate, controller.match);

//@route PUT account
//desc Update account
//access Private
//@endpoint http://localhost:port/account/edit
router.put('/edit', auth.authenticate, controller.edit);

//@route DELETE account
//desc Delete account
//access Private
//@endpoint http://localhost:port/account/remove
router.delete('/remove', auth.authenticate, controller.remove);


module.exports = router;