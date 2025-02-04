$(document).ready(function(){
	console.log('ready!')
	// Custom jQuery Functions Here
	var globalScore = 0;
	gameInit(globalScore);
	
})

function gameInit(globalScore) {	
	$('.game--body').children().removeClass('correct').off();
	
	var correctAnswer = [getRandomInt(255), getRandomInt(255), getRandomInt(255)];
	var correctAnswerColor = correctAnswer[0] + ',' + correctAnswer[1] + ',' + correctAnswer[2];
	var randomCorrectBox = $('.game--body').children().eq(getRandomInt(6));
	
	correctAnswer.forEach(function(el, index) {
		$('.color-val').eq(index).text(el);
	});

	randomCorrectBox.css('background', 'rgba(' + correctAnswerColor + ')').addClass('correct');

	randomCorrectBox.siblings().each(function() {
		$(this).css('background', 'rgba('+ getRandomInt(255) +','+getRandomInt(255)+','+getRandomInt(255)+')')
	});
	
	onClick(globalScore);
	onRestart(globalScore);
}

function onClick(globalScore) {
	$('.game--body').children().on('click', function() {
		var $this = $(this);
		
		if (!$this.hasClass('correct')) {
			$('.popup').addClass('game-finished');
			$('.game--body').children().removeClass('correct').off();
		} else {
			globalScore++;
			$('.game-score').text(globalScore);
			$('.correct').addClass('chosen');
			
			setTimeout(function() {
				gameInit(globalScore);
				$('.chosen').removeClass('chosen');
			}, 1500)
		}
	});
}

function onRestart(globalScore) {
	$('.restart-game').on('click', function() {
		globalScore = 0;
		
		$('.popup').removeClass('game-finished');
		$('.game-score').text(globalScore);
		gameInit(globalScore);
	})
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}