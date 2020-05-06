class Game {
  constructor(user_id) {
    this.user_id = user_id

    this.id = null;
    this.cards = []
    this.timer = new Timer(MAIN)
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
        this.timer.start()
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
      let shuffledCards = this.shuffleArray(cards)
      shuffledCards.forEach(card => this.addCardToGame(card))
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
      this.checkForMatchesAndWin.bind(this));
    card.show();
    this.cards.push(card);
  }

  checkForMatchesAndWin(){
    let visibleCards = this.unmatchedCards('visible');
    let hiddenCards = this.unmatchedCards('hidden');
    let allUnmatchedCards = visibleCards.concat(hiddenCards);

    allUnmatchedCards.forEach(card => card.disable());

    let status = this.checkForMatches(visibleCards, allUnmatchedCards);

    if (status == 'notmatched') {
      return
    }

    if (this.isWon()){
      this.won()
    } else {
      hiddenCards.forEach(card => card.enable());
    }
  }

  checkForMatches(visibleCards, allUnmatchedCards){
    if (visibleCards.length > 1) {
      // check if 2 cards are a match
      if (visibleCards[0].imgId === visibleCards[1].imgId){
        this.matched(visibleCards)
        return 'matched'
      } else {
        this.notMatched(visibleCards, allUnmatchedCards)
        return 'notmatched'
      }
    }
  }

  matched(visibleCards){
    // mark matched if they are, but keep disbaled
    visibleCards.forEach(card => {
      card.matched = 'matched'
      card.update()
    })
  }

  notMatched(visibleCards, unmatchedCards) {
    // if cards are not matched hide them
    setTimeout(() => {
      visibleCards.forEach((card) => {
        card.hide()
      })
      //enable rest of cards
      unmatchedCards.forEach(card => card.enable());
    }, 500);
  }

  unmatchedCards(visibility){
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

  isWon() {
    let unmatchedCards = this.cards.filter(card => card.matched === 'unmatched');
    return unmatchedCards.length == 0;
  }

  won() {
    this.completion_time = this.timer.stop();
    let formattedTime = this.timer.showTime(this.completion_time)
    this.update();
    new Congratulations().show()
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
