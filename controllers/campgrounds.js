const Campground=require('../model/campground');
module.exports.index=async (req,res)=>{
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
}

module.exports.renderNewForm= (req,res)=>{
    res.render('campgrounds/new');
 }

module.exports.createCampground= async (req,res,next)=>{
    
    const campground=new Campground(req.body.campground);
    campground.author=req.user._id;
    campground.images=req.files.map(f=>({url: f.path, filename: f.filename}));
    await campground.save();
    console.log(campground);
    req.flash('success','Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground= async (req,res)=>{
    const campground=await Campground.findById(req.params.id).populate('reviews').populate('author');
    console.log(campground);
    if(!campground){
        req.flash('error','Campground not found');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground});
}


module.exports.editCampground= async (req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findById(id);
    if(!campground){
        req.flash('error','Campground not found');
        return res.redirect('/campgrounds');
    }

   


    res.render('campgrounds/edit',{campground});
    //await campground.save();

}

module.exports.updateCampground= async (req,res)=>{
    const {id}=req.params;
    /*const campground=await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }*/

    const camp=await Campground.findByIdAndUpdate(id,{...req.body.campground});
    const imgs=req.files.map(f=>({url: f.path, filename: f.filename}));
    camp.images.push(...imgs);
    await camp.save();
    req.flash('success','Successfully edited the campground!');
    res.redirect(`/campgrounds/${camp._id}`);

  
}

module.exports.deleteCampground= async (req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the campground!');
    res.redirect('/campgrounds');
}