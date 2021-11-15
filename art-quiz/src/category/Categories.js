import htmlToElement from '../utils/htmlToElement';
import Round from '../round/classRound';
import Quiz from '../quiz/Quiz';
import categories from './index.html';
import './style.scss';
import pic from '../utils/importPics';

export default class CategoriesPage{
    constructor(){
        this.quiz = new Quiz();
    }
    createPage(){
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
            element.addEventListener('click', this.getNewQuiz.bind(this, element.id))
        };
        return this.categoriesElement;
    }

    getNewQuiz(id){
        this.hideCategories();
        this.quiz.init(id);
    }
    buildHtml(){
        const list = document.querySelector('.category-items-container');
        const item= document.createElement('div');
        item.classList.add('category-item'); 
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
            this.getBackground(i,pic[i*10],items[a++]);
        }
    }
      
    getBackground(index,image,item){
        item.id = index;
        item.style.backgroundImage = "url('"+image+"')";   
    }

    showCategories(){
        this.categoriesElement.classList.remove('hidden');
    }
    hideCategories(){
        this.categoriesElement.classList.add('hidden');
    }
}
