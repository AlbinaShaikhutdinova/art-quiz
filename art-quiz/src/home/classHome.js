import importImages from '../utils/importImages';
import htmlToElement from '../utils/htmlToElement';
import homePage from './index.html';
import { AMOUNT_OF_QUESTIONS } from '../utils/constants';
import { getHeaderElement } from '../app/app';

import './style.scss';

const CLASSES = {
  HIDDEN: 'hidden',
  MAIN: 'main',
  HOME_PAGE_BUTTON: 'home-page__button',
  HOME: 'home'
}

class Home {
  constructor(categories) {
    this.homeElement = htmlToElement(homePage);
    const main = document.querySelector(CLASSES.MAIN);
    main.append(this.homeElement);
    getBackground();
    this.buttons = document.querySelectorAll(`.${CLASSES.HOME_PAGE_BUTTON}`);
    for (let button of this.buttons) {
      button.addEventListener('click', this.displayCategories.bind(this, button.id));
    };
    this.categoriesPage = categories;
    return this;
  }


  displayCategories(id) {
    this.hide();
    this.categoriesPage.createCategories(id);
    this.categoriesPage.show();
    getHeaderElement().showLogo();
  }
  show() {
    this.active = true;
    this.homeElement.classList.remove(CLASSES.HIDDEN);
  }
  hide() {
    this.active = false;
    this.homeElement.classList.add(CLASSES.HIDDEN);
  }

}
function getBackground() {
  const home = document.querySelector(`.${CLASSES.HOME}`);
  const images = importImages();
  home.style.backgroundImage = `url('${images[getRandom(AMOUNT_OF_QUESTIONS)]}')`;
}
function getRandom(max) {
  return Math.floor(Math.random() * max);
}
export default Home;