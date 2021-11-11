import importImages from '../utils/importImages';
import htmlToElement from '../utils/htmlToElement';
import homePage from './index.html';
import CategoryChoice from '../category/createCategories';

import './style.scss';
class Home{
    constructor(){
        this.homeElement  = htmlToElement(homePage);
        const main = document.querySelector('main');
        main.append(this.homeElement);
        getBackground();
        
        
        this.buttons = document.getElementsByClassName('home-page__button');

        return this;
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