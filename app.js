if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}
console.log(process.env.SECRET);
express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const ejsmate=require('ejs-mate');
const Campground=require('./model/campground');
const catchAsync=require('./utils/catchAsync');
const Review=require('./model/reviews');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./model/user')


const userroutes=require('./routes/user');
const campgrounds=require('./routes/campgrounds');
const reviews=require('./routes/reviews');
//const Product=require('./models/product');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db=mongoose.connection;
db.on("error",console.error.bind(console,'connection-error'));
db.once("open",()=>{
    console.log("Connected to database");
})


app.engine('ejs',ejsmate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const sessionConfig={
    secret: 'thisshouldbesecret!',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now()+ 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.currentuser=req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();

});



app.get('/fakeuser', async(req,res)=>{
    const user=new User({email: 'aniket@gmail.com', username: 'aniket'});
    const newUser=await User.register(user,'aniket@123');
    res.send(newUser);
});

app.use('/',userroutes);
app.use('/campgrounds',campgrounds);
app.use('/campgrounds/:id/reviews',reviews);
app.use(express.static(path.join(__dirname,'public')));




app.get('/',(req,res)=>{
   res.render('home');
});

app.get('/makecampground',async (req,res)=>{
    const camp=new Campground({title: 'My BackYard'});
    await camp.save();
    res.send(camp);
    console.log(camp);
})








app.listen(3000,()=>{
    console.log('Server started on port 3000!!');
});


