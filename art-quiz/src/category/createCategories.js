import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import importImages from '../utils/importImages';
import Category from '../round/classRound';
import categories from './index.html';
import quiz from '../quiz/Quiz';
import './style.scss';
import pic from '../utils/importPics';


//show page with categories of certain type(artist or art)
//get all categories
//create instances of categories (Category class)
export default function createCategories(amountCategories){
    const categoriesElement = htmlToElement(categories);
    const main = document.querySelector('main');
    main.append(categoriesElement);
    for(let i=0;i<amountCategories;i++)
    {
        buildHtml();
    }
    return categoriesElement;
}

function buildHtml(){
    const list = document.querySelector('.category-items-container');
    const item= document.createElement('div');
    item.classList.add('category-item'); 
    list.append(item);
}
