import htmlToElement from '../utils/htmlToElement';
import Round from '../round/classRound';
import Quiz from '../quiz/Quiz';
import categories from './index.html';
import './style.scss';
import pic from '../utils/importPics';
import {getScoreInstance} from '../app/app';

export default class CategoriesPage{
    constructor(settings){
        const amountCategories=12;
        this.categoriesElement = htmlToElement(categories);
        const main = document.querySelector('main');
        main.append(this.categoriesElement);
        for(let i=0;i<amountCategories;i++)
        {
            this.buildHtml();
        }
        const items =this.categoriesElement.getElementsByClassName('category-item');
        for(let element of items) {
            element.addEventListener('click', this.handleCategoryQuery.bind(this, element))
        };
        //this.queryElement=items[0];
        document.querySelector('.button.play-again').addEventListener('click', this.getNewQuiz.bind(this));
        document.querySelector('.button.show-results').addEventListener('click', this.getCategoryScore.bind(this))
        this.round = new Round(this.round);
        this.settings=settings;
        
    }
    getCategoryScore(){
        this.hideModalQuestion();
        this.hide();
        this.score = getScoreInstance();
        this.score.fillScorePage(this,this.queryElement.id);
        this.score.show();
    }

    handleCategoryQuery(element){
        this.queryElement = element;
        if(element.querySelector('.category-item-bg').classList.contains('not-visited'))
            this.getNewQuiz();
        else this.showModalQuestion();

    }
    showModalQuestion(){  
        document.querySelector('.modal.user-query').classList.remove('hidden');
    }
    hideModalQuestion(){
        document.querySelector('.modal.user-query').classList.add('hidden');
    }

    getNewQuiz(){
        this.hideModalQuestion();
        this.hide();
        this.round.init(this.queryElement.id);
        this.round.startRound(this);
    }
    buildHtml(){
        const list = document.querySelector('.category-items-container');
        const item= document.createElement('div');
        item.classList.add('category-item'); 
        const itemTitle = document.createElement('div');
        const titleNum = document.createElement('div');
        titleNum.classList.add('title-index');
        const titleRes = document.createElement('div');
        titleRes.classList.add('title-score');
        itemTitle.append(titleNum);
        itemTitle.append(titleRes);
        itemTitle.classList.add('item-title');
        itemTitle.classList.add('sub-title');
        item.append(itemTitle);
        const itemBg = document.createElement('div');
        itemBg.classList.add('category-item-bg');
        item.append(itemBg);
        list.append(item);
    }

    createCategories(type){
        const amountQ = 10;
        const amountCategories = type ==='artist'? 12 : 24;
        let i = type ==='artist'? 0 : 12;
        this.type=i;
        let a=0;
        const items = document.getElementsByClassName('category-item')
        for(i;i<amountCategories;i++)
        {
            this.getBackground(i,pic[i*10],items[a++],a);
        }
    }
      
    getBackground(index,image,item, a){
        item.querySelector('.title-index').textContent=`Category ${a}`;
        const bg = item.querySelector('.category-item-bg');
        this.updateCategoryStyle(item,index);
        item.id ="category"+ index;
        bg.style.backgroundImage = "url('"+image+"')";   
    }


    updateCategoryStyle(item, index){
        if(localStorage.getItem(index+'score'))
            {
                item.querySelector('.title-score').textContent = `${localStorage.getItem(index+'score')}/${10}`;
                item.querySelector('.category-item-bg').classList.remove('not-visited');
            }
        else {
            item.querySelector('.category-item-bg').classList.add('not-visited')
            item.querySelector('.title-score').textContent="";
        }
        
    }

    show(){
        this.active = true;
        this.categoriesElement.classList.remove('hidden');
        document.querySelector('.nav-footer').style.bottom ='-10vh';
    }
    hide(){
        this.active = false;
        this.categoriesElement.classList.add('hidden');
        document.querySelector('.nav-footer').style.bottom ='-20vh';
    }
}
