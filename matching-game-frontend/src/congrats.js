class Congratulations {

  show() {
    let gameDiv = document.getElementsByClassName('game')[0];

    let congrats_div = document.createElement('div');
    congrats_div.className = 'congrats';

    let p = this.congratsMessage();
    let btn = this.playButton();

    congrats_div.append(p, btn);
    gameDiv.append(congrats_div);
  }

  congratsMessage() {
    let p = document.createElement('p');
    p.textContent = `Congratulations, you won!`;

    return p;
  }

  playButton() {
    let btn = document.createElement('button');
    btn.type = 'submit';
    btn.innerText = 'Play again!';

    btn.addEventListener('click', () => {
      location.reload();  // reload page on click
    });

    return btn;
  }

}
