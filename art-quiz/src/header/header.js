import header from './header.html';
import htmlToElement from '../utils/htmlToElement';
import {getSettingsInstance} from '../app/app';
import './style.scss';

export default class Header{
    constructor(settings){
        this.headerElement = htmlToElement(header);
        document.querySelector('header').append(this.headerElement);
        this.settings=settings;
        //this.headerElement.querySelector('.end-round-sign').addEventListener('click', )
        this.settings.addListenerForHeader(this.headerElement.querySelector('.settings-icon'));
    }
    hide(){
        document.querySelector('header').classList.add('hidden');
    }
    show(){
        document.querySelector('header').classList.remove('hidden');
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