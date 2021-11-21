import htmlToElement from "../utils/htmlToElement";
import settings from './settingsIndex.html';
import { getActiveElement, getInstanceOfHTMLElement, getHeaderElement } from "../app/app";


import './style.scss';

export default class Settings{
    constructor(){
        this.prevPage="";
        this.settingsPage = htmlToElement(settings); 
        document.querySelector('main').append(this.settingsPage);

        this.volumeSlider = this.settingsPage.querySelector('.volume-slider');
        this.settingsTimer = this.settingsPage.querySelector('.timer-toggle').querySelector('input');
        this.audoSignals = document.getElementsByClassName('answer-signal');
        this.input = this.settingsPage.querySelector('#amount-input');
        

        this.settingsPage.querySelector('.settings-exit-sign').addEventListener('click', this.hide.bind(this));
        this.settingsPage.querySelector('.go-back-sign').addEventListener('click', this.hide.bind(this));
        this.settingsPage.querySelector('.new-setting').addEventListener('click',this.updateSettings.bind(this));
        this.settingsPage.querySelector('.default-setting').addEventListener('click',this.setDefaultSettings.bind(this))
        this.settingsPage.querySelector('.slider').addEventListener('click',this.changeStatus.bind(this));
        this.volumeSlider.addEventListener('change',this.changeVolumeSlider.bind(this));
        
    }
    init(){
        if(localStorage.getItem('settings'))
        {
            this.appSettings = JSON.parse(localStorage.getItem('settings'));
            this.timer=this.appSettings.timer;
            console.log(this.appSettings)
        }
        else this.setDefaultSettings();
        this.updatePage();
    }
    updatePage(){
        this.volumeSlider.value=this.appSettings.volume;
        this.input.value = this.appSettings.answerTime;
        this.settingsTimer.checked = this.appSettings.timer;
        this.updateVolume();
    }
    updateVolume()
    {
        for(let el of this.audoSignals)
        {
            el.volume=this.appSettings.volume;
        }
        this.changeVolumeSlider();
    }
    setDefaultSettings(volume=0.5, timer=true, answerTime=20){
        this.volume=volume;
        this.timer=timer;
        this.answerTime = answerTime;
        this.appSettings = {
            volume: this.volume,
            timer: this.timer,
            answerTime: this.answerTime,
        }
        this.updatePage();
        this.updateSettingsStorage();
    }
    updateSettings(){
        this.appSettings.volume = this.volumeSlider.value;
        this.appSettings.timer = this.timer;
        this.appSettings.answerTime = this.settingsPage.querySelector('#amount-input').value;
        this.updateSettingsStorage();
        this.updateVolume();
    }
    updateSettingsStorage(){
        localStorage.setItem('settings',JSON.stringify(this.appSettings));
        this.hide();
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

    playAnswerSignal(correct){
        if(correct)
        {
            document.querySelector('.answer-signal.right').play();
        }
        else document.querySelector('.answer-signal.wrong').play();
    }

    playGameOverSignal(){
        document.querySelector('.answer-signal.game-over').play();
    }

    changeVolumeSlider() {
        let target = this.volumeSlider;
        const min = target.min
        const max = target.max
        const val = target.value
        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    }

    changeStatus(){
        if(this.timer)
            this.timer=false;
        else this.timer = true;
        console.log(this.timer)
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