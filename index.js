$(document).ready(function(){

// create event listeners
$("#remaining-time").show();
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
    // answerpic:{
    //     q1:'Neapolitan mastiff',
    //     q2:'Avocado',
    //     q3:'Chihuahua',
    //     q4:'African Wild Dogs',
    //     q5:'no'

    // }   // so instead of making an array and a fx, why not create a div for each image and write a shorter fx
    // a shorter fx that changes the default css of "hide" to show for the respective div. css sizing and all. simple, efficiaent
    //less javascript clutter

    //initialize the game and establish methods of play
    startGame: function(){
        trivia.currentSet =0;
        trivia.correct =0;
        trivia.incorrect =0;
        trivia.unanswered =0;
        ca =0;
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
        console.log('time show');
//ask 1st q after start pressed
        trivia.nextQuestion();
    },
    // loop and display q's
    nextQuestion : function(){

        //set timer to answer
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        //prevent timer speed up
        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning,1500);
        }

        // make fx to get all questions then index current one
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        // an array of all the options for current q
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        //populate all the guess options in the html
        $.each(questionOptions, function(index, key){
            $('#options').append($('<button class="option btn-s">'+key+'</button>'));
        })

        $('#timer').css("background-color","transparent");
        console.log("next-q-ran, color rest tmr??");

    },

    timerRunning : function(){
        // if timer still has time and questions are left
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
            $('#timer').text(trivia.timer);
            trivia.timer--;
                if(trivia.timer === 4){
                    $('#timer').css("background-color","red","duration", "2s"); //duration add did not work.. needs animation but that affects the transition time...
                    
                }
        }
    
        //if time is =0 and q is unanswered run the result as a loss
        else if(trivia.timer === -1){
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 3000);
            $('#results').html('<h3>Out of time! The answer is '+Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
        }

        // show result upon all q's being answered
        else if(trivia.currentSet === Object.keys(trivia.questions).length){

            // add results to their respective html elements
            $('#results')
                .html('<h3>Thanks for playing! Lets see how dog-smart you are!</h3>'+
                '<p>Correct: '+ trivia.correct +'</p>'+
                '<p>Incorrect: '+ trivia.incorrect +'</p>'+
                '<p>Unaswered: '+ trivia.unanswered +'</p>'+
                '<p>Test your memory, try again!</p>');

        //hide game section
            $('#game').hide();

            // display a start button.... I tried this at the beginning and it failed. so upon research, i put it here.
            $('#start').show();

        }       
    },

    // picky : function(){
    //     if(trivia.answers.index === 0){
    //         $('mastiff').css("visibilty", "show");
    //         console.log("mastiff");
    //     }
    // },
    // no slideshow today...

    // function to check the answer picked
    guessChecker : function() {
        // the timer id for gameResult and to setTimeout
        var resultId;

        // answer to current q from array
        // var ca = ca;
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        // ca++;
        // console.log(ca);

        // pictrig : function(currentAnswer) {
        //     if(currentAnswer.ca === 1){
        //         $('mastiff').css("visibilty", "show");
        //     }   
        // }
        // if answers[1]
        // pictrig(currentAnswer);
        // if the option picked matches the answer add to correct

        if($(this).text() === currentAnswer){
            // style btn green if correct
            $(this).css("background-color","green");

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 3000);
            $('#results').html('<h3>You, are surpririsngly, right... dont judge a book by its cover I guess!</h3>');
            console.log("right")
        }
            // now for the incorrect options
        else{
            $(this).css("background-color", "red");
         /// i dont wanna use bootstrap, shits wack. add class or style via css
            
         trivia.incorrect++;
         clearInterval(trivia.timerId);
         resultId = setTimeout(trivia.guessResult, 3000);
         $('#results').html('<h3>You\'re better than this!! The answer is: '+ currentAnswer +'</h3>');
        
         console.log("wrong");
        }

        
        
    },

    // picky();

    // fx to rm previous question 
    guessResult : function(){

        //incremnt to next q set
        trivia.currentSet++;

        $('.option').remove();
        $('#results h3').remove();
        console.log("remove ops & #rslts");

        trivia.nextQuestion();
    }
}