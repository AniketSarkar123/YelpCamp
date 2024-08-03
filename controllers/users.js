const User=require('../model/user');

module.exports.userRegister= (req,res)=>{
    res.render('users/register');
}

module.exports.newUserRegister= async(req,res)=>{
    try{
    const {email,username,password}=req.body;
    const user= new User({email,username});
    const registeredUser= await User.register(user,password);
    //console.log(registeredUser);
    req.login(registeredUser,err=>{
        if(err){
            return next(err);
        }

        req.flash('success','Welcome to YelpCamp!');
        res.redirect('/campgrounds');


    })
   
    }

    catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }

}

module.exports.userlogin= (req,res)=>{
    res.render('users/login');
}

module.exports.userlogout= (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}

module.exports.userredirect= (req,res)=>{
    req.flash('success', 'Welcome back!!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);

}