class Game {
  constructor(user_id) {
    this.user_id = user_id

    this.id = null;
    this.cards = []
    this.timer = null;
    this.completion_time = null;
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
        this.id = object.id
        this.timer = new Timer(MAIN)
        this.loadGame(object);
      }.bind(this))
      .catch(function(error) {
        alert("I'm having trouble starting a new game!");
        console.log(error.message);
      });
  }

  loadGame(game){
    signInForm.hide()

    let div = document.createElement('div');
    div.className = 'game';
    div.id = 'game';

    MAIN.append(div);

    this.loadCards(game.id)

  }

  loadCards(game_id){
    this.getCards(game_id)
    .then(function(cards){
      this.shuffleCards(cards)
      cards.forEach(card => this.addCardToGame(card))
    }.bind(this)
    )
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

  addCardToGame(card_obj){
    let card = new Card(card_obj.id, card_obj.image_id,
      this.checkForMatches.bind(this))
    card.putCardInUI()
    this.cards.push(card)
  }

  checkForMatches(){
    let visibleCards = this.unmatchedCards('visible');
    let hiddenCards = this.unmatchedCards('hidden')
    let unmatchedCards = visibleCards.concat(hiddenCards)

    unmatchedCards.forEach(card => card.disable());

    if (visibleCards.length > 1) {
      // check if 2 cards are a match
      if (visibleCards[0].imgId === visibleCards[1].imgId){
        // mark matched if they are, but keep disbaled
        visibleCards.forEach(card => {
          card.matched = 'matched'
          card.update()
        })
      } else {
        // if they are not matched enable them and hide them
        setTimeout(() => {
          visibleCards.forEach((card) => {
            card.hide()
          })
          //enable rest of cards
          unmatchedCards.forEach(card => card.enable());
        }, 500);
        return
      }
    } else {
      console.log('less than 2 cards')
    }

    if (this.isGameWon()){
      console.log('won')
      this.completion_time = this.timer.secondsPast();
      this.update();
      // hide game
      // congratulate user in UI
    } else {
    hiddenCards.forEach(card => card.enable());
    }
  }

  unmatchedCards(visibility){
    return this.cards.filter(card => card.visibility === visibility &&
    card.matched === 'unmatched');
  }

  shuffleCards(cards) {
    cards.sort(() => Math.random() - 0.5);
  }

  isGameWon() {
    let unmatchedCads = this.cards.filter(card => card.matched === 'unmatched');
    return unmatchedCads.length == 0;
  }

  update(){
    let gameObj = {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        completion_time: this.completion_time
      })
    };
    let gameUrl = `${BASE_URL}/games/${this.id}`

    return fetch(gameUrl, gameObj)
      .then(function(response) {
        return response.json();
      })
      .catch(function(error) {
        alert("I'm having trouble updating this game!");
        console.log(error.message);
      });
  }
}
