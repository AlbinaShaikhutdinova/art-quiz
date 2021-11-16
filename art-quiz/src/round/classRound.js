import images from '../assets/images';
import htmlToElement from '../utils/htmlToElement';
import round from './roundIndex.html';
import Question from '../question/classQuestion';
import result from './roundResult.html';

//create a category
//get data from local storage about played rounds
//save data to local storage
//get a preview picture for choice page
class Round{
    constructor(){   
        this.score = 0;
        this.answers = [];
        this.qIndex =0;
        this.resultPage = htmlToElement(result);
        
    }
    init(index,questionsAmount=10){
        console.log(index);
        this.index=index;
        this.qAmount = questionsAmount;
        this.currentQuestionIndex=index*this.qAmount;
        this.qIndexInRound =1;
        this.title = `Category ${index}`;
        this.question = new Question(this);  
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

    processUserAnswer(el){
        if(true)
        {

        }
        this.saveAnswer(this.question.isCorrect(el.id));
        this.currentQuestionIndex++;
        if(this.qIndex<this.qAmount)
        {
            // this.qIndexInRound++;
            this.getNextQuestion();   
        }    
        else{
            this.finishRound();
        }
    }
    startRound(){
        this.getNextQuestion();
        this.question.showQuestionPage();
    }
    getNextQuestion(){        
        this.question.init(this.currentQuestionIndex);  
    }

    finishRound(){
        this.saveResult();
        const result = this.getCurrentScore();
        this.question.hideQuestionPage();
        this.resultPage.classList.remove('hidden');
        document.querySelector('.round-result').textContent = `Score is ${result}/${this.qAmount}`;
    }

    
}

export default Round;