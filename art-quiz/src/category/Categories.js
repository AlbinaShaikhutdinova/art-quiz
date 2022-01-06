import htmlToElement from '../utils/htmlToElement';
import Round from '../round/Round';
import categories from './index.html';
import './style.scss';
import pic from '../utils/importPics';
import { getScoreInstance } from '../app/app';
import { CATEGORIES_OF_TYPE, QUESTIONS_IN_ROUND } from '../utils/constants';

const CLASSES = {
  MAIN: 'main',
  CATEGORY_ITEM: 'category-item',
  EXIT_SIGN_MODAL: 'exit-sign-modal',
  BUTTON: 'button',
  PLAY_AGAIN: 'play-again',
  SHOW_RESULTS: 'show-results',
  MODAL: 'modal',
  USER_QUERY: 'user-query',
  NAV_FOOTER: 'nav-footer',
  CATEGORY_ITEM_BG: 'category-item-bg',
  NOT_VISITED: 'not-visited',
  HIDDEN: 'hidden',
  CATEGORY_ITEMS_CONTAINER: 'category-items-container',
  TITLE_INDEX: 'title-index',
  TITLE_SCORE: 'title-score',
  ITEM_TITLE: 'item-title',
  SUB_TITLE: 'sub-title',

}

export default class CategoriesPage {
  constructor(settings) {
    this.amountCategories = CATEGORIES_OF_TYPE;
    this.categoriesElement = htmlToElement(categories);
    const main = document.querySelector(CLASSES.MAIN);
    main.append(this.categoriesElement);
    for (let i = 0; i < this.amountCategories; i++) {
      this.buildHtml();
    }
    const items = this.categoriesElement.getElementsByClassName(CLASSES.CATEGORY_ITEM);
    for (let element of items) {
      element.addEventListener('click', this.handleCategoryQuery.bind(this, element))
    };
    this.categoriesElement.querySelector(`.${CLASSES.EXIT_SIGN_MODAL}`).addEventListener('click', this.hideModalQuestion.bind(this));
    document.querySelector(`.${CLASSES.BUTTON}.${CLASSES.PLAY_AGAIN}`).addEventListener('click', this.getNewQuiz.bind(this));
    document.querySelector(`.${CLASSES.BUTTON}.${CLASSES.SHOW_RESULTS}`).addEventListener('click', this.getCategoryScore.bind(this))
    this.round = new Round();
    this.settings = settings;
    this.userQuery = document.querySelector(`.${CLASSES.MODAL}.${CLASSES.USER_QUERY}`);
  }
  getCategoryScore() {
    this.hideModalQuestion();
    this.hide();
    document.querySelector(`.${CLASSES.NAV_FOOTER}`).style.bottom = '-10vh';
    this.score = getScoreInstance();
    this.score.fillScorePage(this, this.categoryElement.id);
    this.score.show();
  }
  handleCategoryQuery(element) {
    this.categoryElement = element;
    if (element.querySelector(`.${CLASSES.CATEGORY_ITEM_BG}`).classList.contains(CLASSES.NOT_VISITED)) {
      this.getNewQuiz();
    }
    else {
      this.showModalQuestion();
    }
  }
  showModalQuestion() {
    this.userQuery.classList.remove(CLASSES.HIDDEN);
  }
  hideModalQuestion() {
    this.userQuery.classList.add(CLASSES.HIDDEN);
  }
  getNewQuiz() {
    this.hideModalQuestion();
    this.hide();
    this.round.init(this.categoryElement.id);
    this.round.startRound(this);
  }
  buildHtml() {
    const list = document.querySelector(`.${CLASSES.CATEGORY_ITEMS_CONTAINER}`);
    const item = document.createElement('div');
    item.classList.add(CLASSES.CATEGORY_ITEM);
    const itemTitle = document.createElement('div');
    const titleNum = document.createElement('div');
    titleNum.classList.add(CLASSES.TITLE_INDEX);
    const titleRes = document.createElement('div');
    titleRes.classList.add(CLASSES.TITLE_SCORE);
    itemTitle.append(titleNum, titleRes);
    itemTitle.classList.add(CLASSES.ITEM_TITLE, CLASSES.SUB_TITLE);
    const itemBg = document.createElement('div');
    itemBg.classList.add(CLASSES.CATEGORY_ITEM_BG);
    item.append(itemTitle, itemBg);
    list.append(item);
  }
  createCategories(type) {
    const amountOfRoundQuestions = QUESTIONS_IN_ROUND;
    const amountCategories = type === 'artist'
      ? this.amountCategories
      : this.amountCategories * 2;
    let i = type === 'artist' ? 0 : this.amountCategories;
    this.type = i;
    let categoryIdx = 0;
    const items = document.querySelectorAll(`.${CLASSES.CATEGORY_ITEM}`)
    for (i; i < amountCategories; i++) {
      this.getBackground(i, pic[i * amountOfRoundQuestions], items[categoryIdx++], categoryIdx);
    }
  }
  getBackground(index, image, item, currentCategoryIdx) {
    item.querySelector(`.${CLASSES.TITLE_INDEX}`).textContent = `Category ${currentCategoryIdx}`;
    const bg = item.querySelector(`.${CLASSES.CATEGORY_ITEM_BG}`);
    this.updateCategoryStyle(item, index);
    item.id = "category" + index;
    bg.style.backgroundImage = `url('${image}')`;
  }
  updateCategoryStyle(item, index) {
    if (localStorage.getItem(index + 'score')) {
      item.querySelector(`.${CLASSES.TITLE_SCORE}`).textContent = `${localStorage.getItem(index + 'score')}/${QUESTIONS_IN_ROUND}`;
      item.querySelector(`.${CLASSES.CATEGORY_ITEM_BG}`).classList.remove(CLASSES.NOT_VISITED);
    }
    else {
      item.querySelector(`.${CLASSES.CATEGORY_ITEM_BG}`).classList.add(CLASSES.NOT_VISITED)
      item.querySelector(`.${CLASSES.TITLE_SCORE}`).textContent = '';
    }
  }
  show() {
    this.active = true;
    this.categoriesElement.classList.remove(CLASSES.HIDDEN);
    document.querySelector(`.${CLASSES.NAV_FOOTER}`).style.bottom = '-10vh';
  }
  hide() {
    this.active = false;
    this.categoriesElement.classList.add(CLASSES.HIDDEN);
    document.querySelector(`.${CLASSES.NAV_FOOTER}`).style.bottom = '-20vh';
  }
}
