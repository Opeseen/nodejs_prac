const express = require('express');
const { authController, userController } = require('../controllers');
const {loginAuthentication} = require('../middlewares/authentication');

const router = express.Router();

router.get('/',userController.getAllUsers)

router.post('/signup', authController.signUpUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

router.patch('/update/:username',loginAuthentication, userController.updateCurrentUserData);
router.delete('/delete/:username',loginAuthentication, userController.deleteUser);


module.exports = router;