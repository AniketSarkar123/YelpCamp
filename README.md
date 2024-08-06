This is a web dev project where an user can register,login,logout (supports authentication and authorisation) to:
1. Create campgrounds of his choice across different locations of the world.
2. Can upload images of his preferred campgrounds.
3. Edit his made campgrounds.
4. Delete campground.
5. Review his experience at that place and give a rating.
   The backend server is NodeJS server run on the localhost, for storing the information about campgrounds,user details, and reviews models are made
   in mongoDB, web pages for front-end have been rendered using ExpressJS (FrontEnd is EJS). All the images uploaded by the users are being transferred and
   stored on my Cloudinary Account, which is used to provide a free cloud-based service to store,manupulate and use images, videoes etc. Using this I am updating the images of the
   campgrounds.
