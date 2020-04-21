const VISIBILITY = {'visible': 'hidden',
                    'hidden': 'visible'}

class Card {

  constructor(id, imgId) {
    this.id = id;
    this.imgId = imgId;
    this.imgName = undefined;
    this._visibile = false; // all cards start out hidden
    this._matched = false; // all cards start out unmatched

    this.getImage()
    .then(function(object){
      this.render()}.bind(this)
    )
  }

  get visibility() {
    return (this._visibile === true) ? 'visibile' : 'hidden'
  }

  set visibility(visibility) {
    this._visible = (visibility === 'visible') ? true : false;
  }

  get matched() {
    this._matched ? 'matched' : 'unmatched'
  }

  set matched(matched) {
    this._matched = (matched === 'matched') ? true : false;
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

    div.addEventListener('click', function(e) {
      this.flipCard(e)
    }.bind(this));

    div.append(img)
    game.append(div)
  }

  flipCard(e) {
    if (this.matched === 'matched'){
      // should no longer be able to be flipped if it has been matched
      return
    }
    // make sure to get div even if user click on image
    let divTarget = e.target.closest('div')
    let cardId = divTarget.getAttribute('card-id')

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
