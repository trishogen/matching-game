const MAIN = document.getElementsByTagName('main')[0];
const BASE_URL = 'http://localhost:3000';
const HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
const IMG_DIR = "../matching-game-backend/app/assets/images"
let signInForm = undefined;

document.addEventListener("DOMContentLoaded", function(){
  signInForm = new SignInForm(MAIN);
})

function addTimer(){
  let timer_div = document.createElement('div')
  timer_div.id = 'timer';

  MAIN.append(timer_div)

  new Timer('timer')
}
