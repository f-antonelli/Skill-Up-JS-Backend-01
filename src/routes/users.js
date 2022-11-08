const express = require('express');

const router = express.Router();

// CONTROLLERS
const { create, get, getById, getByEmail, edit, remove, block, unblock, resetpassword } = require('../controllers/users');
// MIDDLEWARES
const emailIsUnique = require('../middlewares/emalIsUnique');
const emailIsValid = require('../middlewares/emailIsValid');
const firstNameIsValid = require('../middlewares/firstNameIsValid');
const lastNameIsValid = require('../middlewares/lastNameIsValid');
const checkUserId = require('../middlewares/checkUserId');
const checkUserEmail = require('../middlewares/checkUserEmail');
const passwordIdValid = require('../middlewares/passwordIsValid');
const tokenIsValid = require('../middlewares/tokenIsValid');
const isAdmin = require('../middlewares/isAdmin');
const userHasAccess = require('../middlewares/userHasAccess');

// Example: http://localhost:3000/users - Need a valid token!
router.get('/', [tokenIsValid], get);

// Example: http://localhost:3000/users/1 - Need a valid token! - Need a extUser or admin token!
router.get('/:id', [tokenIsValid, checkUserId], getById);

// Example: http://localhost:3000/users/email/ext@usr.com - Need a valid token!
router.get('/email/:email', [tokenIsValid, checkUserEmail], getByEmail);

// Example: http://localhost:3000/users/email/ext@usr.com - Need a valid token!
router.post('/', [firstNameIsValid, lastNameIsValid, passwordIdValid, emailIsValid, emailIsUnique], create);

router.put('/:id', [tokenIsValid, userHasAccess, firstNameIsValid, lastNameIsValid, passwordIdValid, checkUserId], edit);

// Example: http://localhost:3000/users/1 - Need a valid token! - Need a extUser or admin token!
router.delete('/:id', [tokenIsValid, isAdmin, checkUserId], remove);

// Example: http://localhost:3000/users/block/1 - Need a valid token! - Need a extUser or admin token!
router.patch('/block/:id', [tokenIsValid, isAdmin, checkUserId], block);

// Example: http://localhost:3000/users/block/1 - Need a valid token! - Need a extUser or admin token!
router.patch('/unblock/:id', [tokenIsValid, isAdmin, checkUserId], unblock);

// Example: http://localhost:3000/users/block/1 - Need a valid token! - Need a extUser or admin token!
router.patch('/resetPassword/:id', [tokenIsValid, isAdmin, checkUserId], resetpassword);

module.exports = router;
