class SignInForm {

  constructor(targetEl) {
    this.targetEl = targetEl; // element to append the signin form to
  }

  show() {
    let div = document.createElement('div');
    div.className = 'sign-in';

    let form = this.form();
    div.append(form);

    this.targetEl.append(div);
  }

  form() {
    let form = document.createElement('form');
    form.id = 'username-form';

    let input = this.usernameInput();
    let br = document.createElement("br");
    br.className = 'br-big'; // create bigger spacing between input and button
    let btn = this.playButton();

    form.append(input, br, btn);

    return form
  }

  usernameInput() {
    let input = document.createElement('input');
    input.id = 'username-input';
    input.type = 'text';
    input.placeholder = 'username';

    return input
  }

  playButton() {
    let btn = document.createElement('button');
    btn.type = 'submit';
    btn.innerText = 'Play';

    btn.addEventListener('click', (e) => {
      this.signIn(e);
    });

    return btn
  }

  signIn(e) {
    e.preventDefault(); // prevent form from submitting
    let username = document.getElementById('username-input').value;

    let signInObj = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        "username": username
      })
    };

    return fetch(BASE_URL + '/login', signInObj)
      .then(function(response) {
        return response.json()
      })
      .then(function(user) {
        return new Game(user.id).startNewGame() // starts new game for user
      })
      .catch(function(error) {
        alert("I'm having trouble finding that user!");
        console.log(error.message);
      });
  }

  hide() {
    let signInDiv = document.getElementsByClassName('sign-in')[0];
    signInDiv.style.display = 'none';
  }
}
