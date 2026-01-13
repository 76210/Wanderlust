const User=require("../models/user");

// for signup form render
module.exports.renderSignupForm=(req,res)=>{
 res.render("users/signup.ejs");
};


// for signup routes

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
         const registeredUser=await User.register(newUser,password);
// by sign up user also be login then use fallowing
          console.log(registeredUser);
          req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
              req.flash("success","welcome to wanderlust!");
         res.redirect("/listings");
          })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};
// for login form
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

// after login 
module.exports.login=async(req,res)=>{
  req.flash("success","Welcome back to Wanderlust!");

let redirectUrl=res.locals.redirectUrl||"/listings";
  res.redirect(redirectUrl);
};
// for logout
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
}


// const User = require("../models/user");

// module.exports.renderSignupForm = (req, res) => {
//     res.render("users/signup.ejs");   
// };


// module.exports.signup = async(req, res) => {
//     try{
//    let {username, email, password} = req.body;
//   const newUser =   new User ({email, username});
//   const registerUser = await User.register(newUser, password);
//   console.log(registerUser);
//   req.login(registerUser, (err) =>{
//     if(err) {
//         return next(err);
//     }
//   req.flash("success", "Welcom to wanderlust!");
//   res.redirect("/listings");
//   });
//   } catch(e) {
//     req.flash("error",e.message );
//     res.redirect("/signup");
// }
//     };

//    module.exports.renderLoginForm =  (req, res) => {
//     res.render("users/login.ejs");  
// } 

// module.exports.login = async (req, res) => {
//    req.flash("success", "welcome back to wanderlust");
//    let redirectUrl = req.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);   
//     };

//  module.exports.logout =  (req, res) => {
//     req.logout((err) => { 
//         if(err) {
//         return next(err);
//         }
//         req.flash("success", "you are loged out!");
//         res.redirect("/listings");
//     });
// };


