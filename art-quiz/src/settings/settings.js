import htmlToElement from "../utils/htmlToElement";
import settings from './settingsIndex.html';
import { getActiveElement, getInstanceOfHTMLElement, getHeaderElement } from "../app/app";


import './style.scss';

export default class Settings{
    constructor(){
        this.prevPage="";
        this.settingsPage = htmlToElement(settings); 
        document.querySelector('main').append(this.settingsPage);
        this.settingsPage.querySelector('.go-back-sign').addEventListener('click', this.hide.bind(this));
        this.volumeSlider = this.settingsPage.querySelector('.volume-slider');
        this.audio = document.querySelector('audio');
        this.volumeSlider.addEventListener('change',this.changeVolume);
    }
    init(volume=0.5, timer=true, answerTime=20){
        this.volume=volume;
        this.timer=timer;
        this.answerTime = answerTime;
        this.updateSettingsStorage();
    }
    updateSettingsStorage(){
        this.appSettings = {
            volume: this.volume,
            timer: this.timer,
            answerTime: this.answerTime,
        }
        //localStorage.setItem('settings',JSON.stringify(this.appSettings))

    }
    getSettings(){
        return this.appSettings;
    }
    addListenerForHeader(el){
        el.addEventListener('click', this.show.bind(this))
    }

    show(){
        document.querySelector('.settings').classList.remove('hidden');
        document.querySelector('.settings').animationName="animateTotop";
    }
    hide(){
        document.querySelector('.settings').classList.add('hidden');
        document.querySelector('.settings').animationName="animatetop";
    }

    changeVolume() {

        let target = document.querySelector('.volume-slider');
        const min = target.min
        const max = target.max
        const val = target.value
        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    }

    // show(){
    //     if(!this.settingsPage.classList.contains('hidden'))
    //         return -1;
    //     this.prevPage=getActiveElement();
    //     getInstanceOfHTMLElement(this.prevPage).hide();
    //     this.active=true;
    //     this.settingsPage.classList.remove('hidden');
    //     getHeaderElement().hide();
       
    // }
    // hide(){
    //     this.active=false;
    //     this.settingsPage.classList.add('hidden');
    //     getInstanceOfHTMLElement(this.prevPage).show();
    //     getHeaderElement().show();
    // }

    // getDefault(){
    //     this.volume=0.5;
    //     this.timer=true;
    //     this.answerTime = 20;
    // }
}