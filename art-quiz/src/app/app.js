import createCategory from '../category/createCategories';
import Home from '../home/classHome';
import chooseCategoryType from '../category/chooseCategoryType';
import Quiz from '../quiz/Quiz';
import getFooter from '../footer/footer';
import htmlToElement from '../utils/htmlToElement';
import Footer from '../footer/footer';
import CategoriesPage from '../category/Categories';
import Header from '../header/header';
import Settings from '../settings/settings';
import Score from '../score/score';


let instances={};

const categories = new CategoriesPage();
const home = new Home(categories);
const footer = new Footer(categories, home);
const settings = new Settings(home,categories);
settings.init();
const header = new Header(settings);
const score = new Score();
function app(){

    
    instances = {categories: categories, 
        home: home,
        footer: footer,
        settings: settings,
        header: header};
    // getInstancesArray(instances);
    // //home.createHomePage();
    home.show();   // createCategories();
    // getHomeElement(home);
    // getCategoriesElement(categories);
    // getFooterElement(footer);
    //getHeaderElement(header);
    // getSettingsElement(settings);  
}

// function getInstancesArray(array){
//     return array;
// }

// function getHomeElement(home){
//     return home;
// }
// function getCategoriesElement(categories){
//     return categories;
// }
// function getFooterElement(footer){
//     return footer;
// }
function getSettingsInstance(){
    return settings;
}
function getScoreInstance(){
    return score;
}
function getHeaderElement(){
    return header;
}
function getActiveElement(){
    const mainPage = document.querySelector('main');
    for(let el of mainPage.children)
    {
        if(!el.classList.contains('hidden'))
            return el;
    }
    return -1;
}
 

function getInstanceOfHTMLElement(element){
    for(let key of Object.keys(instances))
    {
        if(element.classList.contains(key))
        {
            return instances[key];
        }
    }

}
// function getFooterPage(){
//     return document.querySelector('footer');
// }

// function getHomePage(){
//     return document.querySelector('.home');
// }

// function displayHome(prevPage){
//     toggleVisibility(getHomePage());
//     toggleVisibility(prevPage);
//     getFooterPage().querySelector('.nav-footer').style.bottom ='-20vh';
// }

// function createCategories(){
//     const categoriesPage = createCategory(12);
//     const categories = categoriesPage.getElementsByClassName('category-item');
//     for(let element of categories) {
//         element.addEventListener('click', getNewQuiz.bind(this, element.id,categoriesPage))
//     };

// }

// function displayCategories(id){
//     console.log(id);
//     toggleVisibility(getHomePage());
//     toggleVisibility(getCategoriesPage());
//     getFooterPage().querySelector('.nav-footer').style.bottom ='-10vh';
//     chooseCategoryType(id);
    
// }

// function getCategoriesPage(){ 
//     return document.querySelector('.categories');
// }

// function getScorePage(){

// }

function changePage(id){
    switch(id){
       case "nav-home": displayHome(getCategoriesPage());
       case "nav-category": ;
       case "nav-score": getScorePage();
    }
}
// function toggleVisibility(element) {
//     element.classList.toggle('hidden');
// }

// function getNewQuiz(id, prevPage){
//     toggleVisibility(prevPage);
//     const game =new Quiz();
//     game.init(id);
// }

export  {app, changePage, getActiveElement, getInstanceOfHTMLElement,getScoreInstance, getHeaderElement, getSettingsInstance};