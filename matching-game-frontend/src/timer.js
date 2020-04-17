class Timer {

  constructor(targetId){
    this.targetEl = document.getElementById(targetId);
    this.targetEl.innerText = this.render(0);

    let i = 1;

    setInterval(() => {
      this.targetEl.innerText = this.render(i++)
    }, 1000)
  }

  render(seconds){
    return (seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
  }

}
