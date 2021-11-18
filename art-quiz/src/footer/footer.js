import footer from './indexFooter.html';
import {changePage} from '../app/app';
import htmlToElement from '../utils/htmlToElement';
import './style.scss';

export default class Footer{
    constructor(categories, home){
        this.categories = categories;
        this.home = home;
        const footerElement = htmlToElement(footer);
        document.querySelector('footer').append(footerElement);
        const footerLinks = footerElement.getElementsByClassName('nav-link');
        for(let item of footerLinks)
        {
            item.addEventListener('click', this.changePage.bind(this, item));
        }
        //return footerElement;
    }
    changePage(item){
        console.log(item)
        switch(item.id){
           case "nav-home": this.goHome();
           break;
           case "nav-category": this.goCat();
           break;
           case "nav-score": ;
           break;
        }
    }
    goHome(){
        this.categories.hide();
        this.home.show();
    }
    goCat(){
        this.categories.show();
        this.home.hide();
    }
   
}