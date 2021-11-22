import htmlToElement from "../utils/htmlToElement";
import score from "./scoreIndex.html";
import images from '../assets/images';
import pic from '../utils/importPics';

import "./style.scss";

export default class Score{
    constructor(qAmount=10, cAmount=12){
        this.qAmount = qAmount;
        this.cAmount = cAmount;
        this.scorePage = htmlToElement(score);
        const main = document.querySelector('main');
        main.append(this.scorePage);
        for(let i=0;i<this.qAmount;i++)
        {
            this.buildHtml();
        }
        this.currentIndex=0;
        // for(let i=0;i<this.categoryAmount;i++)
        // {
        //     this.buildPaginationHtml();
        // }
        this.modal = this.scorePage.querySelector('.modal.modal-score');
        this.modalImage = this.scorePage.querySelector('.modal-image');
        this.modalTitle = this.scorePage.querySelector('.modal-picture-title');
        this.modalDescription = this.scorePage.querySelector('.modal-picture-description');
        this.paginationPrev = this.scorePage.querySelector('.pagination-item.prev-arrow');
        this.paginationNext = this.scorePage.querySelector('.pagination-item.next-arrow');

        this.data = images;

        this.scorePage.addEventListener('click',this.checkForExit.bind(this))


        this.roundHidden = this.scorePage.querySelector('.hidden-round-modal');
        this.paginationNext.addEventListener('click', this.getNextPage.bind(this));
        this.paginationPrev.addEventListener('click', this.getPrevPage.bind(this));
        this.scorePage.querySelector('.modal-exit-sign').addEventListener('click', this.hideModal.bind(this))
        this.scorePage.querySelector('.go-back-button').addEventListener('click', this.goToCategoriesPage.bind(this))
    }
    getNextPage(){
       
        if(this.currentIndex<this.cAmount+this.categories.type-1 && this.currentIndex>=this.categories.type)
        {
            this.currentIndex++
            this.cleanItemClasses();
            this.handleQuizItems(this.currentIndex);   
        }       
    }

    cleanItemClasses(){
        this.roundHidden.classList.add('hidden');
        let items =document.getElementsByClassName('score-item-bg');
        for(let el of items){
            el.classList.remove('not-visited');
            el.classList.remove('round-hidden');
        }
        items=document.getElementsByClassName('score-item');
        for(let el of items)
        {
            el.removeEventListener('click',this.getModal.bind(this,el))
        }
    }
    getPrevPage(){
        if(this.currentIndex<this.cAmount+this.categories.type && this.currentIndex>this.categories.type)
        {
            this.currentIndex--;
            this.cleanItemClasses();
            this.handleQuizItems(this.currentIndex);
        }
    }
    goToCategoriesPage(){
        this.roundHidden.classList.add('hidden');
        this.hide();
        this.categories.show();
    }
    checkForExit(event){
        
        if(event.target===this.modal) 
        {
            this.hideModal();
        }
    }

    show(){
        this.roundHidden.classList.add('hidden');
        this.scorePage.classList.remove('hidden');
    }

    hide(){
        this.roundHidden.classList.add('hidden');
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
        this.currentIndex = Number(index);
        this.handleQuizItems(index);
        
    }

    getNewPageQuizItems(item){
        this.handleQuizItems(item.id);
    }

    handleQuizItems(index){
        const catId = Number(index)+1;
        this.scorePage.querySelector('.page-title').textContent = `Category ${catId}`;
        if(localStorage.getItem(index))
        {
            let results=JSON.parse(localStorage.getItem(index));
            let a=0;
            const items = document.getElementsByClassName('score-item')
            for(let i = index*this.qAmount;i<index*this.qAmount+this.qAmount;i++)
            {
                items[a].addEventListener('click', this.getModal.bind(this, items[a]))
                this.getStyle(i,pic[i],results[a],items[a++]);
            }
        }
        else{
            let a=0;
            const items = document.getElementsByClassName('score-item')
            for(let i = 0;i<this.qAmount;i++)
            {
                items[i].removeEventListener('click',this.getModal.bind(this, items[i]))
                items[i].querySelector('.score-item-bg').style.background="";
                items[i].querySelector('.score-item-bg').classList.add('round-hidden');
            }
            this.roundHidden.classList.remove('hidden');
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
        const bg = item.querySelector('.score-item-bg');
        if(!isPlayed)
            bg.classList.add('not-visited');
        item.id = index;
        bg.style.backgroundImage = "url('"+image+"')";   
    }
}