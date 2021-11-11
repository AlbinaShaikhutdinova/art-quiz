import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import importImages from '../utils/importImages';
import Category from './classCategory';
import categories from './index.html';
import quiz from '../quiz/Quiz';
import './style.scss';


//show page with categories of certain type(artist or art)
//get all categories
//create instances of categories (Category class)
function createCategories(type){
    const categoriesElement = htmlToElement(categories);
    const main = document.querySelector('main');
    main.append(categoriesElement);
    const amountQ = 10;
    const amountCategories = type ==='artist'? 12 : 24;
    const images = importImages();
    let i = type ==='artist'? 0 : 12;
    for(i;i<amountCategories;i++)
    {
        buildHtml(i,images[i*10]);
    }
    return categoriesElement;
}


  
function buildHtml(index,image){
    const list = document.querySelector('.category-items-container');
    const item= document.createElement('div');
    item.classList.add('category-item');
    item.id = index;
    item.style.backgroundImage = "url('"+image+"')";
    
    list.append(item);
}





export default createCategories;