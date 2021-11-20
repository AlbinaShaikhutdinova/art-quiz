import htmlToElement from "../utils/htmlToElement";
import score from "./scoreIndex.html";
import images from '../assets/images';
import pic from '../utils/importPics';

import "./style.scss";

export default class Score{
    constructor(qAmount=10){
        this.qAmount = qAmount;
        this.scorePage = htmlToElement(score);
        const main = document.querySelector('main');
        main.append(this.scorePage);
        for(let i=0;i<this.qAmount;i++)
        {
            this.buildHtml();
        }
        this.modal = this.scorePage.querySelector('.modal.modal-score');
        this.modalImage = this.scorePage.querySelector('.modal-image');
        this.modalTitle = this.scorePage.querySelector('.modal-picture-title');
        this.modalDescription = this.scorePage.querySelector('.modal-picture-description');

        this.data = images;

        this.scorePage.addEventListener('click',this.checkForExit.bind(this))

        this.scorePage.querySelector('.modal-exit-sign').addEventListener('click', this.hideModal.bind(this))
        this.scorePage.querySelector('.go-back-button').addEventListener('click', this.goToPreviousPage.bind(this))
    }
    goToPreviousPage(){
        this.hide();
        this.categories.show();
    }
    checkForExit(event){
        
        if(event.target===this.modal) 
        {
            console.log(event.target, this.modal)
            this.hideModal();
        }
    }

    show(){
        this.scorePage.classList.remove('hidden');
    }

    hide(){
        this.scorePage.classList.add('hidden');
    }

    buildHtml(){
        const list = document.querySelector('.score-items-container');
        const item= document.createElement('div');
        item.classList.add('score-item'); 
        const itemBg = document.createElement('div');
        itemBg.classList.add('score-item-bg');
        item.append(itemBg);
        list.append(item);
    }

    fillScorePage(category, id){
        this.categories = category;
        const index = id.toString().match(/\d+/g);
        const catId = Number(index)+1;
        const results = JSON.parse(localStorage.getItem(index));
        this.scorePage.querySelector('.page-title').textContent = `Category ${catId}`
        let a=0;
        const items = document.getElementsByClassName('score-item')
        for(let i = index*this.qAmount;i<index*this.qAmount+this.qAmount;i++)
        {
            items[a].addEventListener('click', this.getModal.bind(this, items[a]))
            this.getStyle(i,pic[i],results[a],items[a++]);
        }
    }
    getModal(item){
        this.fillModalTemplate(item.id);
        this.showModal();
    }
    showModal(){
        this.scorePage.querySelector('.modal.modal-score').classList.remove('hidden');
    }
    hideModal(){
        console.log('hide')
        this.scorePage.querySelector('.modal.modal-score').classList.add('hidden');
    }
    fillModalTemplate(index){
        this.modalImage.src = pic[index];
        this.modalTitle.textContent = this.data[index].name;
        this.modalDescription.textContent = `${this.data[index].author}, ${this.data[index].year}`;

    }
    getStyle(index,image,isPlayed, item){ 
        console.log(isPlayed) 
        const bg = item.querySelector('.score-item-bg');
        if(!isPlayed)
            bg.classList.add('not-visited');
        item.id = index;
        bg.style.backgroundImage = "url('"+image+"')";   
    }
}