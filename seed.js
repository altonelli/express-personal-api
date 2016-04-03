// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var family_list = [
  {
    name: 'Tom Tonelli',
    relationship: 'Father',
    age: 55,
    occupation: 'Carpenter',
    isAwake: function(){
      var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
      if (hour > 6 && hour < 22){
        return true;
      } else {
        return false;
      }
    }
  },
  {
    name: 'Karen Tonelli',
    relationship: 'Mother',
    age: 55,
    occupation: 'Business Owner',
    isAwake: function(){
      var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
      if (hour > 6 && hour < 22){
        return true;
      } else {
        return false;
      }
    }
  },
  {
    name: 'Alyssa Tonelli',
    relationship: 'Sister',
    age: 29,
    occupation: 'Doctor',
    isAwake: function(){
      var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
      if (hour > 3 && hour < 19){
        return true;
      } else {
        return false;
      }
    }
  },
  {
    name: 'Marlena Tonelli',
    relationship: 'Sister',
    age: 55,
    occupation: 'Carpenter',
    isAwake: false
  },
  {
    name: 'Maria Tonelli',
    relationship: 'Sister',
    age: 22,
    occupation: 'Designer',
    isAwake: function(){
      var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
      if (hour > 5 && hour < 20){
        return true;
      } else {
        return false;
      }
    }
  },
];

var pet_list = [
  {
    name: 'Matty',
    type: 'dog',
    breed: 'St. Bernard',
    location: 'Orange County'
  },
  {
    name: 'Cat',
    type: 'cat',
    breed: 'stray',
    location: 'Orange County'
  },
  {
    name: 'Puffball',
    type: 'cat',
    breed: 'Norweigen Forest Cat',
    location: 'Berkeley'
  },
];

var hobbieList = [
  {
    name: 'Triathlon',
    years_active: 6,
    favorites:['Escape from Alcatraz', 'Wildflower','MTS'],
    todo: ['Australia']
  },
  {
    name: 'Baking',
    years_active: 3,
    favorites:['Nutelli cookies', 'apple pie'],
    todo: ['Cheesecake']
  },
];


// db.FamilyMember.create(family_list, function(err,familyMembers){
//   if(err){
//     console.log("err eith family",err);
//   } else {
//     console.log("created", familyMembers.length, "family memebers");
//   }
// });
//
// db.Pet.create(pet_list, function(err,pets){
//   if (err){
//     console.log("err with pets",err);
//   } else {
//     console.log("created",pets.length,"pets");
//   }
// });
db.FamilyMember.remove({},function(err,fam){
  console.log("removed family", fam);
});
db.Pet.remove({},function(err,pets){
  console.log("removed family",pets);
});
db.Profile.remove({},function(err,profile){
  console.log("removed profile",profile);
});

var newProfile = {
  name: 'Arthur Tonelli',
  github_link: "https://github.com/altonelli",
  github_profile_image: "https://avatars0.githubusercontent.com/u/8797855?v=3&s=400",
  current_city: 'Berkeley',
  age: 24,
  description: 'I am  a web develop who love triathlon and baking',
  isAwake: function(){
    var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
    if (hour > 6 && hour < 23){
      return true;
    } else {
      return false;
    }
  },
  isHungry: function(){
    var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
    if ((hour > 12 && hour < 13) || (hour > 18 && hour < 19)){
      return true;
    } else {
      return false;
    }
  },
  familyMembers: [],
  pets: [],
  hobbies: [],
};

db.Profile.create(newProfile, function(err,profile){
  if(err){
    console.log("err with profile create", err);
  } else {

    db.FamilyMember.create(family_list, function(err,FamilyMembers){
      if(err){
        console.log("err eith family",err);
      } else {
        console.log("created", FamilyMembers.length, "family memebers");
        FamilyMembers.forEach(function(el){
          profile.familyMembers.push(el);
        });
        console.log(profile.familyMembers);
      }
      profile.save();
    });


    db.Pet.create(pet_list, function(err,Pets){
      if (err){
        console.log("err with pets",err);
      } else {
        console.log("created",Pets.length,"pets");
        Pets.forEach(function(el){
          profile.pets.push(el);
        });
        console.log(profile.pets);
      }
      profile.save();
    });

    hobbieList.forEach(function(el){
      profile.hobbies.push(el);
      console.log(profile.hobbies);
    });


    console.log(profile);
  }
});
