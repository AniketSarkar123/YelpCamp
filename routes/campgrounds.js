const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const catchAsync=require('../utils/catchAsync');
const Campground=require('../model/campground');
const campgrounds=require('../controllers/campgrounds');
const multer=require('multer');
const {storeReturnTo,isLoggedIn,isAuthor}=require('../middlewares');
const {storage}=require('../cloudinary');
const upload=multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'),catchAsync(campgrounds.createCampground));
    /*.post(upload.array("image"),(req,res)=>{
        res.send(req.files);
        console.log(req.body,req.files);
        //res.send('It worked!');
    })*/
router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
      .get(campgrounds.showCampground)
      .put(isLoggedIn,isAuthor,upload.array('image1'),campgrounds.updateCampground)
      .delete(isLoggedIn, campgrounds.deleteCampground );









router.get('/:id/edit',isLoggedIn,isAuthor, campgrounds.editCampground);





module.exports=router;
