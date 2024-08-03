const express=require('express');
const router=express.Router({mergeParams: true});
const mongoose=require('mongoose');
const catchAsync=require('../utils/catchAsync');
const Campground=require('../model/campground');
const reviews=require('../controllers/reviews');
const Review=require('../model/reviews');
const {storeReturnTo,isLoggedIn,isAuthor}=require('../middlewares');

router.post('/',isLoggedIn,catchAsync(reviews.createReview));

router.delete('/:reviewId',catchAsync(reviews.deleteReview));

module.exports=router;