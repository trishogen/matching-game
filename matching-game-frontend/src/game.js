class Game {
  constructor(user_id) {
    this.user_id = user_id

    this.startNewGame()
  }

  startNewGame(){
    let userObj = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        "user_id": this.user_id
      })
    };
    return fetch(BASE_URL + '/games', userObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        return this.loadGame(object);
      }.bind(this))
      .catch(function(error) {
        alert("I'm having trouble starting a new game!");
        console.log(error.message);
      });
  }

  loadGame(game){
    signInForm.hide()
    addTimer()

    let div = document.createElement('div');
    div.className = 'game';
    div.id = 'game';

    MAIN.append(div);

    this.loadCards(game.id)

  }

  loadCards(game_id){
    this.getCards(game_id).then(cards => cards.forEach(card => this.addCardToGame(card)));
  }

  getCards(game_id){
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

  addCardToGame(card){
    new Card(card.id, card.image_id)
  }
}
