console.log("Sanity Check: JS is working!");
var template;
var $profileList;
var allProfiles = [];

$(document).ready(function(){
  $profileList = $('#profileTarget');
  var source = $('#profile-info').html();
  template = Handlebars.compile(source);

// your code

  $.ajax({
    method: 'GET',
    url: '/api/profiles',
    success: handleSuccess,
    error: handleError
  });

  $('#newHobbieToDo-Form').on("submit", function(event){
    event.preventDefault();
    $.ajax({
      method: 'PUT',
      url: '/api/profiles/:profile/hobbies/:hobbie',
      data: $(this).serialize(),
      success: newToDoSuccess,
      error: newToDoError
    });
  });

});

function render(){
  $profileList.empty();
  var profileHtml = template({ profiles: allProfiles });
  $profileList.append(profileHtml);
}
