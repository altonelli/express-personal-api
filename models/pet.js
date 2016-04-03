var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PetSchema = new Schema({
  name: String,
  type: String,
  breed: String,
  location: String
});

var Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;
