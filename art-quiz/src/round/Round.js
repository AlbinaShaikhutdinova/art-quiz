import htmlToElement from '../utils/htmlToElement';
import Question from '../question/classQuestion';
import result from './roundResult.html';
import Timer from '../settings/timer';
import { getHeaderElement, getSettingsInstance } from '../app/app';
import { CATEGORIES_OF_TYPE, QUESTIONS_IN_ROUND } from '../utils/constants';

const CLASSES = {
  END_ROUND_SIGN: 'end-round-sign',
  MODAL_EXIT_BUTTON: 'modal-exit-button',
  CANCEL_EXIT: 'cancel-exit',
  EXIT: 'exit',
  MODAL: 'modal',
  EXIT_WINDOW: 'exit-window',
  HIDDEN: 'hidden',
  MODAL_CATEGORY_END: 'modal-category-end',
  NEXT: 'next',
  MODAL_RESULT_BUTTON: 'modal-result__button',
  MODAL_RESULT_SCORE: 'modal-result__score',
  MODAL_RESULT_IMAGE: 'modal-result__img',
  MODAL_RESULT_TEXT: 'modal-result__text',
  MODAL_RESULT: 'modal-result',
  GREAT_RESULT: 'great-result',
  GOOD_RESULT: 'good-result',
}

class Round {
  constructor() {
    this.resultPage = htmlToElement(result);
    this.timer = new Timer();
    this.question = new Question(this, this.timer);
  }
  init(strIndex, questionsAmount = QUESTIONS_IN_ROUND, sameCategory = false) {
    this.settings = getSettingsInstance();
    this.score = 0;
    this.answers = [];
    this.qIndex = 0;
    this.categoriesAmount = CATEGORIES_OF_TYPE;
    this.index = this.getIndex(strIndex);
    this.qAmount = questionsAmount;
    this.currentQuestionIndex = this.index * this.qAmount;
    this.qIndexInRound = 1;
    this.title = `Category ${this.index}`;
    document.querySelector(`.${CLASSES.END_ROUND_SIGN}`).addEventListener('click', this.showExitQuestion.bind(this))
    document.querySelector(`.${CLASSES.MODAL_EXIT_BUTTON}.${CLASSES.CANCEL_EXIT}`).addEventListener('click', this.hideExitQuestion.bind(this));
    document.querySelector(`.${CLASSES.MODAL_EXIT_BUTTON}.${CLASSES.EXIT}`).addEventListener('click', this.abortRound.bind(this));
  }
  getIndex(strIndex) {
    return strIndex.toString().match(/\d+/g);
  }

  showExitQuestion() {
    this.question.questionPage.querySelector(`.${CLASSES.MODAL}.${CLASSES.EXIT_WINDOW}`).classList.remove(CLASSES.HIDDEN);
  }
  hideExitQuestion() {
    document.querySelector(`.${CLASSES.MODAL}.${CLASSES.EXIT_WINDOW}`).classList.add(CLASSES.HIDDEN);
  }

  abortRound() {
    this.hideExitQuestion();
    this.timer.stopTimer();
    this.question.cleanPage();
    this.question.hideQuestionPage();
    this.getCategories();
    getHeaderElement().showDefaultMode();
  }
  getCurrentScore() {
    return this.score;
  }
  saveAnswer(status) {
    this.answers[this.qIndex] = status;
    this.qIndex++;
    if (status) this.score++;
  }
  saveResult() {
    localStorage.setItem(this.index, JSON.stringify(this.answers));
    localStorage.setItem(this.index + 'score', JSON.stringify(this.score));
  }
  showCurrentResult() {
    return this.answers;
  }
  getPreviousScore() {
    return localStorage.getItem(this.index + 'score');
  }

  getPreviousAnswers() {
    return localStorage.getItem(this.index);
  }


  processUserAnswer() {
    if (this.qIndex < this.qAmount) {
      this.getNextQuestion();
    }
    else {
      this.finishRound();
    }
  }
  startRound(categories) {
    this.categories = categories;
    getHeaderElement().showGameMode();
    this.getNextQuestion();
    this.question.showQuestionPage();

  }
  getNextQuestion() {
    if (this.settings.appSettings.timer) {
      this.timer.init();
      this.timer.startTimerRound(this.qIndex, this.question);
    }
    this.question.init(this.currentQuestionIndex++);
  }

  finishRound() {
    this.saveResult();
    this.settings.playGameOverSignal();
    const result = this.getCurrentScore();
    this.showFinishModal(result);
    this.categories.updateCategoryStyle(document.getElementById('category' + this.index), this.index);
    getHeaderElement().showDefaultMode();
  }
  showFinishModal(result) {
    this.evaluateResult(result);
    if ((this.index + 1) % this.categoriesAmount === 0) {
      document.querySelector(`.${CLASSES.MODAL_CATEGORY_END}`).textContent = 'You answered all questions in this category!';
      document.querySelector(`.${CLASSES.MODAL_RESULT_BUTTON}.${CLASSES.NEXT}`).classList.add(CLASSES.HIDDEN);
    }
    document.querySelector(`.${CLASSES.MODAL_RESULT_SCORE}`).textContent = `${result}/${this.qAmount}`;
    document.querySelector(`.${CLASSES.MODAL_RESULT}`).classList.remove(CLASSES.HIDDEN);
  }

  evaluateResult(result) {
    const resultImage = document.querySelector(`.${CLASSES.MODAL_RESULT_IMAGE}`);
    const resultText = document.querySelector(`.${CLASSES.MODAL_RESULT_TEXT}`);
    if (result === this.qAmount) {
      resultImage.classList.add(CLASSES.GREAT_RESULT);
      resultText.textContent = 'Grand Result!';
    }
    else {
      resultImage.classList.add(CLASSES.GOOD_RESULT);
      resultText.textContent = 'Congratulations!';
    }
  }

  getCategories() {
    this.categories.show();
  }
}
export default Round;