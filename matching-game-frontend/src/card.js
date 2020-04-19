class Card {

  constructor(cardId) {
    this.id = cardId;
    this.name = undefined;
    this.visibility = 'hidden'; // all cards start out hidden


    this.getCard()
    .then(function(object){
      this.render()}.bind(this)
    )
  }

  getCard() {
    let cardObj = {
      method: "GET",
      headers: HEADERS,
    };

    let cardUrl = `${BASE_URL}/cards/${this.id}`

    return fetch(cardUrl, cardObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        return this.setName(object);
      }.bind(this))
      .catch(function(error) {
        alert("I'm having trouble getting a specific card!");
        console.log(error.message);
      });
  }

  setName(card) {
    this.name = card.name;
  }

  render() {
    const game = document.getElementById('game')

    let div = document.createElement('div');
    div.className = `card ${this.visibility}`;

    let img = document.createElement('img');
    img.className = 'card-img';
    img.src = `${IMG_DIR}/${this.name}.png`;

    div.append(img)
    game.append(div)
  }
}
