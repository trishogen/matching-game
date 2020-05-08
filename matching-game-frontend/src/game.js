class Game {

  constructor(userId) {
    this.userId = userId;

    this.id = null;
    this.cards = [];
    this.timer = new Timer(MAIN);
    this.completionTime = null;
  }

  get unmatchedCards() {
    return this.cards.filter(card => card.matched === 'unmatched');
  }

  get unmatchedVisibleCards() {
    return this.unmatchedCards.filter(card => card.visibility === 'visible')
  }

  get unmatchedHiddenCards() {
    return this.unmatchedCards.filter(card => card.visibility === 'hidden')
  }

  get isWon() {
    let unmatchedCards = this.cards.filter(card => card.matched === 'unmatched');
    return unmatchedCards.length == 0;
  }

  start() {
    let userObj = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        "user_id": this.userId
      })
    };
    return fetch(BASE_URL + '/games', userObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(game) {
        this.id = game.id;
        this.show();
      }.bind(this))
      .catch(function(error) {
        alert("I'm having trouble starting a new game!");
        console.log(error.message);
      });
  }

  show() {
    this.timer.start();

    let div = document.createElement('div');
    div.className = 'game';
    div.id = 'game';
    MAIN.append(div);

    this.loadCards()
  }

  loadCards() {
    Card.getCardsInGame(this.id) // get all the cards in this game instance
    .then(function(cards){
      let shuffledCards = Game.shuffleCards(cards);
      shuffledCards.forEach(card => this.renderCardInGame(card));
    }.bind(this)
    )
  }

  renderCardInGame(card_obj) {
    // instantiates new cards and adds to this game
    let card = new Card(card_obj.id, card_obj.image_id,
      this.checkForMatchesAndWin.bind(this)); // initialize new card
    card.show();
    this.cards.push(card); // keep track of all cards in this game
  }

  checkForMatchesAndWin() {
    this.unmatchedCards.forEach(card => card.disable()); // disable while checking
    if (this.checkForMatches() === false) return

    if (this.isWon){
      this.win()
    } else {
      // enable only hidden cards if not won
      this.unmatchedHiddenCards.forEach(card => card.enable());
    }
  }

  checkForMatches() {
    if (this.unmatchedVisibleCards.length <= 1) return false

    // check if 2 cards are a match
    if (Game.areCardsMatched(this.unmatchedVisibleCards)) {
      Card.setMatchedCards(this.unmatchedVisibleCards);
      return true
    } else {
      this.handleNotMatched();
      return false
    }
  }

  handleNotMatched() {
    setTimeout(() => {
      // if cards are not matched hide them
      this.unmatchedVisibleCards.forEach((card) => card.hide());
      // enable all unmatched cards
      this.unmatchedCards.forEach(card => card.enable());
    }, 500); // wait a half a second so user gets a chance to see the card
  }

  win() {
    this.completionTime = this.timer.stop();
    let formattedTime = this.timer.showTime(this.completionTime);
    this.update();

    new Congratulations().show();
  }

  update() {
    let gameObj = {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        completion_time: this.completionTime
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

  static shuffleCards(cardsArray) {
    let currentIndex = cardsArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cardsArray[currentIndex];
      cardsArray[currentIndex] = cardsArray[randomIndex];
      cardsArray[randomIndex] = temporaryValue;
    }

    return cardsArray;
  }

  static areCardsMatched(cards) {
    if (cards.length != 2) return False
    return cards[0].imgId === cards[1].imgId
  }

}
