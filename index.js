const QUIZ = [ 
	{
		question: `Let's start off easy. What is my cat's name?`,
		a: `Fuzzy`,
		b: `Tina`,
		c: `Turd`,
		d: `Hannah`,
		correct: `Turd`,
	}, 
	{
		question: `What is Turd's favorite room of the house that she cannot stand to be locked out of?`,
		a: `Bathroom`,
		b: `Bedroom`,
		c: `Closet`,
		d: `Balcony`,
		correct: `Bathroom`,
	},
	{
		question: `What does Turd hate the most about the other cat?`,
		a: `She gets the most attention`,
		b: `She doesn't bury her poop in the litter`,
		c: `She hogs all the food`,
		d: `She takes over the best nap spots`,
		correct: `She doesn't bury her poop in the litter`,
	},
	{
		question: `Is Turd a good cat?`,
		a: `She's the best cat ever`,
		b: `She's super sweet but so destructive`,
		c: `She's nice to people but not to other cats`,
		d: `She's very mean`,
		correct: `She's super sweet but so destructive`,
	},
	{
		question: `When is Turd's birthday?`,
		a: `Halloween`,
		b: `Christmas`,
		c: `April Fool's Day`,
		d: `St. Patrick's Day`,
		correct: `April Fool's Day`,
	},
	{
		question: `What motivates Turd to move the most?`,
		a: `When a door is opened`,
		b: `When the treat jar shakes`,
		c: `When she can hear a bird outside`,
		d: `Nothing. Turd sucks and never moves`,
		correct: `When the treat jar shakes`,
	},
	{
		question: `Turd does all of these tricks, except one. Which one?`,
		a: `Beg on hind legs`,
		b: `Obstacle course`,
		c: `Sit`,
		d: `Shake`,
		correct: `Shake`,
	}, 
	{
		question: `How does Turd annoy my guests?`,
		a: `Begs for their food when they're eating`,
		b: `Circles around their legs when they're standing`,
		c: `Sleeps on their shoes when they're trying to leave`,
		d: `Attacks their ankles if they're wearing socks`,
		correct: `Begs for their food when they're eating`,
	}, 
	{
		question: `Which item of mine has survived life with Turd?`,
		a: `Computer chair`,
		b: `Couch`,
		c: `Rug`,
		d: `Wired headset`,
		correct: `Rug`,
	},
	{
		question: `How many people love Turd?`,
		a: `Everyone who meets her`,
		b: `Most people, but not everyone`,
		c: `Only a couple people tolerate her`,
		d: `Just one. Only one person loves Turd`,
		correct: `Only a couple people tolerate her`,
	} 
]

let questionCount = 0;
let currentScore = 0;

function renderStartPage () {
	// hide unnecessary screens
	$('#js-question-page, #js-answer-result, #js-quiz-results').hide();
	// hide the score box
	$('.js-current-score-text, .js-current-question-text').hide();
	$('.js-score-keeper, .js-question-keeper').hide();
	// set question and score to 0
	questionCount = 0;
	currentScore = 0;
	// show start text
	$('#js-title-page').append(`<div class="row"><div class="col-12 start-paragraph"><p>You may have read the title as if I've made a "Cat Quiz" and it's my quiz about cats. But that would be inaccurate. I've made a quiz about my cat. It has no purpose or real use to you, but it makes me happy. So I hope you endure it and take it lots of times until you know a creepy amount of trivia about my cat.</p></div></div>

		<div class="row"><div class="col-12"><button class="submit-button js-submit-button centered">Start the Quiz</button></div></div>`).show();
}

function renderScoreBox() {
	$('.js-current-question-text').text(`Question ${questionCount + 1} of ${QUIZ.length}`).show();
	$('.js-question-keeper').show();
}

function renderCurrentScore () {
	$('.js-current-score-text').text(`Current Score: ${currentScore}/${questionCount + 1}`);
}

function handleAnswerSelect() {
	$('#js-question-page').on('click', '.answer-box', (function(event) {
		$('*').removeClass('selected-answer');
		$(this).addClass('selected-answer');
	}));
}

function renderQuestionPage() {
	// Insert question into page
	$('.js-this-question').text(`${QUIZ[questionCount].question}`);
	$('.js-answer-a').text(`${QUIZ[questionCount].a}`);
	$('.js-answer-b').text(`${QUIZ[questionCount].b}`);	
	$('.js-answer-c').text(`${QUIZ[questionCount].c}`);
	$('.js-answer-d').text(`${QUIZ[questionCount].d}`);
	// deselect former answer
	$('input').prop('checked', false);
	$('*').removeClass('selected-answer');
	// show question page
	$('#js-question-page').show();
}

function handleStartQuizButtonClicked() {
	// Listen for button click
	$('#js-title-page').on('click', '.js-submit-button', (function(event) {
		event.preventDefault();
		// Hide title page
		$('#js-title-page').hide().text('');
		// Render the score box
		renderScoreBox();
		// show the score box
		$('#js-score-box').show();
		// render the question page
		renderQuestionPage();
	}));
}

