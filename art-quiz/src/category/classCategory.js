import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import round from './categoryIndex.html';

//create a category
//get data from local storage about played rounds
//save data to local storage
//get a preview picture for choice page
class Category{
    constructor(index){
        this.index=index;
        this.title = `Category ${index}`;
        this.score = 0;
        this.answers = [];
        this.qIndex =0;
    }

    getCurrentScore(){
        return this.score;
    }
    saveAnswer(status){
        this.answers[this.qIndex] = status;
        this.qIndex++;
        if(status) this.score++;
    }
    saveResult(){
        localStorage.setItem(this.index,JSON.stringify(this.answers));
        localStorage.setItem(this.index+'score',JSON.stringify(this.score));
    }
    showCurrentResult(){
        return this.answers;
    }
    getPreviousScore(){
        return localStorage.getItem(this.index+'score');
    }

    getPreviousAnswers(){
        return localStorage.getItem(this.index);
    }

    display(){
        const newRound = htmlToElement(round);
        newRound.querySelector('.page-title').textContent = this.title;
        this.roundButton =  newRound.querySelector('.start-round__button');
        document.querySelector('main').append(newRound);
        return newRound;
    }
    
}

export default Category;