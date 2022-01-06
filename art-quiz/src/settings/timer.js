import { getSettingsInstance } from "../app/app";
import { DELAY_FOR_TIMER_UPDATE, QUESTIONS_IN_ROUND } from "../utils/constants";


export default class Timer {
  constructor() {

  }
  init() {
    this.isStopped = true;
    this.settings = getSettingsInstance().getSettings();
    this.period = this.settings.answerTime;
    this.iterationsAmount = QUESTIONS_IN_ROUND;
    this.timeLimit = this.period;
    this.updateTimerNumbers();
  }
  startTimerRound(questionNum, question) {
    document.querySelector('#bar').style.width = '0';
    this.question = question;
    this.isStopped = false;
    if (this.iterationsAmount > questionNum) {
      this.startTimerQuestion();
    }

  }
  startTimerQuestion() {
    setTimeout(this.timerHandler.bind(this), DELAY_FOR_TIMER_UPDATE);
  }
  timerHandler() {
    this.timeLimit--;
    this.updateTimerNumbers();
    this.updateTimerBar();
    this.checkForPeriodEnd();
  }
  updateTimerBar() {
    document.querySelector('#bar').style.width = Math.floor((1 - this.timeLimit / this.period) * 100) + '%';
  }
  updateTimerNumbers() {
    document.querySelector('.time-left').textContent = `${this.timeLimit}/${this.period}`;
  }
  checkForPeriodEnd() {
    if (this.timeLimit < 1) {
      this.outOfTime();
    }
    else if (this.isStopped) {
      this.stopTimer();
    }
    else this.startTimerQuestion();
  }
  outOfTime() {
    this.isStopped = true;
    this.question.indicateWrongAnswer();
    this.stopTimer();
  }
  stopTimer() {

    this.init();
  }
}