class Timer {

  constructor(targetEl){
    this.targetEl = targetEl

    this.startTimer()
  }

  startTimer(){
    let timer_div = document.createElement('div')
    timer_div.id = 'timer';

    this.targetEl.append(timer_div)
    timer_div.innerText = this.render(0);

    let i = 1;

    setInterval(() => {
      timer_div.innerText = this.render(i++)
    }, 1000)

  }

  render(seconds){
    return (seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
  }
}
