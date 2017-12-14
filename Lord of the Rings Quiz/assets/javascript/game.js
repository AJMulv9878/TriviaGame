$(document).ready(function() {

var triviaGame = [ 
{
	question: "What is the name of the black riders flying mounts?",
	choices: ["Nazgul", "Dragons", "Fell-beast", "Urak-hai"],
	answer: "Fell-beast",
	sound: "assets/sound/beast.m4a",
	img: "assets/images/beast.gif",
	timeout: 4000
},
{
	question: "What elven kingdom is Legolas from?",
	choices: ["Gondolin", "Hithlum", "Mirkwood", "Doriath"],
	answer: "Mirkwood",
	sound: "assets/sound/legolas.m4a",
	img: "assets/images/legolas.gif",
	timeout: 2000
},
{
	question: "Who led the crafting of the rings of power?",
	choices: ["Sauron", "Celebrimbor", "Galadriel", "Elrond"],
	answer: "Celebrimbor",
	sound: "assets/sound/celebrimbor.m4a",
	img: "assets/images/celebrimbor.gif",
	timeout: 6000
},
{
	question: "Who struck down Sauron?",
	choices: ["Isildur", "Elendil", "Aragorn", "Elrond"],
	answer: "Isildur",
	sound: "assets/sound/isildur.m4a",
	img:"assets/images/isildur.gif",
	timeout: 7000 
},
{
	question: "Who is the lord of Rivendell?",
	choices: ["Elrond", "Galadriel", "Elendil", "Legolas"],
	answer: "Elrond",
	sound: "assets/sound/elrond.m4a",
	img: "assets/images/elrond.gif",
	timeout: 4000
},
{
	question: "Who acommpanies Frodo to the Undying Lands?",
	choices: ["Aragorn", "Samwise", "Gandalf", "Gimli"],
	answer: "Gandalf",
	sound: "assets/sound/gandalf.m4a",
	img: "assets/images/gandalf.gif",
	timeout: 5000
},
{
	question: "Who is the lord of the Ringwraiths?",
	choices: ["Witch-king of Angmar", "Sauron", "Saruman", "Khamul"],
	answer: "Witch-king of Angmar",
	sound: "assets/sound/angmar.m4a",
	img: "assets/images/angmar.gif",
	timeout: 6000
},
{
	question: "Who wasn't a member of the fellowship of the ring?",
	choices: ["Boromir", "Faramir", "Gandalf", "Pippin"],
	answer: "Faramir",
	sound: "assets/sound/faramir.m4a",
	img:"assets/images/faramir.gif",
	timeout: 5000
},
{
	question: "Where is the white tree of Gondor?",
	choices: ["Minas Tirith", "Osgiliath", "Minas Morgul", "Calembel"],
	answer: "Minas Tirith",
	sound: "assets/sound/tree.m4a",
	img: "assets/images/tree.gif",
	timeout: 9000
},{
	question: "Name of Aragorn's sword?",
	choices: ["Anduril", "Glamdring", "Sting", "Narsil"],
	answer: "Anduril",
	sound: "assets/sound/anduril.m4a",
	img: "assets/images/anduril.gif",
	timeout: 5000
}
];

var audio = document.createElement('audio');
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionNumber = 0;
var timer = 15;
var intervalId;

$('#start-game').on("click", function() {
	
	game();
	
});

function game() {
	var currentQuestion = triviaGame[questionNumber];

	$('#images').html("");

	$('#question-answer').html(currentQuestion.question);

	$('<div/>', {
		id: 'choices',
		class: 'container'
	}).appendTo('#question-answer');
		
	
	for (i = 0; i < currentQuestion.choices.length; i++) {
		var button = $('<input />', {
			type: 'button',
			class: 'choice',
			text: currentQuestion.choices[i],
			value: currentQuestion.choices[i]
		});	

		$('<div/>', {
			id: 'choice' + questionNumber + i,
			class: 'row',
			append: button
		}).appendTo('#choices');
	}

	$('#button-row').html(timer);

	intervalId = setInterval(questionTimer, 1000);

	$('.choice').on("click", function() {
		if (currentQuestion.answer === this.value) {
			correct++;
			clearInterval(intervalId);
			timer = 15;

			$('#button-row').html("Correct!");
			$('#question-answer').html(currentQuestion.answer + " is the right answer!");
			$('#images').append('<img src=' + triviaGame[questionNumber].img + ' />');

			audio.src = currentQuestion.sound;
			audio.play();
			
			setTimeout(nextQuestion, triviaGame[questionNumber].timeout);
		}

		else {
			incorrect++;
			clearInterval(intervalId);
			timer = 15;

			$('#button-row').html("Incorrect!");
			$('#question-answer').html(currentQuestion.answer + " was the right answer!");
			$('#images').append('<img src=' + triviaGame[questionNumber].img + ' />');

			audio.src = currentQuestion.sound;
			audio.play();

			setTimeout(nextQuestion, triviaGame[questionNumber].timeout);
		}
	});
	
}

function nextQuestion() {
	questionNumber++;

	if (questionNumber === 10) {
		$('#images').html("");
		var reset = "Reset";
		questionNumber = 0;
		$('<button />', {
			class: 'reset',
			text: reset
		}).appendTo($('#button-row').empty());

		$('#question-answer').html("Thanks for playing!");
		$('<div/>', {
			text: 'Correct: ' + correct + ' Incorrect: ' + incorrect + ' Unanswered: ' + unanswered
		}).appendTo('#question-answer');

		$('.reset').on("click", function() {
			timer = 15;
			correct = 0;
			unanswered = 0;
			incorrect = 0;
			game();
		});

	}

	else {
		game();
	}
}

function questionTimer() {

	timer--

	$('#button-row').html(timer);

	if (timer === 0) {
		clearInterval(intervalId);
		unanswered++;

		timer = 15;

		$('#button-row').html("You didn't select anything...");
		$('#question-answer').html(triviaGame[questionNumber].answer + " was the right answer!");
		$('#images').append('<img src=' + triviaGame[questionNumber].img + ' />');

		audio.src = triviaGame[questionNumber].sound;
		audio.play();
			
		setTimeout(nextQuestion, triviaGame[questionNumber].timeout);
	}
}









});