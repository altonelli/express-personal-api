var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "https://cherry-surprise-94350.herokuapp.com/");

// module.exports.Campsite = require("./campsite.js.example");
