import footer from './indexFooter.html';
import {changePage} from '../app/app';
import htmlToElement from '../utils/htmlToElement';
import { getHeaderElement } from '../app/app';
import './style.scss';

export default class Footer{
    constructor(categories, home, score){
        this.categories = categories;
        this.home = home;
        this.score = score;
        const footerElement = htmlToElement(footer);
        document.querySelector('footer').append(footerElement);
        const links = document.getElementsByClassName('nav-link');
        for(let item of links)
        {
            item.addEventListener('click', this.changePage.bind(this, item));
        }
    }
    changePage(item){
        switch(item.id){
           case "nav-home": this.goHome();
           break;
           case "nav-category": this.goCat();
           break;
           case "nav-score": this.goScore();
           break;
        }
    }
    goHome(){
        this.categories.hide();
        this.score.hide();
        this.home.show();
        getHeaderElement().hideLogo();
    }
    goCat(){
        this.categories.show();
        this.score.hide();
        this.home.hide();
        getHeaderElement().showLogo();
    }
    goScore(){
        this.categories.hide();
        document.querySelector('.nav-footer').style.bottom ='-10vh';
        this.score.fillScorePage(this.categories, this.categories.type)
        this.score.show();
    }
   
}