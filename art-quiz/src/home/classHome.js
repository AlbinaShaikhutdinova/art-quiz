import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import homePage from './index.html';
import './style.scss';
class homeClass{
    constructor(){
        this.homePage  = htmlToElement(homePage);
        const main = document.querySelector('main');
        main.append(this.homePage);
        this.buttonArtist = document.querySelector('.artist');
        this.buttonPicture = document.querySelector('.picture');
        this.category = {};

        this.buttonArtist.addEventListener('click', this.showCategories.bind(this));
        this.buttonPicture.addEventListener('click', this.showCategories.bind(this));
    }
    showCategories()
    {
        //this.category = new Category;
    }
    
}
export default homeClass;