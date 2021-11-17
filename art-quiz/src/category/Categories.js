import htmlToElement from '../utils/htmlToElement';
import Round from '../round/classRound';
import Quiz from '../quiz/Quiz';
import categories from './index.html';
import './style.scss';
import pic from '../utils/importPics';

export default class CategoriesPage{
    constructor(){
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
            element.addEventListener('click', this.getNewQuiz.bind(this, element))
        };
        this.round = new Round(this.round);
        //return this.categoriesElement;
       
    }
    // getHomeInstance(home){
    //     this.home=home;
    // }

    getNewQuiz(el){
        this.hideCategories();
        this.round.init(el.id);
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
        if(localStorage.getItem(index+'score'))
            {
                item.querySelector('.title-score').textContent = `${localStorage.getItem(index+'score')}/${10}`;
                bg.classList.remove('not-visited');
            }
        else bg.classList.add('not-visited')
        item.id ="category"+ index;
        bg.style.backgroundImage = "url('"+image+"')";   
    }



    showCategories(){
        this.categoriesElement.classList.remove('hidden');
        document.querySelector('.nav-footer').style.bottom ='-10vh';
    }
    hideCategories(){
        this.categoriesElement.classList.add('hidden');
        document.querySelector('.nav-footer').style.bottom ='-20vh';
    }
}
