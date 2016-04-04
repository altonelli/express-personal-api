console.log("Sanity Check: JS is working!");
var template;
var $profileList;
var allProfiles = [];

$(document).ready(function(){
  $profileList = $('#profileTarget');
  var source = $('#profile-info').html();
  template = Handlebars.compile(source);
  // debugger;

// your code

  $.ajax({
    method: 'GET',
    url: '/api/profiles',
    success: handleSuccess,
    error: handleError
  });

  $("#profileTarget").on("submit", "#addHobbie", function(e){
    // console.log("this",$(this));
    e.preventDefault();
    var hobbieId = $(this)[0].dataset.hobbie;
    var profileId = $(this)[0].parentElement.parentElement.firstElementChild.firstElementChild.lastChild.dataset.profile;
    $.ajax({
      method: 'POST',
      url: '/api/profiles/' + profileId + '/hobbies/' + hobbieId,
      data: $(this).serialize(),
      success: newToDoSuccess,
      error: newToDoError
    });
  });

  $("#profileTarget").on("click", ".upVote", function(e){
    console.log("this",$(this));
    e.preventDefault();
    var todoId = $(this)[0].dataset.count;
    var hobbieId = $(this)[0].parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.dataset.hobbie;
    var profileId = $(this)[0].parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.childNodes[0].childNodes[1].dataset.profile;
    // console.log(todoId);
    // console.log(hobbieId);
    // console.log(profileId);
    $.ajax({
      method: 'PUT',
      url: '/api/profiles/' + profileId + '/hobbies/' + hobbieId + '/todos/' + todoId,
      data: {
        count: 1,
      },
      success: plusToDoSuccess,
      error: plusToDoError
    });
  });

  $("#profileTarget").on("click", ".downVote", function(e){
    console.log("this",$(this));
    e.preventDefault();
    var todoId = $(this)[0].dataset.count;
    var hobbieId = $(this)[0].parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.dataset.hobbie;
    var profileId = $(this)[0].parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.childNodes[0].childNodes[1].dataset.profile;
    // console.log(todoId);
    // console.log(hobbieId);
    // console.log(profileId);
    $.ajax({
      method: 'PUT',
      url: '/api/profiles/' + profileId + '/hobbies/' + hobbieId + '/todos/' + todoId,
      data: {
        count: -1,
      },
      success: minusToDoSuccess,
      error: minusToDoError
    });
  });


});

function render(){
  $profileList.empty();
  var profileHtml = template({ profiles: allProfiles });
  $profileList.append(profileHtml);
}

function handleSuccess(json){
  // console.log(json);
  allProfiles = json;
  render();
}

function handleError(){
  console.log("handleError");
}

function newToDoSuccess(json){
  // console.log(json);
  allProfiles = json;
  render();
}

function newToDoError(){
  console.log("error on post");
}

function plusToDoSuccess(json){
  // console.log(json);
  allProfiles = json;
  render();
}

function plusToDoError(){
  console.log("error on post");
}

function minusToDoSuccess(json){
  // console.log(json);
  allProfiles = json;
  render();
}

function minusToDoError(){
  console.log("error on post");
}
