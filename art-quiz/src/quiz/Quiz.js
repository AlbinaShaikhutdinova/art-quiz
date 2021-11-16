import createCategory from '../category/createCategories';
import Home from '../home/classHome';
import images from '../assets/images';
import Round from '../round/classRound';
import htmlToElement from '../utils/htmlToElement';
//import indexQuestion from './indexQuestion.html';
import Question from '../question/classQuestion';
import importImages from '../utils/importImages';
import pic from '../utils/importPics';

export default class Quiz{
    constructor(index,questionsAmount=10){
        this.currentQuestionIndex=index*questionsAmount;
        this.index = index;
        this.qAmount = questionsAmount;
        this.qIndexInRound =1;
        this.data = images;
        this.score = 0;
        this.round = new Round(index);
        //this.startPage = this.round.display();
        this.images = importImages();
    }
    init(){        
        //this.displayNewRound();
    }
    displayNewRound(){
        const roundButton =  this.startPage.querySelector('.start-round__button');
        if(this.round.getPreviousScore())
        {
            const answers = this.round.getPreviousAnswers();
            for(let i =0;i<10;i++){
                const item = document.createElement('div');
                item.classList.add('round-results__item');
                if(answers[i])
                {
                    item.classList.add('checked')
                }
                this.startPage.querySelector('.round-results').append(item);
            }
            roundButton.textContent = 'play again';
        }
        else{
            roundButton.textContent = 'start round';
        }
        roundButton.addEventListener('click', this.startRound.bind(this))
    }

    /// make a function for randomizing questions in a round
    startRound(){
        //this.toggleVisibility(this.startPage);
        this.buildQuestionHTML();  
        this.getNextQuestion();
    }
    fillQuestionTemplate(question){
        const title = document.querySelector('.question-title');
        const imageNum = this.data[question.answer].imageNum;
        const items = document.getElementsByClassName('answer-item');
        if(this.index<12)
        {
            title.textContent = 'Who is the author of this picture?';   
            document.querySelector('.question-image').src = pic[imageNum];
           
            for(let i=0;i<4;i++)
            {
                items[i].id = question.choices[i];
                items[i].textContent = this.data[question.choices[i]].author;  
            }
        }
        else{
            title.textContent =  `Which is ${this.data[question.answer].author}\'s picture?`;
            for(let i=0;i<4;i++)
            {
                //const img = new Image();
                //img.src = `${this.images[this.question.choices[i]]}`;
                
                items[i].style.width='200px';
                items[i].style.height='200px';
                items[i].style.backgroundImage = "url('"+pic[question.choices[i]]+"')";
                items[i].style.backgroundSize = 'cover';
                items[i].id= question.choices[i];
                //items[i].append(img);
            }
            
        }
    }

    buildQuestionHTML(){
        const questionPage = htmlToElement(indexQuestion);
        const title = questionPage.querySelector('.question-title');  
        const img = new Image();
        img.classList.add('question-image');
        questionPage.querySelector('.question-picture').append(img);
        document.querySelector('main').append(questionPage);
        const items = document.getElementsByClassName('answer-item');
        for(let el of items)
        {
            console.log(el);
            el.addEventListener('click',this.processUserAnswer.bind(this,el))
        }
    }

    processUserAnswer(el){
        if(true)
        {

        }
        this.round.saveAnswer(this.question.isCorrect(el.id));
        this.currentQuestionIndex++;
        if(this.qIndexInRound<this.qAmount)
        {
            this.qIndexInRound++;
            this.getNextQuestion();   
        }    
        else{
            this.finishRound();
        }
    }
    getNextQuestion(){
     
        this.question = new Question(this.currentQuestionIndex);  
        this.fillQuestionTemplate(this.question);  
    }

    finishRound(){
        this.round.saveResult();
        const result = this.round.getCurrentScore();
        this.toggleVisibility(document.querySelector('.round-result'));
        this.toggleVisibility(document.querySelector('.question-page'));
        document.querySelector('.round-result').textContent = `Score is ${result}/${this.qAmount}`;
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
    // displayCategory(index, categoriesPage){
    //     this.toggleVisibility(categoriesPage);
    //     this.category = new Category(index);
    //     this.category.display();
    // }

}