var ref = new Firebase('https://blinding-inferno-7599.firebaseio.com/');


var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var latlon = position.coords.latitude + "," + position.coords.longitude;

  var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
  +latlon+"&zoom=16&size=400x300&sensor=false";
  document.getElementById("map").innerHTML = "<img src='"+img_url+"'>";
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

/* Triggers login attempt with name, text.
 * NOTE: it only prints messages now
 *   
*/
$('#loginButton').click(function () {
  var authData = ref.getAuth();
  var email = $('#loginEmailInput').val();
  var password = $('#loginPassInput').val();
  ref.authWithPassword({
    email   : email,
    password: password
  }, authHandler);
  $('#loginPassInput').val('');
});

/* Creates a new user given 
*/
$('#signUpButton').click(function() {
  var email = $('#emailInput').val();
  var password = $('#passwordInput1').val();
  var confirm_password = $('#passwordInput2').val();
  if (password != confirm_password){
    console.log("Password does not match");
  } else {
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  }
  $('#passwordInput1').val('');
  $('#passwordInput2').val('');
});
/*
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});
*/
function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
/* Handler to check authentication 
*/
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}