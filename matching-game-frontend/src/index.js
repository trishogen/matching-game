const MAIN = document.getElementsByTagName('main')[0];
const BASE_URL = 'http://localhost:3000';
const HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
const IMG_DIR = "../matching-game-backend/app/assets/images"

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
      return startNewGame(object.id)
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
      return loadGame(object);
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
  div.id = 'game';

  MAIN.append(div);

  loadCards(game.id)

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

function loadCards(game_id){
  getGameCards(game_id).then(cards => cards.forEach(card => addCardToGame(card)));
}

function getGameCards(game_id){
  let gameCardObj = {
    method: "GET",
    headers: HEADERS,
  };

  let game_card_url = `${BASE_URL}/games/${game_id}/game_cards`

  return fetch(game_card_url, gameCardObj)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      alert("I'm having trouble getting cards for the game!");
      console.log(error.message);
    });
}

function addCardToGame(gameCard){
  getCard(gameCard.card_id)
  .then(function(object){
    addCardImage(object)
  })
}

function getCard(card_id){
  let cardObj = {
    method: "GET",
    headers: HEADERS,
  };

  let card_url = `${BASE_URL}/cards/${card_id}`

  return fetch(card_url, cardObj)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      alert("I'm having trouble getting a specific card!");
      console.log(error.message);
    });
}

function addCardImage(card){
  const game = document.getElementById('game')

  let div = document.createElement('div');
  div.className = 'card not-visable'; //set this from gameCard

  let img = document.createElement('img');
  img.className = 'card-img';
  img.src = `${IMG_DIR}/${card.name}.png`;
  div.append(img)
  game.append(div)
}
