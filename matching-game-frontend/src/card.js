const VISIBILITY = {'visible': 'hidden',
                    'hidden': 'visible'}

class Card {
  constructor(id, imgId, matchedCardCallback) {
    this.id = id;
    this.imgId = imgId;

    this.imgName = null;
    this._visible = false; // all cards start out hidden
    this._matched = false; // all cards start out unmatched
    this._disabled = false;

    this.matchedCardCallback = matchedCardCallback;
    this.onClick = this.onClick.bind(this)
  }

  putCardInUI(callback){
    this.getImage()
    .then(function(){
      this.render()
    }.bind(this))
    .then(function(){
      this.cardDiv.addEventListener('click', this.onClick)
    }.bind(this))
  }

  get visibility() {
    return this._visible ? 'visible' : 'hidden'
  }

  set visibility(visibility) {
    this._visible = (visibility === 'visible') ? true : false;
  }

  get matched() {
    return this._matched ? 'matched' : 'unmatched'
  }

  set matched(matched) {
    this._matched = (matched === 'matched') ? true : false;
  }

  disable(){
    this._disabled = true;
    this.cardDiv.removeEventListener('click', this.onClick)
  }

  enable(){
    this._disabled = false;
    this.cardDiv.addEventListener('click', this.onClick);
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
      .then(function(object) {
        return this.setImgName(object);
      }.bind(this))
      .catch(function(error) {
        alert("I'm having trouble getting a specific image!");
        console.log(error.message);
      });
  }

  setImgName(img) {
    this.imgName = img.name;
  }

  render() {
    const game = document.getElementById('game')

    let div = document.createElement('div');
    div.className = `card ${this.visibility}`;
    div.setAttribute('card-id', this.id)

    let img = document.createElement('img');
    img.className = 'card-img';
    img.src = `${IMG_DIR}/${this.imgName}.png`;
    img.style.visibility = this.visibility

    div.append(img)
    game.append(div)
  }

  onClick(){
    this.showCard();
    this.matchedCardCallback();
  }

  showCard(e) {
    if (this._disabled === true){
      console.log('d') //event listener not being removed!!
      return
    }
    this.flipCard(e)
    this.disable()
  }

  get cardDiv(){
    return document.querySelector(`[card-id="${this.id}"]`);
  }

  hide(){
    console.log('hiding')
    let divTarget = this.cardDiv
    let curVisibility = divTarget.className.slice(5)
    let newVisibility = VISIBILITY[curVisibility]

    divTarget.children[0].style.visibility = newVisibility
    divTarget.classList.remove(curVisibility)
    divTarget.classList.add(newVisibility)
    this.visibility = newVisibility
    this.enable()
    this.update()
  }

  flipCard(e){
    console.log('flipping')
    // make sure to get div even if user click on image
    let divTarget = this.cardDiv

    // start at position 5 after the word card
    let curVisibility = divTarget.className.slice(5)
    let newVisibility = VISIBILITY[curVisibility]

    divTarget.children[0].style.visibility = newVisibility
    divTarget.classList.remove(curVisibility)
    divTarget.classList.add(newVisibility)
    this.visibility = newVisibility
    this.update()
  }

  update(){
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

}
