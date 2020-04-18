const MAIN = document.getElementsByTagName('main')[0];
const BASE_URL = 'http://localhost:3000';
const HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
const IMG_DIR = "../matching-game-backend/app/assets/images"
let signInForm = undefined;

document.addEventListener("DOMContentLoaded", function(){
  signInForm = new SignInForm(MAIN);
})

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
  signInForm.hide()
  addTimer()

  let div = document.createElement('div');
  div.className = 'game';
  div.id = 'game';

  MAIN.append(div);

  loadCards(game.id)

}

function addTimer(){
  let timer_div = document.createElement('div')
  timer_div.id = 'timer';

  MAIN.append(timer_div)

  new Timer('timer')
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
