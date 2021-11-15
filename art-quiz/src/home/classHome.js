import importImages from '../utils/importImages';
import htmlToElement from '../utils/htmlToElement';
import homePage from './index.html';
import Categories from '../category/Categories';

import './style.scss';
class Home{
    constructor(){
        // this.homeElement  = htmlToElement(homePage);
        // const main = document.querySelector('main');
        // main.append(this.homeElement);
        // try{
        //     document.querySelector('home').classList.remove(hidden);
        // }
        // catch(e){
        // }
        // getBackground();
        // this.buttons = document.getElementsByClassName('home-page__button');
        this.catPage=new Categories();
        return this;
    }

    createHomePage(){
        this.homeElement = htmlToElement(homePage);
        const main = document.querySelector('main');
        main.append(this.homeElement);
        getBackground();        
        this.buttons = document.getElementsByClassName('home-page__button');
        for(let button of this.buttons) {
            button.addEventListener('click', this.displayCategories.bind(this,button.id));
        };     
    }
    displayCategories(id){
        this.catPage.createPage();
        this.hideHome();
        this.catPage.createCategories(id);
        this.catPage.showCategories();
    }
    showHome(){
        this.homeElement.classList.remove('hidden');
    }
    hideHome(){
        this.homeElement.classList.add('hidden');
    }

}
function getBackground(){
    const home = document.querySelector('.home');
    const images = importImages();
    home.style.backgroundImage = "url('"+images[getRandom(240)]+"')";
}
function getRandom(max){
    return Math.floor(Math.random() * max);
}
export default Home;