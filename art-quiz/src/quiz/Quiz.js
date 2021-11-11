import createCategory from '../category/createCategories';
import Home from '../home/classHome';
import images from '../assets/images';
import Category from '../category/classCategory';

export default class Quiz{
    init(){
        const data = images;
        const home = new Home();
        for(let button of home.buttons) {
            button.addEventListener('click', this.showCategoriesPage.bind(this,button.id, home, data));
        };
        
    }
    showCategoriesPage(type, home,data){ 
        const categoriesPage = createCategory(type);
        const categories = categoriesPage.getElementsByClassName('category-item');
        for(let element of categories) {
            element.addEventListener('click', this.displayCategory.bind(this, element.id,categoriesPage))
        };
        this.toggleVisibility(home.homeElement);
        this.toggleVisibility(categoriesPage);
    }
    toggleVisibility(element) {
        element.classList.toggle('hidden');
    }
    displayCategory(index, categoriesPage){
        this.toggleVisibility(categoriesPage);
        this.category = new Category(index);
        this.category.display();
    }

}