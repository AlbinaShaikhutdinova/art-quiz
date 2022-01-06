import Home from '../home/classHome';
import Footer from '../footer/footer';
import CategoriesPage from '../category/Categories';
import Header from '../header/header';
import Settings from '../settings/settings';
import Score from '../score/score';

let instances = {};
const categories = new CategoriesPage();
const home = new Home(categories);
const score = new Score();
const footer = new Footer(categories, home, score);
const settings = new Settings(home, categories);
settings.init();
const header = new Header(settings, footer);

function app() {
  instances = {
    categories: categories,
    home: home,
    footer: footer,
    settings: settings,
    header: header
  };
  home.show();
}

function getSettingsInstance() {
  return settings;
}
function getScoreInstance() {
  return score;
}
function getHeaderElement() {
  return header;
}
function getActiveElement() {
  const mainPage = document.querySelector('main');
  for (let el of mainPage.children) {
    if (!el.classList.contains('hidden'))
      return el;
  }
  return -1;
}

function getInstanceOfHTMLElement(element) {
  for (let key of Object.keys(instances)) {
    if (element.classList.contains(key)) {
      return instances[key];
    }
  }

}

function changePage(id) {
  switch (id) {
    case "nav-home": displayHome(getCategoriesPage());
    case "nav-category": ;
    case "nav-score": getScorePage();
  }
}

export { app, changePage, getActiveElement, getInstanceOfHTMLElement, getScoreInstance, getHeaderElement, getSettingsInstance };