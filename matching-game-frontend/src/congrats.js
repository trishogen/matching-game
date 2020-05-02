class Congratulations {

  show(){
    let gameDiv = document.getElementsByClassName('game')[0]

    let congrats_div = document.createElement('div');
    congrats_div.className = 'congrats';
    congrats_div.innerText = `Congratulations, you won!`


    let btn = this.playButton()
    let br = document.createElement("br");
    br.className = 'br-big'

    congrats_div.appendChild(br);
    congrats_div.appendChild(btn);
    gameDiv.append(congrats_div);
  }

  playButton(){
    let btn = document.createElement('button');
    btn.type = 'submit';
    btn.innerText = 'Play again!'

    btn.addEventListener('click', () => {
      location.reload()
    });

    return btn
  }

}
