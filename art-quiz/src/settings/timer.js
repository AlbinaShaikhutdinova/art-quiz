import { getSettingsInstance } from "../app/app";


export default class Timer{
    constructor(){
        
    }
    init(){
        this.stopFlag = true;
        this.settings = getSettingsInstance().getSettings();
        this.period= this.settings.answerTime;
        this.iterations = 10;
        this.timeLimit = this.period;
        this.updateTimerNumbers();
    }
    startTimerRound(questionNum, question){
        document.querySelector('#bar').style.width='0';
        this.question = question;
        this.stopFlag = false;
        if(this.iterations>questionNum)
            {
                this.startTimerQuestion();
                //this.updateTimerBar();
            }
        
    }
    startTimerQuestion(){
        setTimeout(this.timerHandler.bind(this), 1000);
    }
    timerHandler(){    
        this.timeLimit--;  
        this.updateTimerNumbers();
        this.updateTimerBar();
        this.checkForPeriodEnd();    
    }
    updateTimerBar(){
        //console.log(Math.floor((1-this.timeLimit/this.period)*100) +'%');
        document.querySelector('#bar').style.width = Math.floor((1-this.timeLimit/this.period)*100) +'%';
    }
    updateTimerNumbers(){
        document.querySelector('.time-left').textContent = `${this.timeLimit}/${this.period}`;
    }
    checkForPeriodEnd(){   
        if(this.timeLimit<1)
        {
            this.outOfTime();
        }
        else if(this.stopFlag)
        {
            this.stopTimer();
        }
        else this.startTimerQuestion();
    }
    outOfTime(){
        this.stopFlag=true;
        this.question.indicateWrongAnswer();
        this.stopTimer();     
    }
    stopTimer(){
       
        this.init();
    }
}