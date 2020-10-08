class Congratulations {
  // Congratulations pop up when game is is won
  
  show() {
    let gameDiv = document.getElementsByClassName('game')[0];

    let congrats_div = document.createElement('div');
    congrats_div.className = 'congrats';

    let p = this.congratsMessage();
    let btn = this.playButton();

    congrats_div.append(p, btn);
    gameDiv.append(congrats_div);
  }

  topTenGames(games, p) {
    let ul = document.createElement('ul');

    games.forEach(game => {
      let li = document.createElement('li');
      li.innerText = `${game.completionTime}`
      ul.append(li)
    })

    return ul
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
