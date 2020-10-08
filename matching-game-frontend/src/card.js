const VISIBILITY = {'visible': 'hidden',
                    'hidden': 'visible'}

class Card {

  constructor(id, imgId, onClickCallback) {
    this.id = id;
    this.imgId = imgId;

    this._visible = false; // all cards start out hidden
    this._matched = false; // all cards start out unmatched
    this._disabled = false; // all cards start out enabled

    this.onClickCallback = onClickCallback;
    this.onClick = this.onClick.bind(this);
  }

  get visibility() {
    return this._visible ? 'visible' : 'hidden'
  }

  set visibility(visibility) {
    this.cardDiv.classList.remove(this.visibility)
    this.cardDiv.classList.add(visibility)
    this.cardDiv.children[0].style.visibility = visibility

    this._visible = (visibility === 'visible') ? true : false;
  }

  get matched() {
    return this._matched ? 'matched' : 'unmatched'
  }

  set matched(matched) {
    this._matched = (matched === 'matched') ? true : false;
  }

  get cardDiv() {
    return document.querySelector(`[card-id="${this.id}"]`);
  }

  disable() {
    this._disabled = true;
    this.cardDiv.removeEventListener('click', this.onClick);
  }

  enable() {
    this._disabled = false;
    this.cardDiv.addEventListener('click', this.onClick);
  }

  show(callback) {
    this.getImage()
    .then(function(image){
      this.render(image.name);
    }.bind(this))
  }

  getImage() {
    let imgObj = {
      method: "GET",
      headers: HEADERS,
    };

    let imgUrl = `${BASE_URL}/images/${this.imgId}`

    return fetch(imgUrl, imgObj)
      .then(function(response) {
        return response.json();
      })
      .catch(function(error) {
        alert("I'm having trouble getting a specific image!");
        console.log(error.message);
      });
  }

  render(imgName) {
    // show the card in the UI
    const game = document.getElementById('game');

    let div = document.createElement('div');
    div.className = `card ${this.visibility}`;
    div.setAttribute('card-id', this.id);

    let img = this.cardImg(imgName);

    div.append(img);
    div.addEventListener('click', this.onClick)

    game.append(div);
  }

  cardImg(imgName) {
    let img = document.createElement('img');
    img.className = 'card-img';
    img.src = `${IMG_DIR}/${imgName}.png`;
    img.style.visibility = this.visibility;

    return img
  }

  onClick() {
    // show the card
    this.visibility = VISIBILITY[this.visibility];
    this.disable();
    this.update();
    this.onClickCallback();
  }

  hide() {
    this.visibility = VISIBILITY[this.visibility];
    this.enable();
    this.update();
  }

  update() {
    let cardObj = {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        visible: this._visible,
        matched: this._matched
      })
    };
    let cardUrl = `${BASE_URL}/cards/${this.id}`

    return fetch(cardUrl, cardObj)
      .then(function(response) {
        return response.json();
      })
      .catch(function(error) {
        alert("I'm having trouble updating this card!");
        console.log(error.message);
      });
  }

  static setMatchedCards(cardsArray) {
    // set multiple cards to matched
    cardsArray.forEach(card => {
      card.matched = 'matched';
      card.update();
    })
  }
}
