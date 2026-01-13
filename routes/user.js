const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const User=require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");
const user = require("../models/user.js");


router.get("/signup",userController.renderSignupForm
);

router.post("/signup",wrapAsync(userController.signup
));


// for login page
router.get("/login",userController.renderLoginForm
);

// post request for matching existing data you go to passport website 
// failureFlash:true,  this use if useer entered wrong
// ,passport.authenticate("local",{failureRedirect:"/login"    use for checking
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),
userController.login
);



// routes for log out
router.get("/logout",userController.logout
);

module.exports=router;
