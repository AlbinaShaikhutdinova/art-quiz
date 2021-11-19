import indexQuestion from './indexQuestion.html';
import pic from '../utils/importPics';
import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import {getSettingsInstance } from '../app/app';



import './style.scss';

export default class Question{
    constructor(round, timer){
       
        this.timer = timer;
        this.round = round;
        this.questionPage = htmlToElement(indexQuestion);
        const title = this.questionPage.querySelector('.question-title');  
        const img = new Image();
        img.classList.add('question-image');
        this.questionPage.querySelector('.question-picture').append(img);    
        document.querySelector('main').append(this.questionPage);
        const items = document.getElementsByClassName('answer-item');
        for(let el of items){
            el.addEventListener('click',this.showUserAnswerInfo.bind(this,el))
        }
        
        document.querySelector('.modal-result__button.modal-home').addEventListener('click', this.getHomePage.bind(this));
        document.querySelector('.modal-result__button.next').addEventListener('click', this.getNextRound.bind(this));
        this.questionPage.querySelector('.modal-button').addEventListener('click', this.getNextQuestion.bind(this) )
        
       
        this.data = images;   
    }

    buildTypeDependentFeatures(index){
        const items = document.getElementsByClassName('answer-item');
        for(let el of items)
        {
            if(index<12)
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
            
        }
    }

    init(qIndex){
        this.settings = getSettingsInstance();
        console.log(this.timer);  
        this.buildTypeDependentFeatures(this.round.index);
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
            document.querySelector('.question-image').classList.remove('hidden');
            document.querySelector('.question-image').src = pic[imageNum];      
            for(let i=0;i<4;i++)
            {
                items[i].id =this.choices[i];
                items[i].querySelector('.answer-button').textContent = this.data[this.choices[i]].author; 
            }
        }
        else{
            document.querySelector('.question-image').classList.add('hidden');
            title.textContent =  `Which is ${this.data[this.answer].author}\'s picture?`;
            for(let i=0;i<4;i++)
            {   const img = items[i].querySelector('.image-answer');
                img.src = pic[this.choices[i]];
                items[i].id= this.choices[i];
            }
            
        }
    }
    showQuestionPage(){
        this.active=true;
        this.questionPage.classList.remove('hidden');
    }
    hideQuestionPage(){
        this.active=false;
        this.questionPage.classList.add('hidden');
    }
    showUserAnswerInfo(el){
        this.timer.stopFlag = true;
        this.getAnswerSignal(this.isCorrect(el.id));
        this.round.saveAnswer(this.isCorrect(el.id));
        const answerElement = document.getElementById(el.id);
        console.log(this,this.answer,answerElement)
        if(this.round.index<12)
        {   const domElement = answerElement.querySelector('.answer-button');
            this.putAnswerSign(answerElement,domElement,'right-answer-btn', 'wrong-answer-btn');
        }
        else{    
            const domElement = answerElement.querySelector('.image-answer');  
            this.putAnswerSign(answerElement,domElement,'wrap-right-image', 'wrap-wrong-image');    
        }
        setTimeout(this.showModalPicture.bind(this,el),400);
    }
    getAnswerSignal(correct){
        this.settings.playAnswerSignal(correct);

    }
    showModalPicture(el){
        
        document.querySelector('.modal-content.answer').style.marginTop='20vh';
        document.querySelector('.modal-answer').classList.remove('hidden');     
        this.questionPage.querySelector('.modal-img-image').src =pic[this.answer];
        this.putAnswerSign(el,document.querySelector('.modal-img-sign'),'right-answer-sign', 'wrong-answer-sign')
        document.querySelector('.modal-description-text').textContent = this.data[this.answer].author+", " + this.data[this.answer].year;
    }

    getNextQuestion(){
        this.cleanPage();
        this.round.processUserAnswer();
    }

    cleanPage(){ 
        document.querySelector('.modal-answer').classList.add('hidden'); 
        this.removeAnswerSign(document.querySelector('.modal-img-sign'),'right-answer-sign', 'wrong-answer-sign');
        this.removeTypeDependentFeatures();  
    }
    removeTypeDependentFeatures(){
        const items = document.getElementsByClassName('answer-item');
        for(let el of items)
        {
            el.removeEventListener('click',this.showUserAnswerInfo.bind());
            el.innerHTML="";     
        }
    }

    putAnswerSign(el,domElement,classNameRight, classNameWrong){
        if(this.isCorrect(el.id))
        {
            domElement.classList.add(classNameRight);
        }
        else{
            domElement.classList.add(classNameWrong)
        }
    }
    indicateWrongAnswer(){
        this.round.saveAnswer(false);
        //this.round.currentQuestionIndex++;
        this.getAnswerSignal(false);
        document.querySelector('.modal-img-sign').classList.add('wrong-answer-sign');
        document.querySelector('.modal-content.answer').style.marginTop='20vh';
        document.querySelector('.modal-answer').classList.remove('hidden');     
        this.questionPage.querySelector('.modal-img-image').src =pic[this.answer];
        document.querySelector('.modal-description-text').textContent = this.data[this.answer].author+", " + this.data[this.answer].year;
       
    }
    removeAnswerSign(element,classNameRight, classNameWrong){
        element.classList.remove(classNameWrong);    
        element.classList.remove(classNameRight);   
    }

    cleanClosingModal(){
        document.querySelector('.modal-result__button.next').classList.remove('hidden');
        document.querySelector('.modal-result__img').classList.remove('great-result');
        document.querySelector('.modal-result__img').classList.remove('grand-result');
        document.querySelector('.modal-result').classList.add('hidden');
    }

    getNextRound(){
        this.cleanClosingModal();
        this.hideQuestionPage();
        this.round.getCategories();
    }
    
    getHomePage(){
        this.cleanClosingModal();
        this.hideQuestionPage();
        document.querySelector('.home').classList.remove('hidden')
    }

 
 
 
}