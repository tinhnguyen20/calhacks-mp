var ref = new Firebase('https://blinding-inferno-7599.firebaseio.com/');
​
/* Triggers login attempt with name, text.
 * NOTE: it only prints messages now
 *   
*/
$('#loginButton').click(function () {
  var authData = ref.getAuth();
  var email = $('#loginEmailInput').val();
  var password = $('#loginPassInput').val();
​
  ref.authWithPassword({
    email   : email,
    password: password
  }, authHandler);
  $('#loginPassInput').val('');
});
​
/* Creates a new user given 
*/
$('#signUpButton').click(function() {
  var email = $('#emailInput').val();
  var password = $('#passwordInput1').val();
  var confirm_password = $('#passwordInput2').val();
​
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
​
/*
myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});
*/
​
function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
​
/* Handler to check authentication 
*/
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}
​