import indexQuestion from './indexQuestion.html';
import pic from '../utils/importPics';
import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import { getSettingsInstance, getHeaderElement } from '../app/app';
import { AMOUNT_OF_QUESTIONS, AMOUNT_OF_ANSWER_CHOICES, CATEGORIES_OF_TYPE, DELAY_BEFORE_ANSWER } from '../utils/constants';

import './style.scss';

const CLASSES = {
  QUESTION_TITLE: 'question-title',
  QUESTION_IMAGE: 'question-image',
  QUESTION_PICTURE: 'question-picture',
  MAIN: 'main',
  ANSWER_ITEM: 'answer-item',
  MODAL_RESULT_BUTTON: 'modal-result__button',
  MODAL_HOME: 'modal-home',
  NEXT: 'next',
  MODAL_BUTTON: 'modal-button',
  BUTTON: 'button',
  ANSWER_BUTTON: 'answer-button',
  IMAGE_ANSWER: 'image-answer',
  HIDDEN: 'hidden',
  HOME: 'home',
  MODAL_ANSWER: 'modal-answer',
  MODAL_IMG_IMAGE: 'modal-img-image',
  MODAL_IMG_SIGN: 'modal-img-sign',
  MODAL_DESCRIPTION_TEXT: 'modal-description-text',
  RIGHT_ANSWER_BUTTON: 'right-answer-btn',
  WRONG_ANSWER_BUTTON: 'wrong-answer-btn',
  WRAP_RIGHT_IMAGE: 'wrap-right-image',
  WRAP_WRONG_IMAGE: 'wrap-wrong-image',
  RIGHT_ANSWER_SIGN: 'right-answer-sign',
  WRONG_ANSWER_SIGN: 'wrong-answer-sign',
  MODAL_CONTENT: 'modal-content',
  ANSWER: 'answer',
  MODAL_RESULT_IMAGE: 'modal-result__img',
  MODAL_RESULT: 'modal-result',
  GREAT_RESULT: 'great-result',
  GRAND_RESULT: 'grand-result',
}
export default class Question {
  constructor(round, timer) {
    this.timer = timer;
    this.round = round;
    this.questionPage = htmlToElement(indexQuestion);
    const title = this.questionPage.querySelector(`.${CLASSES.QUESTION_TITLE}`);
    const img = new Image();
    img.classList.add(CLASSES.QUESTION_IMAGE);
    this.questionPage.querySelector(`.${CLASSES.QUESTION_PICTURE}`).append(img);
    document.querySelector(CLASSES.MAIN).append(this.questionPage);
    const items = document.querySelectorAll(`.${CLASSES.ANSWER_ITEM}`);
    for (let el of items) {
      el.addEventListener('click', this.showUserAnswerInfo.bind(this, el))
    }

    document.querySelector(`.${CLASSES.MODAL_RESULT_BUTTON}.${CLASSES.MODAL_HOME}`).addEventListener('click', this.getHomePage.bind(this));
    document.querySelector(`.${CLASSES.MODAL_RESULT_BUTTON}.${CLASSES.NEXT}`).addEventListener('click', this.getNextRound.bind(this));
    this.questionPage.querySelector(`.${CLASSES.MODAL_BUTTON}`).addEventListener('click', this.getNextQuestion.bind(this))
    this.images = images;
  }

  buildTypeDependentFeatures(index) {
    const items = document.querySelectorAll(`.${CLASSES.ANSWER_ITEM}`);
    for (let el of items) {
      if (index < CATEGORIES_OF_TYPE) {
        const button = document.createElement('button');
        button.classList.add(CLASSES.ANSWER_BUTTON);
        el.append(button);
      }
      else {
        const img = new Image();
        img.classList.add(CLASSES.IMAGE_ANSWER);
        el.append(img);
      }
    }
  }

