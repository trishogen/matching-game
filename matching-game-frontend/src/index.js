const BASE_URL = 'http://localhost:3000';
const IMG_DIR = "../matching-game-backend/app/assets/images";

const HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

const MAIN = document.getElementsByTagName('main')[0];

let signInForm = null;

document.addEventListener("DOMContentLoaded", function() {
  signInForm = new SignInForm(MAIN);
  signInForm.show();
})
