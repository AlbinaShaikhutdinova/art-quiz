import htmlToElement from "../utils/htmlToElement";
import score from "./scoreIndex.html";
import images from '../assets/images';
import pic from '../utils/importPics';
import { CATEGORIES_OF_TYPE, QUESTIONS_IN_ROUND } from "../utils/constants";

import "./style.scss";

const CLASSES = {
  MAIN: 'main',
  MODAL: 'modal',
  MODAL_SCORE: 'modal-score',
  MODAL_IMAGE: 'modal-image',
  MODAL_PICTURE_TITLE: 'modal-picture-title',
  MODAL_PICTURE_DESCRIPTION: 'modal-picture-description',
  PAGINATION_ITEM: 'pagination-item',
  PREV_ARROW: 'prev-arrow',
  NEXT_ARROW: 'next-arrow',
  HIDDEN_ROUND_MODAL: 'hidden-round-modal',
  MODAL_EXIT_SIGN: 'modal-exit-sign',
  GO_BACK_BUTTON: 'go-back-button',
  HIDDEN: 'hidden',
  SCORE_ITEM_BG: 'score-item-bg',
  NOT_VISITED: 'not-visited',
  SCORE_ITEM: 'score-item',
  ROUND_HIDDEN: 'round-hidden',
  SCORE_ITEMS_CONTAINER: 'score-items-container',
  PAGE_TITLE: 'page-title',
}
export default class Score {
  constructor(qAmount = QUESTIONS_IN_ROUND, cAmount = CATEGORIES_OF_TYPE) {
    this.qAmount = qAmount;
    this.cAmount = cAmount;
    this.scorePage = htmlToElement(score);
    const main = document.querySelector(CLASSES.MAIN);
    main.append(this.scorePage);
    for (let i = 0; i < this.qAmount; i++) {
      this.buildHtml();
    }
    this.currentIndex = 0;
    this.modal = this.scorePage.querySelector(`.${CLASSES.MODAL}.${CLASSES.MODAL_SCORE}`);
    this.modalImage = this.scorePage.querySelector(`.${CLASSES.MODAL_IMAGE}`);
    this.modalTitle = this.scorePage.querySelector(`.${CLASSES.MODAL_PICTURE_TITLE}`);
    this.modalDescription = this.scorePage.querySelector(`.${CLASSES.MODAL_PICTURE_DESCRIPTION}`);
    this.paginationPrev = this.scorePage.querySelector(`.${CLASSES.PAGINATION_ITEM}.${CLASSES.PREV_ARROW}`);
    this.paginationNext = this.scorePage.querySelector(`.${CLASSES.PAGINATION_ITEM}.${CLASSES.NEXT_ARROW}`);

    this.images = images;

    this.scorePage.addEventListener('click', this.checkForExit.bind(this))
    this.roundHidden = this.scorePage.querySelector(`.${CLASSES.HIDDEN_ROUND_MODAL}`);
    this.paginationNext.addEventListener('click', this.getNextPage.bind(this));
    this.paginationPrev.addEventListener('click', this.getPrevPage.bind(this));
    this.scorePage.querySelector(`.${CLASSES.MODAL_EXIT_SIGN}`).addEventListener('click', this.hideModal.bind(this))
    this.scorePage.querySelector(`.${CLASSES.GO_BACK_BUTTON}`).addEventListener('click', this.goToCategoriesPage.bind(this))
  }
  getNextPage() {
    if (this.currentIndex < this.cAmount + this.categories.type - 1 && this.currentIndex >= this.categories.type) {
      this.currentIndex++
      this.cleanItemClasses();
      this.handleQuizItems(this.currentIndex);
    }
  }

