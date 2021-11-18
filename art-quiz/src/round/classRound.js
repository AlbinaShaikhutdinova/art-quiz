import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import round from './roundIndex.html';
import Question from '../question/classQuestion';
import result from './roundResult.html';
import Timer from '../settings/timer';
import { getHeaderElement } from '../app/app';


//create a category
//get data from local storage about played rounds
//save data to local storage
//get a preview picture for choice page
class Round{
    constructor(){     
        this.resultPage = htmlToElement(result);
        this.timer = new Timer();
        this.question = new Question(this, this.timer); 
        
    }
    init(index,questionsAmount=10, sameCategory=false){
        this.score = 0;
        this.answers = [];
        this.qIndex =0;
        this.categoriesAmount=12;
        console.log(index);
        this.index= index.toString().match(/\d+/g);
        this.qAmount = questionsAmount;
        this.currentQuestionIndex=this.index*this.qAmount;
        this.qIndexInRound =1;
        this.title = `Category ${this.index}`;  
        // if(sameCategory)
        // this.question.buildTypeDependentFeatures(index);
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

    // display(){
    //     const newRound = htmlToElement(round);
    //     newRound.querySelector('.page-title').textContent = this.title;
    //     this.roundButton =  newRound.querySelector('.start-round__button');
    //     document.querySelector('main').append(newRound);
    //     return newRound;
    // }

    processUserAnswer(){
        this.currentQuestionIndex++;
        if(this.qIndex<this.qAmount)
        {
            this.getNextQuestion();   
        }    
        else{
            this.finishRound();
        }
    }
    startRound(categories){
        this.categories=categories;
        getHeaderElement().showGameMode();
        this.getNextQuestion();
        this.question.showQuestionPage();
        
    }
    getNextQuestion(){     
        this.timer.init();
        this.timer.startTimerRound(this.qIndex, this.question);   
        this.question.init(this.currentQuestionIndex);  
    }

    finishRound(){
        this.saveResult();
        const result = this.getCurrentScore();
        this.showFinishModal(result);
        this.categories.updateCategoryStyle(document.getElementById('category'+this.index),this.index);
        getHeaderElement().showDefaultMode();
    }
    showFinishModal(result){
        this.evaluateResult(result);
        if((this.index+1)%this.categoriesAmount===0)
        {
            document.querySelector('.modal-category-end').textContent='You answered all questions in this category!';
            document.querySelector('.modal-result__button.next').classList.add('hidden');
        }
        document.querySelector('.modal-result__score').textContent=`${result}/${this.qAmount}`;
        document.querySelector('.modal-result').classList.remove('hidden');
    }

    evaluateResult(result){
        if(result===this.qAmount)
        {
            document.querySelector('.modal-result__img').classList.add('great-result');
            document.querySelector('.modal-result__text').textContent='Grand Result!';
        }
        else{
            document.querySelector('.modal-result__img').classList.add('good-result');
            document.querySelector('.modal-result__text').textContent='Congratulations!';
        }
    }

    getCategories(){    
        this.categories.show();
        // this.init(++this.index);
        // this.startRound();
    }

    
}

export default Round;