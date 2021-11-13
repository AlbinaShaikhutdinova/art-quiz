
export default class Question{
    constructor(qIndex){
        this.choices = [qIndex];
        this.populateChoices();
        this.answer = qIndex;
        console.log(this.choices);
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
 
}