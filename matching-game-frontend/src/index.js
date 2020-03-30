const MAIN = document.getElementsByTagName('main')[0];
const BASE_URL = 'http://localhost:3000';
const HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

document.addEventListener("DOMContentLoaded", function(){
  loadSignInForm();
})

function loadSignInForm(){
  let div = document.createElement('div');
  div.className = 'sign-in';

  let form = document.createElement('form');
  form.id = 'username-form';

  let input = document.createElement('input');
  input.id = 'username-input';
  input.type = 'text';
  input.placeholder = 'username';

  let br = document.createElement("br");
  br.className = 'br-big'

  let btn = document.createElement('button');
  btn.type = 'submit';
  btn.innerText = 'Play!'
  btn.addEventListener('click', (e) => {
    signIn(e);
  });

  form.append(input, br, btn);
  div.append(form);
  MAIN.append(div);
}

function signIn(e){
  e.preventDefault();
  let username = document.getElementById('username-input').value;

  let signInObj = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      "username": username
    })
  };

  return fetch(BASE_URL + '/login', signInObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      startNewGame(object.id)
    })
    .catch(function(error) {
      alert("I'm having trouble finding that user!");
      console.log(error.message);
    });
}

function startNewGame(user_id){
  let userObj = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      "user_id": user_id
    })
  };
  return fetch(BASE_URL + '/games', userObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      loadGame(object)
    })
    .catch(function(error) {
      alert("I'm having trouble starting a new game!");
      console.log(error.message);
    });
}

function loadGame(game){
  hideSignIn()
  showTimer()

  let div = document.createElement('div');
  div.className = 'game';

  MAIN.append(div);

  console.log(game)
}

function hideSignIn(){
  let signInDiv = document.getElementsByClassName('sign-in')[0];
  signInDiv.style.display = 'none';
}

function showTimer(){
  let div = document.createElement('div');
  div.className = 'timer';
  let i = 0;
  window.setInterval(function(){div.innerText = formatTime(i++)}, 1000);

  MAIN.append(div);
}

function formatTime(seconds){
  return(seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
}
