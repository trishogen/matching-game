class Timer {

  constructor(targetEl){
    this.targetEl = targetEl

    this.startTimer()
  }

  startTimer(){
    let timer_div = document.createElement('div')
    timer_div.id = 'timer';

    this.targetEl.append(timer_div);
    timer_div.innerText = this.render(0);

    let i = 1;

    setInterval(() => {
      timer_div.innerText = this.render(i++)
    }, 1000)

  }

  render(seconds) {
    return (seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
  }

  secondsPast() {
    let timeSpent = document.getElementById('timer').innerText
    let minutes = parseInt(timeSpent.split(':')[0])
    let seconds = parseInt(timeSpent.split(':')[1])
    return minutes * 60 + seconds
  }
}
