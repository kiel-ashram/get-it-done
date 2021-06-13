// var getUserRepos = function() {
//     console.log("function was called");
//   };
  
//   getUserRepos();

// var getUserRepos = function() {
//     fetch("https://api.github.com/users/octocat/repos");
//   };

// var response = fetch("https://api.github.com/users/octocat/repos");
//   console.log(response);

// fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//   console.log("inside", response);
// });
  
// console.log("outside");

// fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//   response.json().then(function(data) {
//     console.log(data);
//   });
// });

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
  event.preventDefault();
  console.log(event);
};

var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fresponse.json().then(function(data) {
    displayRepos(data, user);
    });
};

var displayRepos = function(repos, searchTerm) {
  console.log(repos);
  console.log(searchTerm);
};

getUserRepos("kiel-ashram")

userFormEl.addEventListener("submit", formSubmitHandler);