  init(qIndex) {
    this.settings = getSettingsInstance();
    this.buildTypeDependentFeatures(this.round.index);
    this.choices = [qIndex];
    this.populateChoices();
    this.answer = qIndex;
    this.fillQuestionTemplate();
  }
  isCorrect(guess) {
    return this.answer === Number(guess);
  }
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  populateChoices() {
    while (this.choices.length < AMOUNT_OF_ANSWER_CHOICES) {
      let flag = false;
      let rand = this.getRandom(0, AMOUNT_OF_QUESTIONS)
      for (let el of this.choices) {
        if (this.images[el].author === this.images[rand].author)
          flag = true;
      }
      if (this.choices.includes(rand) || flag)
        continue;
      this.choices.push(rand);
    }
    this.shuffle(this.choices);
  }
  fillQuestionTemplate() {
    const title = document.querySelector(`.${CLASSES.QUESTION_TITLE}`);
    const imageNum = this.images[this.answer].imageNum;
    const questionImage = document.querySelector(`.${CLASSES.QUESTION_IMAGE}`);
    const items = document.querySelectorAll(`.${CLASSES.ANSWER_ITEM}`);
    if (this.round.index < CATEGORIES_OF_TYPE) {
      title.textContent = 'Who is the author of this picture?';
      questionImage.classList.remove(CLASSES.HIDDEN);
      questionImage.src = pic[imageNum];
      for (let i = 0; i < AMOUNT_OF_ANSWER_CHOICES; i++) {
        items[i].id = this.choices[i];
        items[i].querySelector(`.${CLASSES.ANSWER_BUTTON}`).textContent = this.images[this.choices[i]].author;
      }
    }
    else {
      questionImage.classList.add(CLASSES.HIDDEN);
      title.textContent = `Which is ${this.images[this.answer].author}\'s picture?`;
      for (let i = 0; i < AMOUNT_OF_ANSWER_CHOICES; i++) {
        const img = items[i].querySelector(`.${CLASSES.IMAGE_ANSWER}`);
        img.src = pic[this.choices[i]];
        items[i].id = this.choices[i];
      }
    }
  }
  showQuestionPage() {
    this.active = true;
    this.questionPage.classList.remove(CLASSES.HIDDEN);
  }
  hideQuestionPage() {
    this.active = false;
    this.questionPage.classList.add(CLASSES.HIDDEN);
  }
  showUserAnswerInfo(el) {
    this.timer.stopFlag = true;
    this.getAnswerSignal(this.isCorrect(el.id));
    this.round.saveAnswer(this.isCorrect(el.id));
    const answerElement = document.getElementById(el.id);

    if (this.round.index < CATEGORIES_OF_TYPE) {
      const domElement = answerElement.querySelector(`.${CLASSES.ANSWER_BUTTON}`);
      this.putAnswerSign(answerElement, domElement, CLASSES.RIGHT_ANSWER_BUTTON, CLASSES.WRONG_ANSWER_BUTTON);
    }
    else {
      const domElement = answerElement.querySelector(`.${CLASSES.IMAGE_ANSWER}`);
      this.putAnswerSign(answerElement, domElement, CLASSES.WRAP_RIGHT_IMAGE, CLASSES.WRAP_WRONG_IMAGE);
    }
    setTimeout(this.showModalPicture.bind(this, el), DELAY_BEFORE_ANSWER);
  }
  getAnswerSignal(correct) {
    this.settings.playAnswerSignal(correct);
  }
  showModalPicture(el) {
    document.querySelector(`.${CLASSES.MODAL_ANSWER}`).classList.remove(CLASSES.HIDDEN);
    this.questionPage.querySelector(`.${CLASSES.MODAL_IMG_IMAGE}`).src = pic[this.answer];
    this.putAnswerSign(el, document.querySelector(`.${CLASSES.MODAL_IMG_SIGN}`), CLASSES.RIGHT_ANSWER_SIGN, CLASSES.WRONG_ANSWER_SIGN)
    document.querySelector(`.${CLASSES.MODAL_DESCRIPTION_TEXT}`).textContent = `${this.images[this.answer].author}, ${this.images[this.answer].year}`;
  }

  getNextQuestion() {
    this.cleanPage();
    this.round.processUserAnswer();
  }

  cleanPage() {
    document.querySelector(`.${CLASSES.MODAL_ANSWER}`).classList.add(CLASSES.HIDDEN);
    this.removeAnswerSign(document.querySelector(`.${CLASSES.MODAL_IMG_SIGN}`), CLASSES.RIGHT_ANSWER_SIGN, CLASSES.WRONG_ANSWER_SIGN);
    this.removeTypeDependentFeatures();
  }
  removeTypeDependentFeatures() {
    const items = document.querySelectorAll(`.${CLASSES.ANSWER_ITEM}`);
    for (let el of items) {
      el.removeEventListener('click', this.showUserAnswerInfo.bind());
      el.innerHTML = '';
    }
  }

  putAnswerSign(el, domElement, classNameRight, classNameWrong) {
    if (this.isCorrect(el.id)) {
      domElement.classList.add(classNameRight);
    }
    else {
      domElement.classList.add(classNameWrong)
    }
  }
  indicateWrongAnswer() {
    this.round.saveAnswer(false);
    this.getAnswerSignal(false);
    document.querySelector(`.${CLASSES.MODAL_IMG_SIGN}`).classList.add(`.${CLASSES.WRONG_ANSWER_SIGN}`);
    document.querySelector(`.${CLASSES.MODAL_CONTENT}.${CLASSES.ANSWER}`).style.marginTop = '20vh';
    document.querySelector(`.${CLASSES.MODAL_ANSWER}`).classList.remove(CLASSES.HIDDEN);
    this.questionPage.querySelector(`.${CLASSES.MODAL_IMG_IMAGE}`).src = pic[this.answer];
    document.querySelector(`.${CLASSES.MODAL_DESCRIPTION_TEXT}`).textContent = this.images[this.answer].author + ", " + this.images[this.answer].year;
  }
  removeAnswerSign(element, classNameRight, classNameWrong) {
    element.classList.remove(classNameWrong);
    element.classList.remove(classNameRight);
  }
  cleanClosingModal() {
    document.querySelector(`.${CLASSES.MODAL_RESULT_BUTTON}.${CLASSES.NEXT}`).classList.remove(CLASSES.HIDDEN);
    document.querySelector(`.${CLASSES.MODAL_RESULT_IMAGE}`).classList.remove(CLASSES.GREAT_RESULT, CLASSES.GRAND_RESULT);
    document.querySelector(`.${CLASSES.MODAL_RESULT}`).classList.add(CLASSES.HIDDEN);
  }
  getNextRound() {
    this.cleanClosingModal();
    this.hideQuestionPage();
    this.round.getCategories();
  }
  getHomePage() {
    this.cleanClosingModal();
    this.hideQuestionPage();
    getHeaderElement().hideLogo();
    document.querySelector(`.${CLASSES.HOME}`).classList.remove(CLASSES.HIDDEN)
  }
}