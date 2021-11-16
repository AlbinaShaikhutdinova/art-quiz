import createCategory from '../category/createCategories';
import Home from '../home/classHome';
import chooseCategoryType from '../category/chooseCategoryType';
import Quiz from '../quiz/Quiz';
import getFooter from '../footer/footer';
import htmlToElement from '../utils/htmlToElement';
import Footer from '../footer/footer';
import CategoriesPage from '../category/Categories';
import Header from '../header/header';

function app(){
    const header = new Header();
    const categories = new CategoriesPage();
    const home = new Home(categories);
    const footer = new Footer(categories, home);
    
    //home.createHomePage();
    home.showHome();   // createCategories();
    // const footerElement = getFooter();
    // for(let button of home.buttons) {
    //     button.addEventListener('click', displayCategories.bind(this,button.id));
    // };     

}
 
function getFooterPage(){
    return document.querySelector('footer');
}

function getHomePage(){
    return document.querySelector('.home');
}

function displayHome(prevPage){
    toggleVisibility(getHomePage());
    toggleVisibility(prevPage);
    getFooterPage().querySelector('.nav-footer').style.bottom ='-20vh';
}

function createCategories(){
    const categoriesPage = createCategory(12);
    const categories = categoriesPage.getElementsByClassName('category-item');
    for(let element of categories) {
        element.addEventListener('click', getNewQuiz.bind(this, element.id,categoriesPage))
    };

}

function displayCategories(id){
    console.log(id);
    toggleVisibility(getHomePage());
    toggleVisibility(getCategoriesPage());
    getFooterPage().querySelector('.nav-footer').style.bottom ='-10vh';
    chooseCategoryType(id);
    
}

function getCategoriesPage(){ 
    return document.querySelector('.categories');
}

function getScorePage(){

}

function changePage(id){
    switch(id){
       case "nav-home": displayHome(getCategoriesPage());
       case "nav-category": ;
       case "nav-score": getScorePage();
    }
}
function toggleVisibility(element) {
    element.classList.toggle('hidden');
}

function getNewQuiz(id, prevPage){
    toggleVisibility(prevPage);
    const game =new Quiz();
    game.init(id);
}

export  {app, changePage};