const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError=require("./utils/ExpressError.js");

const {listingSchema,reviewSchema}=require("./schema.js");



module.exports.isLoggedIn=(req,res,next)=>{
  //  console.log(req.path,"..",req.originalUrl);//we want to redirect on this url after login or signup

    if(!req.isAuthenticated()){
req.session.redirectUrl=req.originalUrl;//ise session ke andar save kr lete hi 

  req.flash("error","you must be logged in to create listing");
  return res.redirect("/login");
}
next();
}
// but we know after refresing the session destroye the stra save information then we store it in local variables because passport not allowed to delete it
module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
};

// create middleware for update routes for avoiding to write this code in every routes indivisualy
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
  
    // for checking who update the listings
  let listing=await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","you are not the owner of this listing");
   return res.redirect(`/listings/${id}`)
  }
  next();
};

// put validation here
module.exports. validateListing=(req,res,next)=>{
let {error}=listingSchema.validate(req.body);

if(error){
  throw new ExpressError(400,error);
}else{
  next();
}
};

// validation for review
module.exports. validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.message);
    } else {
        next();
    }
};

// for review 
module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
  
    // for checking who update the listings
  let review=await Review.findById(reviewId);
  if(!review.author._id.equals(res.locals.currUser._id)){
    req.flash("error","you are not the author of this review");
   return res.redirect(`/listings/${id}`)
  }
  next();
};

