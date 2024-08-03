const Campground=require('./model/campground');
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn=(req,res,next)=>{
    //console.log('REQ.USER...',req.user);
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl;
        req.flash('error',"You must be logged in to create a campground");
        return res.redirect('/login');
        //res.send('ERROR!')
    }

    next();
}

module.exports.isAuthor=async (req,res,next)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }

    next();
}


