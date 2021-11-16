import indexQuestion from './indexQuestion.html';
import pic from '../utils/importPics';
import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import Round from '../round/classRound';

import './style.scss';

export default class Question{
    constructor(round){
        this.round = round;
        this.questionPage = htmlToElement(indexQuestion);
        const title = this.questionPage.querySelector('.question-title');  
        const img = new Image();
        img.classList.add('question-image');
        this.questionPage.querySelector('.question-picture').append(img);    
        document.querySelector('main').append(this.questionPage);
        const items = document.getElementsByClassName('answer-item');
        for(let el of items)
        {
            if(this.round.index<12)
            {
                const button = document.createElement('button');
                button.classList.add('answer-button');
                el.append(button);
            }
            else{
                const img = new Image();
                img.classList.add('image-answer');
                el.append(img);
            }
            el.addEventListener('click',this.round.processUserAnswer.bind(this.round,el))
        }
        this.data = images;   
    }
    init(qIndex){
        this.choices = [qIndex];
        this.populateChoices();
        this.answer = qIndex;
        console.log(this.choices);
        this.fillQuestionTemplate();
    }
    isCorrect(guess){
        console.log(guess, this.answer);
        return this.answer == guess;
    }
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    populateChoices(){
        while(this.choices.length<4){
            let rand = this.getRandom(0,240)
            if(this.choices.includes(rand))
                continue;
            this.choices.push(rand);
        }
        this.shuffle(this.choices);
    }
    fillQuestionTemplate(){
        const title = document.querySelector('.question-title');
        const imageNum = this.data[this.answer].imageNum;
        const items = document.getElementsByClassName('answer-item');
        if(this.round.index<12)
        {
            title.textContent = 'Who is the author of this picture?';   
            document.querySelector('.question-image').src = pic[imageNum];      
            for(let i=0;i<4;i++)
            {
                items[i].id = this.choices[i];
                items[i].querySelector('.answer-button').textContent = this.data[this.choices[i]].author; 
                //items[i].append(button); 
            }
        }
        else{
            title.textContent =  `Which is ${this.data[this.answer].author}\'s picture?`;
            for(let i=0;i<4;i++)
            {   const img = items[i].querySelector('.image-answer');
                img.src = pic[this.choices[i]];
                // items[i].querySelector('.image-answer').style.maxWidth='160px';
                // items[i].style.height='160px';
                // items[i].style.backgroundImage = "url('"+pic[this.choices[i]]+"')";
                // items[i].style.backgroundSize = 'contain';
                // items[i].style.backgroundRepeat = 'no-repeat';
                items[i].id= this.choices[i];
            }
            
        }
    }
    showQuestionPage(){
        this.questionPage.classList.remove('hidden');
    }
    hideQuestionPage(){
        this.questionPage.classList.add('hidden');
    }
 
 
}