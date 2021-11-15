import footer from './indexFooter.html';
import {changePage} from '../app/app';
import htmlToElement from '../utils/htmlToElement';
import './style.scss';

export default function getFooter(){
    const footerElement = htmlToElement(footer);
    document.querySelector('footer').append(footerElement);
    const footerLinks = footerElement.getElementsByClassName('nav-link');
    for(let item of footerLinks)
    {
        item.addEventListener('click', changePage.bind(this, item.id));
    }
    return footerElement;
}