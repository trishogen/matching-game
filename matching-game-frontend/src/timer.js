class Timer {

  constructor(targetEl) {
    this.targetEl = targetEl;
    this.timerInterval = null; // to allow us to easily clearInterval later
  }

  start() {
    let timer_div = document.createElement('div');
    timer_div.id = 'timer';

    this.targetEl.append(timer_div);
    // call once before interval is set to show 0:00 quickly
    timer_div.textContent = this.showTime(0);

    let i = 1;

    this.timerInterval = setInterval(() => {
      document.getElementById('timer').textContent = this.showTime(i++);
    }, 1000);
  }

  showTime(seconds) {
    // formats the the display of the timer to hh:ss
    return (seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds;
  }

  stop() {
    // stops the timer and returns how many seconds have gone by
    clearInterval(this.timerInterval);
    return this.secondsPast();
  }

  secondsPast() {
    let timeSpent = document.getElementById('timer').innerText;
    let minutes = parseInt(timeSpent.split(':')[0]);
    let seconds = parseInt(timeSpent.split(':')[1]);

    return minutes * 60 + seconds;
  }
}
