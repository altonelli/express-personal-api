var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  FamilyMember = require('./familyMember.js');
  Pet = require('./pet.js');

var TodoSchema = new Schema({
  name: String,
  count: Number
});


var HobbieSchema = new Schema({
  name: String,
  years_active: Number,
  favorites:[String],
  todo: [TodoSchema]
});


var ProfileSchema = new Schema({
  name: String,
  github_link: String,
  github_profile_image: String,
  current_city: String,
  age: Number,
  description: String,
  isAwake: Boolean,
  isHungry: Boolean,
  familyMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'FamilyMember'
  }],
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  hobbies: [HobbieSchema],
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
