// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/************
 * DATABASE *
 ************/

 var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api/profiles', function(req,res){
  db.Profile.find().populate('familyMembers').populate('pets')
    .exec(function(err,profile){
      if(err){
        res.json(500, "Error on our end during serach.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find any profiles.");
      } else {
        var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
        if ((hour > 12 && hour < 13) || (hour > 18 && hour < 19)){
          profile[0].isHungry = true;
        } else {
          profile[0].isHungry = false;
        }
        if (hour > 6 && hour < 23){
          profile[0].isAwake = true;
        } else {
          profile[0].isAwake = false;
        }
        res.json(200,profile);
      }
    });
});

app.get('/api/profiles/:profile', function(req,res){
  db.Profile.find({ _id: req.params.profile}).populate('familyMembers').populate('pets')
    .exec(function(err,profile){
      if(err){
        res.json(500, "Error on our end during serach.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
          var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
          if ((hour > 12 && hour < 13) || (hour > 18 && hour < 19)){
            profile[0].isHungry = true;
          } else {
            profile[0].isHungry = false;
          }
          if (hour > 6 && hour < 23){
            profile[0].isAwake = true;
          } else {
            profile[0].isAwake = false;
          }
        res.json(200,profile);
      }
    });
});

app.get('/api/profiles/:profile/family-members', function(req,res){
  db.Profile.find({ _id: req.params.profile}).populate('familyMembers')
    .exec(function(err,profile){
      var familyMembers = profile.familyMembers;
      if(err){
        res.json(500, "Error on our end during serach.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
        res.json(200,familyMembers);
      }
    });
});

app.get('/api/profiles/:profile/family-members/:familymember', function(req,res){
  db.Profile.find({ _id: req.params.profile }).populate('familyMembers')
    .exec(function(err,profile){
      if(err){
        res.json(500, "Error on our end during search for profile.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
        profile.familyMembers.find({ _id: req.params.familymember})
        .exec(function(err,familyMember){
          if(err){
            res.json(500, "Error on our end during search for family member.");
          } else if (!familyMember) {
            res.json( 400, "Sorry, could not find that family member.");
          } else {
            res.json(200,familyMember);
          }
        });
      }
    });
});

app.get('/api/profiles/:profile/pets', function(req,res){
  db.Profile.find({ _id: req.params.profile}).populate('pets')
    .exec(function(err,profile){
      var pets = profile.pets;
      if(err){
        res.json(500, "Error on our end during serach.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
        res.json(200,pets);
      }
    });
});

app.get('/api/profiles/:profile/pets/:pet', function(req,res){
  db.Profile.find({ _id: req.params.profile }).populate('pets')
    .exec(function(err,profile){
      if(err){
        res.json(500, "Error on our end during search for profile.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
        profile.pets.find({ _id: req.params.pet})
        .exec(function(err,pet){
          if(err){
            res.json(500, "Error on our end during search for pet.");
          } else if (!pet) {
            res.json( 400, "Sorry, could not find that pet.");
          } else {
            res.json(200,pet);
          }
        });
      }
    });
});

app.get('/api/profiles/:profile/hobbies', function(req,res){
  db.Profile.find({ _id: req.params.profile}).populate('familyMembers').populate('pets')
    .exec(function(err,profile){
      if(err){
        res.json(500, "Error on our end during search.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
        var hobbies = profile.hobbies;
        res.json(200,hobbies);
      }
    });
});

app.get('/api/profiles/:profile/hobbies/:hobbie', function(req,res){
  db.Profile.find({ _id: req.params.profile }).populate('familyMembers').populate('pets')
    .exec(function(err,profile){
      if(err){
        res.json(500, "Error on our end during search for profile.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
        profile.hobbies.find({ _id: req.params.hobbie})
        .exec(function(err,hobbie){
          if(err){
            res.json(500, "Error on our end during search for hobbies.");
          } else if (!hobbie) {
            res.json( 400, "Sorry, could not find that hobbie.");
          } else {
            res.json(200,hobbie);
          }
        });
      }
    });
});

app.post('/api/profiles/:profile/hobbies/:hobbie', function(req,res){
  // console.log(req.params.profile);
  // console.log(req.params.hobbie);
  db.Profile.find({ _id: req.params.profile }).populate('familyMembers').populate('pets')
    .exec(function(err,profile){
      if(err){
        res.json(500, "Error on our end during search for profile.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
        // console.log(profile);
        // console.log(profile[0].hobbies[0].todo);
        profile[0].hobbies.forEach(function(el){
          // console.log(el._id);
          // console.log(req.params.hobbie);
          if(el._id.toString() === req.params.hobbie.toString()){
            // console.log("inif");
            var newTodo = {
              name: req.body.hobbie,
              count: 1
            };
            el.todo.push(newTodo);
            // console.log(newTodo);
          }
        });
      profile[0].save();
      var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
      if ((hour > 12 && hour < 13) || (hour > 18 && hour < 19)){
        profile[0].isHungry = true;
      } else {
        profile[0].isHungry = false;
      }
      if (hour > 6 && hour < 23){
        profile[0].isAwake = true;
      } else {
        profile[0].isAwake = false;
      }
      res.json(200,profile);
      }
    });
});

app.put('/api/profiles/:profile/hobbies/:hobbie/todos/:todo', function(req,res){
  console.log(req.body.count);
  db.Profile.find({ _id: req.params.profile }).populate('familyMembers').populate('pets')
    .exec(function(err,profile){
      if(err){
        res.json(500, "Error on our end during search for profile.");
      } else if (!profile) {
        res.json( 400, "Sorry, could not find that profile.");
      } else {
        // console.log(profile);
        // console.log(profile[0].hobbies[0].todo);
        profile[0].hobbies.forEach(function(hobbieElement){
          // console.log(hobbieElement._id);
          // console.log(req.params.hobbie);
          if(hobbieElement._id.toString() === req.params.hobbie.toString()){
            // console.log(hobbieElement.todo);
            hobbieElement.todo.forEach(function(todoElement){
              // console.log(todoElement);
              if(todoElement._id.toString() === req.params.todo.toString()){
                todoElement.count += parseInt(req.body.count);
                // console.log(todoElement.count);
                // console.log(profile);
              }
            });
          }
        });
        profile[0].save();
        var hour = parseInt((new Date()).toString().split(" ")[4].slice(0,2));
        if ((hour > 12 && hour < 13) || (hour > 18 && hour < 19)){
          profile[0].isHungry = true;
        } else {
          profile[0].isHungry = false;
        }
        if (hour > 6 && hour < 23){
          profile[0].isAwake = true;
        } else {
          profile[0].isAwake = false;
        }
        res.json(200,profile);
      }
    });
});



app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    base_url: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profiles", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/profiles/:profile/family-members/:familymember", description: "Data on one of my family members"},
      {method: "GET", path: "/api/profiles/:profile/pets", description: "Data of all my pets"},
      {method: "GET", path: "/api/profiles/:profile/pets/:pet", description: "Data on one of my pets"},
      {method: "GET", path: "/api/profiles/:profile/hobbies", description: "Data of all my hobbies"},
      {method: "GET", path: "/api/profiles/:profile/hobbies/:hobbie", description: "Data on one of my hobbies"},
      {method: "POST", path: "/api/profiles/:profile/hobbies/:hobbie", description: "Add a 'todo' to one of my hobbies"},
      {method: "PUT", path: "/api/profiles/:profile/hobbies/:hobbie/todos/:todo", description: "Up Vote or Down Vote a 'todo' to one of my hobbies"}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
 app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
