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
  getCards(game_id).then(cards => cards.forEach(card => addCardToGame(card)));
}

function getCards(game_id){
  let gameCardsObj = {
    method: "GET",
    headers: HEADERS,
  };

  let game_cards_url = `${BASE_URL}/games/${game_id}/cards`

  return fetch(game_cards_url, gameCardsObj)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      alert("I'm having trouble getting cards for the game!");
      console.log(error.message);
    });
}

function addCardToGame(card){
  new Card(card.id, card.image_id)
}
