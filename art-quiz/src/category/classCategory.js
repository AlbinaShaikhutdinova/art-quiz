import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import round from './categoryIndex.html';

//create a category
//get data from local storage about played rounds
//save data to local storage
//get a preview picture for choice page
class Category{
    constructor(index,  score = 0){
        this.index=index;
        this.title = `Category ${index}`;
        this.score = score;
    }
    display(){
        const newRound = htmlToElement(round);
        newRound.querySelector('.page-title').textContent = this.title;
        this.roundButton =  newRound.querySelector('.start-round__button');
        if(this.score)
        {
            for(let i =0;i<10;i++){
                const item = document.createElement('div');
                item.classList.add('round-results__item');
                if(score[i])
                {
                    item.classList.add('checked')
                }
                newRound.querySelector('.round-results').append(item);
            }
            this.roundButton.textContent = 'play again';
        }
        else{
            this.roundButton.textContent = 'start round';
        }
        document.querySelector('main').append(newRound);
    }
    
}

export default Category;