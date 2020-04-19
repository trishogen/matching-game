const VISIBILITY = {'visible': 'hidden',
                    'hidden': 'visible'}

class Card {

  constructor(cardId, gameCardId) {
    this.id = cardId;
    this.gameCardId = gameCardId,
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
    div.setAttribute('game-card-id', this.gameCardId)

    let img = document.createElement('img');
    img.className = 'card-img';
    img.src = `${IMG_DIR}/${this.name}.png`;
    img.style.visibility = this.visibility

    div.addEventListener('click', function(e) {
      this.flipCard(e);
    }.bind(this));

    div.append(img)
    game.append(div)
  }

  flipCard(e) {
    // make sure to get div even if user click on image
    let divTarget = e.target.closest('div')
    let gameCardId = divTarget.getAttribute('game-card-id')

    // start at position 5 after the word card
    let curVisibility = divTarget.className.slice(5)
    let newVisibility = VISIBILITY[curVisibility]

    divTarget.children[0].style.visibility = newVisibility
    divTarget.classList.remove(curVisibility)
    divTarget.classList.add(newVisibility)
    this.visibility = newVisibility
  }
}
