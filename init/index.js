const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connection sucesss")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB=async ()=>{
    await Listing.deleteMany({});
// insert owner in every object without changing original array
initData.data=initData.data.map((obj)=>({...obj,owner:"68dfbe1cda222719ec9e6bd1"}));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();

// const mongoose = require("mongoose");
// const initData = require("./data.js");

// const Listing = require("./models/listing.js");
// //const Listing = require('../models/listing');

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
// .then(() => {
//     console.log("connected to DB");
// })
// .catch((err) => {
//     console.log(err);
// });
// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     await Listing.deleteMany({});
//    initData.data =  initData.data.map((obj) => ({
//     ...obj, 
//      owner:"652d0081ae547c5d37e56b5f"})); 
//    await Listing.insertMany(initData.data);
//    console.log("data was initialized");  

// };
// initDB();














// /*const mongoose = require("mongoose");
// const data = require("./data.js");
// const Listing = require("./models/listings.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main() 
// .then(() => {
//     console.log("connected to DB");
// })
// .catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () {
//     await mongoose.connect(MONGO_URL);
// }

// const iniDB = async () => {
//     await Listing.deletMany({});
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// };

// initDB();*/