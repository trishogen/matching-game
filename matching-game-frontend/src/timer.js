class Timer {

  constructor(targetEl){
    this.targetEl = targetEl
    this.timerInterval = null;
  }

  start(){
    let timer_div = document.createElement('div')
    timer_div.id = 'timer';

    this.targetEl.append(timer_div);
    timer_div.innerText = this.showTime(0);

    let i = 1;

    this.timerInterval = setInterval(() => {
      document.getElementById('timer').innerText = this.showTime(i++)
    }, 1000)
  }

  showTime(seconds) {
    return (seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
  }

  stop() {
    clearInterval(this.timerInterval)
    return this.secondsPast()
  }

  secondsPast() {
    let timeSpent = document.getElementById('timer').innerText;
    let minutes = parseInt(timeSpent.split(':')[0]);
    let seconds = parseInt(timeSpent.split(':')[1]);

    return minutes * 60 + seconds;
  }
}
