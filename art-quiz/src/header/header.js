import header from './header.html';
import htmlToElement from '../utils/htmlToElement';
import {getSettingsInstance} from '../app/app';
import './style.scss';

export default class Header{
    constructor(settings, footer){
        this.headerElement = htmlToElement(header);
        document.querySelector('header').append(this.headerElement);
        this.settings=settings;
        this.footer = footer;
        const links = this.headerElement.getElementsByClassName('nav-link');
        for(let item of links)
        {
            item.addEventListener('click', this.footer.changePage.bind(this.footer, item));
        }
        //this.headerElement.querySelector('.end-round-sign').addEventListener('click', )
        this.settings.addListenerForHeader(this.headerElement.querySelector('.settings-icon'));
    }
    hide(){
        document.querySelector('header').classList.add('hidden');
    }
    show(){
        document.querySelector('header').classList.remove('hidden');
    }
    showLogo(){
        this.headerElement.querySelector('.header-logo').classList.remove('no-visibility');
        this.headerElement.querySelector('.nav-header').classList.remove('no-visibility');
    }
    hideLogo(){
        this.headerElement.querySelector('.header-logo').classList.add('no-visibility');
        this.headerElement.querySelector('.nav-header').classList.add('no-visibility');
    }
    showGameMode(){
        this.headerElement.querySelector('.default-header').classList.add('hidden');
        this.headerElement.querySelector('.game-header').classList.remove('hidden');
        if(!this.settings.appSettings.timer){
            document.querySelector('.timer-regim').classList.add('no-visibility');
        }
    }
    showDefaultMode(){
        this.headerElement.querySelector('.default-header').classList.remove('hidden');
        this.headerElement.querySelector('.game-header').classList.add('hidden');
        document.querySelector('.timer-regim').classList.remove('no-visibility');
    }

}