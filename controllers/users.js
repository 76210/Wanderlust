/*const User=require("../models/user");

// for signup form render
module.exports.renderSignupForm=(req,res)=>{
 res.render("users/signup.ejs");
};


// for signup routes

module.exports.signup=async(req,res, next)=>{ 
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
}*/ 

const User = require("../models/user");

// ==================
// Render Signup Form
// ==================
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// ==================
// Signup Controller
// ==================
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ username, email });
        await User.register(newUser, password);

        // ❌ No auto login here
        req.flash("success", "Signup successful! Please login.");
        res.redirect("/login");

    } catch (e) {
         console.log("SIGNUP ERROR:", e);  
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

// ==================
// Render Login Form
// ==================
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// ==================
// Login Controller
// ==================
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");

    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// ==================
// Logout Controller
// ==================
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};





