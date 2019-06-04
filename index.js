$(document).ready(function(){

// create event listeners
$("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

// create a var for trivia
var trivia = {
    //trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',


    // questions
    questions: {
        q1: 'what breed is the largest?',
        q2: 'which of these is toxic to dogs?',
        q3: 'which of these dogs has the most reported bites?',
        q4: 'which of these dogs is endangered?',
        q5: 'Is the hyena related to dogs?',
    },
    options:{
        q1:['Neapolitan mastiff','Scottish Deerhound','Newfoundland'],
        q2:[ 'Blackberries','Blueberries','Avocado','Bananas'],
        q3:[ 'Papillion','Dalmatian','Basset Hound','Chihuahua'],
        q4:['Coonhounds', 'Chesapeak Retrievers', 'African Wild Dogs', 'akita' ],
        q5:['yes','no' ]    
    },
    answers: {
        q1:'Neapolitan mastiff',
        q2:'Avocado',
        q3:'Chihuahua',
        q4:'African Wild Dogs',
        q5:'no'
    },

    //initialize the game and establish methods of play
    startGame: function(){
        trivia.currentSet =0;
        trivia.correct =0;
        trivia.incorrect =0;
        trivia.unanswered =0;
        clearInterval(trivia.timerId);
        //show game div
        $('#game').show();
        //empty prior results
        $('#results').html('');
        //show timer
        $('#timer').text(trivia.timer);
        //hide the start button on play
        $('#start').hide();

        $('#remaining-time').show();
//ask 1st q after start pressed
        trivia.nextQuestion();
    },
    // loop and display q's
    nextQuestion :function(){

        //set timer to answer
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);
    }

        

    
}
