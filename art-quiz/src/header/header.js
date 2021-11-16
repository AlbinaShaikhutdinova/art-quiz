import header from './header.html';
import htmlToElement from '../utils/htmlToElement';
import './style.scss';

export default class Header{
    constructor(){
        const headerElement = htmlToElement(header);
        document.querySelector('header').append(headerElement);
    }
}