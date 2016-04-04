var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "https://cherry-surprise-94350.herokuapp.com/");
// mongoose.connect( process.env.MONGOLAB_URI ||
//                   process.env.MONGOHQ_URL ||
//                   "mongodb://localhost/personal-api");


module.exports.Profile = require("./profile.js");
module.exports.FamilyMember = require("./familyMember.js");
module.exports.Pet = require("./pet.js");
