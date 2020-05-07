class Game {

  constructor(user_id) {
    this.user_id = user_id;

    this.id = null;
    this.cards = [];
    this.timer = new Timer(MAIN);
    this.completion_time = null;
  }

  start() {
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
      let shuffledCards = this.shuffleArray(cards);
      shuffledCards.forEach(card => this.addCardToGame(card));
    }.bind(this)
    )
  }

  addCardToGame(card_obj) {
    // instantiates new cards and adds to this game
    let card = new Card(card_obj.id, card_obj.image_id,
      this.checkForMatchesAndWin.bind(this)); // initialize new card
    card.show();
    this.cards.push(card); // keep track of all cards in this game
  }

  checkForMatchesAndWin() {
    let visibleCards = this.unmatchedCards('visible');
    let hiddenCards = this.unmatchedCards('hidden');
    let allUnmatchedCards = visibleCards.concat(hiddenCards);

    let isSetMatched = this.checkForMatches(visibleCards, allUnmatchedCards);
    if (isSetMatched === false) {
      return
    }

    // enable only hidden cards if not won
    this.isWon ? this.win() : hiddenCards.forEach(card => card.enable());
  }

  checkForMatches(visibleCards, allUnmatchedCards) {
    allUnmatchedCards.forEach(card => card.disable()); // disable while checking

    if (visibleCards.length > 1) {
      // check if 2 cards are a match
      if (Card.areCardsMatched(visibleCards[0], visibleCards[1])) {
        this.matched(visibleCards);
        return true
      } else {
        this.notMatched(visibleCards, allUnmatchedCards)
        return false
      }
    }
  }

  matched(visibleCards) {
    // mark matched if they are, but keep cards disabled so they can't be flipped
    visibleCards.forEach(card => {
      card.matched = 'matched';
      card.update();
    })
  }

  notMatched(visibleCards, unmatchedCards) {
    setTimeout(() => {
      // if cards are not matched hide them
      visibleCards.forEach((card) => card.hide());
      // enable all unmatched cards
      unmatchedCards.forEach(card => card.enable());
    }, 500); // wait a half a second so user gets a chance to see the card
  }

  unmatchedCards(visibility) {
    return this.cards.filter(card => card.visibility === visibility &&
    card.matched === 'unmatched');
  }

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  get isWon() {
    let unmatchedCards = this.cards.filter(card => card.matched === 'unmatched');
    return unmatchedCards.length == 0;
  }

  win() {
    this.completion_time = this.timer.stop();
    let formattedTime = this.timer.showTime(this.completion_time);
    this.update();

    new Congratulations().show();
  }

  update() {
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
