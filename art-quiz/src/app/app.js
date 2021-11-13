import createCategory from '../category/createCategories';
import Home from '../home/classHome';
import images from '../assets/images';
import Category from '../category/classCategory';
import Quiz from '../quiz/Quiz';

export default function app(){
    const home = new Home();
    for(let button of home.buttons) {
        button.addEventListener('click', showCategoriesPage.bind(this,button.id, home));
    };      
}

function showCategoriesPage(type, home){ 
    const categoriesPage = createCategory(type);
    const categories = categoriesPage.getElementsByClassName('category-item');
    for(let element of categories) {
        element.addEventListener('click', getNewQuiz.bind(this, element.id,categoriesPage))
    };
    toggleVisibility(home.homeElement);
    toggleVisibility(categoriesPage);
}
 function toggleVisibility(element) {
    element.classList.toggle('hidden');
}

function getNewQuiz(id, prevPage){
    toggleVisibility(prevPage);
    const game =new Quiz();
    game.init(id);
}