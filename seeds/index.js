const mongoose=require('mongoose');
const cities=require('./cities');
const Campground=require('../model/campground');
const {places,descriptors}=require('./seedhelpers');
//const Product=require('./models/product');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db=mongoose.connection;
db.on("error",console.error.bind(console,'connection-error'));
db.once("open",()=>{
    console.log("Connected to database");
});

const sample=(array)=>array[Math.floor(Math.random()*array.length)];


const seedDB=async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const rand=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        
        const camp=new Campground({
            author: '667ae1e6daebc489c4e16029',
            location: `${cities[rand].city},${cities[rand].state}`,
            title: `${sample(descriptors)},${sample(places)}`,
           
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tenetur deleniti ullam maxime! Vitae, laudantium quia quae dolorem est rerum dolore rem maxime officiis aspernatur.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dfoj6ol1j/image/upload/v1720843300/YelpCamp/zylihog3tfc7tzsfggme.jpg',
                    filename: 'YelpCamp/zylihog3tfc7tzsfggme'
                },
                {
                    url: 'https://res.cloudinary.com/dfoj6ol1j/image/upload/v1720843300/YelpCamp/fslfe0laytq0kbur0wwy.jpg',
                    filename: 'YelpCamp/fslfe0laytq0kbur0wwy'
                }
            ]
        });
        await camp.save();
    }
    
}

seedDB();