  cleanItemClasses() {
    this.roundHidden.classList.add(CLASSES.HIDDEN);
    let items = document.querySelectorAll(`.${CLASSES.SCORE_ITEM_BG}`);
    for (let el of items) {
      el.classList.remove(CLASSES.NOT_VISITED);
      el.classList.remove(CLASSES.ROUND_HIDDEN);
    }
    items = document.querySelectorAll(`.${CLASSES.SCORE_ITEM}`);
    for (let el of items) {
      el.removeEventListener('click', this.getModal.bind(this, el))
    }
  }
  getPrevPage() {
    if (this.currentIndex < this.cAmount + this.categories.type && this.currentIndex > this.categories.type) {
      this.currentIndex--;
      this.cleanItemClasses();
      this.handleQuizItems(this.currentIndex);
    }
  }
  goToCategoriesPage() {
    this.roundHidden.classList.add(CLASSES.HIDDEN);
    this.hide();
    this.categories.show();
  }
  checkForExit(event) {
    if (event.target === this.modal) {
      this.hideModal();
    }
  }

  show() {
    this.roundHidden.classList.add(CLASSES.HIDDEN);
    this.scorePage.classList.remove(CLASSES.HIDDEN);
  }

  hide() {
    this.roundHidden.classList.add(CLASSES.HIDDEN);
    this.scorePage.classList.add(CLASSES.HIDDEN);
  }

  buildHtml() {
    const list = document.querySelector(`.${CLASSES.SCORE_ITEMS_CONTAINER}`);
    const item = document.createElement('div');
    item.classList.add(CLASSES.SCORE_ITEM);
    const itemBg = document.createElement('div');
    itemBg.classList.add(CLASSES.SCORE_ITEM_BG);
    item.append(itemBg);
    list.append(item);
  }
  fillScorePage(category, id) {
    this.categories = category;
    const index = id.toString().match(/\d+/g);
    this.currentIndex = Number(index);
    this.handleQuizItems(index);
  }
  getNewPageQuizItems(item) {
    this.handleQuizItems(item.id);
  }
  handleQuizItems(index) {
    const catId = Number(index) + 1;
    this.scorePage.querySelector(`.${CLASSES.PAGE_TITLE}`).textContent = `Category ${catId}`;
    if (localStorage.getItem(index)) {
      let results = JSON.parse(localStorage.getItem(index));
      let a = 0;
      const items = document.querySelectorAll(`.${CLASSES.SCORE_ITEM}`)
      for (let i = index * this.qAmount; i < index * this.qAmount + this.qAmount; i++) {
        items[a].addEventListener('click', this.getModal.bind(this, items[a]))
        this.getStyle(i, pic[i], results[a], items[a++]);
      }
    }
    else {
      const items = document.querySelectorAll(`.${CLASSES.SCORE_ITEM}`)
      for (let i = 0; i < this.qAmount; i++) {
        items[i].removeEventListener('click', this.getModal.bind(this, items[i]))
        items[i].querySelector(`.${CLASSES.SCORE_ITEM_BG}`).style.background = '';
        items[i].querySelector(`.${CLASSES.SCORE_ITEM_BG}`).classList.add(CLASSES.ROUND_HIDDEN);
      }
      this.roundHidden.classList.remove(CLASSES.HIDDEN);
    }
  }

  getModal(item) {
    this.fillModalTemplate(item.id);
    this.showModal();
  }
  showModal() {
    this.scorePage.querySelector(`.${CLASSES.MODAL}.${CLASSES.MODAL_SCORE}`).classList.remove(CLASSES.HIDDEN);
  }
  hideModal() {
    this.scorePage.querySelector(`.${CLASSES.MODAL}.${CLASSES.MODAL_SCORE}`).classList.add(CLASSES.HIDDEN);
  }
  fillModalTemplate(index) {
    this.modalImage.src = pic[index];
    this.modalTitle.textContent = this.images[index].name;
    this.modalDescription.textContent = `${this.images[index].author}, ${this.images[index].year}`;
  }
  getStyle(index, image, isPlayed, item) {
    const bg = item.querySelector(`.${CLASSES.SCORE_ITEM_BG}`);
    if (!isPlayed) {
      bg.classList.add(CLASSES.NOT_VISITED);
    }
    item.id = index;
    bg.style.backgroundImage = `url('${image}')`;
  }
}