function handleSubmitAnswerButtonClicked() {
	// Listen for submit answer button clicked
	$('.js-question-submit').submit(function(event) {
		event.preventDefault();
	// Test submitted answer against correct answer
	// Get value of submitted answer
		let userAnswer = $('#js-question-page').find('input[type="radio"]:checked').val();
		console.log(userAnswer);
		// Do the test
		let answerAccurate = (QUIZ[questionCount][userAnswer] === QUIZ[questionCount].correct);
		console.log(answerAccurate);
		// Hide question screen
		$('#js-question-page').hide();
		// Set up Answer Result Page
		$('#js-answer-result').append(`
			<div class="row">
				<div class="col-6"><img class="answer-result-image js-answer-image" src="" alt=""></div>

				<div class="col-6">
					<div class="answer-result-text-box">
						<p class="js-result-icon result-icon"><i class="fa"></i></p>
						<p class="js-result-text result-text">Whether answer was right or wrong</p>
						<p class="js-result-answer result-answer">Right anwer</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12"><button class="submit-button js-next-question" type="submit">Next Question</button>
				<button class="submit-button js-end-quiz" type="submit">End Quiz</button></div>
			</div>`);
		// If answer was right, currentScore++
		if (answerAccurate) {
			currentScore++;
			// Show appropriate cat gif in the result box
			$('.js-answer-image').attr('src', 'https://i.imgur.com/orvBR7o.gif').attr('alt', 'Gray tabby cat getting head pets');
			// Show appropriate FA icon and formatting
			$('.fa').addClass('fa-check').removeClass('fa-times');
			// Show appropriate feedback text
			$('.js-result-text').text(`You got it!`);
			// Show appropriate answer for question
			$('.js-result-answer').text(`"${QUIZ[questionCount].correct}," was the right answer!`);
		} else {
			// Show appropriate cat gif in the result box
			$('.js-answer-image').attr('src', 'https://i.imgur.com/jyLip4V.gif').attr('alt', 'Gray tabby cat yawning');
			// Show appropriate FA icon and formatting
			$('.fa').addClass('fa-times').removeClass('fa-check');
			// Show appropriate feedback text
			$('.js-result-text').text(`Well shoot!`);
			// Show appropriate answer for question
			$('.js-result-answer').text(`You should have chosen, "${QUIZ[questionCount].correct}"`);
		}
		// render score
		renderCurrentScore();
		// show score
		$('.js-current-score-text').show();
		$('.js-score-keeper').show();		
		// If last question, show "end quiz" button & hide next question button
		if (questionCount === QUIZ.length - 1) {
			$('.js-next-question').hide();
			$('.js-end-quiz').show();
		} else {
			$('.js-end-quiz').hide();
		}
		// Show answers result screen
		$('#js-answer-result').show();
	});
}

function handleNextQuestionButtonClicked() {
	// Listen for next question button click
	$('#js-answer-result').on('click', '.js-next-question', (function (event) {
		event.preventDefault();
		//hide results page
		$('#js-answer-result').text('').hide();
		//increase question count
		questionCount++;
		//renderquestionpage
		renderQuestionPage();
		renderScoreBox();
	}));
}

function handleEndQuizButtonClicked() {
	// Listen for show results button clicked
	$('#js-answer-result').on('click', '.js-end-quiz', (function (event) {
		// prevent default
		event.preventDefault();
		// hide question results page
		$('#js-answer-result').text('').hide();
		// hide score box
  		$('.js-current-score-text, .js-current-question-text').hide();
  		$('.js-score-keeper, .js-question-keeper').hide();
		// Set flavor text
		if (currentScore === 10) {
			scoreText = `You know all about Turd! Hardly anyone knows her this well because nobody cares to!`;
		} else if (currentScore <= 9 && currentScore >= 7) {
			scoreText = `Wow, I think you might be Turd's only friend!`;
		} else if (currentScore <= 6 && currentScore >= 4) {
			scoreText = `You might be getting to know Turd pretty well!`;
		} else if (currentScore <= 3 && currentScore >= 1) {
			scoreText = `You don't know very much about Turd at all!`;
		} else {
			scoreText = `What?! You don't even know the first thing about Turd! You should try again!`;
		}
		// put text in results screen
		$('#js-quiz-results').append(`<div class="row">
			<div class="col-12 end-page-score">
				<p>Your final score was:</p>
				<p class="final-score">${currentScore}/${QUIZ.length}</p>
				<p class="score-text">${scoreText}</p>
			</div>
		</div>
		<div class="row">
			<div class="col-12"><button class="submit-button js-restart-button">Restart the Quiz</button></div>
		</div>`);
		// show final score page
		$('#js-quiz-results').show();
	}));
}

function handleRestartButtonClicked() {
	// listen for restart button clicked
	$('#js-quiz-results').on('click', '.js-restart-button', (function (event) {
		event.preventDefault();
		renderStartPage();
		$('#js-quiz-results').text('');
	}));
}

function loadPage() {
	renderStartPage();
	handleStartQuizButtonClicked();
	handleAnswerSelect();
	handleSubmitAnswerButtonClicked();
	handleNextQuestionButtonClicked();
	handleEndQuizButtonClicked();
	handleRestartButtonClicked();
}

$(loadPage);