class SignInForm {

  constructor(target) {
    target.append(this.render());

  }

  render() {
    let div = document.createElement('div');
    div.className = 'sign-in';

    let form = this.form()
    let input = this.usernameInput();

    let br = document.createElement("br");
    br.className = 'br-big'

    let btn = this.playButton();

    form.append(input, br, btn);
    div.append(form);
    return div
  }

  form() {
    let form = document.createElement('form');
    form.id = 'username-form';
    return form
  }

  usernameInput(){
    let input = document.createElement('input');
    input.id = 'username-input';
    input.type = 'text';
    input.placeholder = 'username';
    return input
  }

  playButton(){
    let btn = document.createElement('button');
    btn.type = 'submit';
    btn.innerText = 'Play!'
    btn.addEventListener('click', (e) => {
      this.signIn(e);
    });
    return btn
  }

  signIn(e) {
    e.preventDefault();
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
        return response.json();
      })
      .then(function(object) {
        return new Game(object.id)
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
