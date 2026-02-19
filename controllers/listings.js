const Listing = require("../models/listing");
const geocoder = require('../utils/geocoder');

// INDEX - Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// NEW - Render form to create new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// SHOW - Show single listing
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id)
            .populate("owner") // populate owner
            .populate({
                path: "reviews",
                populate: { path: "author" }
            });

        if (!listing) {
            req.flash("error", "Listing you requested for does not exist");
            return res.redirect("/listings");
        }

        // Safety fallback agar owner missing ho
        if (!listing.owner) {
            listing.owner = { username: "Unknown" };
        }

        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};

// CREATE - Add new listing
module.exports.createListing = async (req, res) => { 
    try {  
        const { title, description, price, location } = req.body.listing;
        const geoData = await geocoder.geocode(location);
        const latitude = geoData[0]?.latitude || 28.6139; // default Delhi
        const longitude = geoData[0]?.longitude || 77.2090;

        const newListing = new Listing({
            title, 
            description,
            price,
            location,
            latitude,
            longitude,
            owner: req.user._id
        });

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await newListing.save();
        req.flash('success', 'Successfully created a new listing!');
        res.redirect('/listings'); 
    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong while creating the listing!');
        res.redirect('/listings');
    }
};

// EDIT - Render edit form
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image?.url?.replace("/upload", "/upload/h_300,w_250") || "";
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// UPDATE - Update listing
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body.listing;

    const listing = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        price,
        location,
        country
    });

    if (location) {
        const geoData = await geocoder.geocode(location);
        listing.latitude = geoData[0]?.latitude || listing.latitude;
        listing.longitude = geoData[0]?.longitude || listing.longitude;
    }

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
};

// DELETE - Remove listing
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
