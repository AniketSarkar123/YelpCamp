const express=require('express');
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const User=require('../model/user');
const passport=require('passport');
const users=require('../controllers/users.js')
const { storeReturnTo } = require('../middlewares.js');

router.route('/register')
      .get(users.userRegister)
      .post(catchAsync(users.newUserRegister))


router.route('/login')
      .get(users.userlogin)
      .post(storeReturnTo, passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}), users.userredirect)


router.get('/logout', users.userlogout); 



module.exports=router;