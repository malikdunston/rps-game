function runGame(){
	const buttons = document.querySelectorAll('.choice');
	const roundResultText = document.querySelector('#roundResultText');
	const roundResultPlays = document.querySelector('#roundResultPlays');
	const resetButton = document.querySelector('#resetBtn'); 

	const choices = [
		"Rock",
		"Paper",
		"Scissors"
	];

	let playerScore = 0;
	let computerScore = 0;
	let roundsPlayed = 0;
	const winningScore = 10;


	buttons.forEach(function(button){
		button.addEventListener('click', function(){
			let playerChoice = event.currentTarget.getAttribute('data-option');
			playRound(playerChoice);
		});
	});

	resetButton.addEventListener('click', function(){
		resetGame();
	});



	//Play a round of Rock, Paper, Scissors
	function playRound(playerChoice) {
		let randomIndex = Math.floor(Math.random() * choices.length);
		let computerChoice = choices[randomIndex];
		console.log(playerChoice, computerChoice);

		if (playerChoice === computerChoice){
			// console.log("tie");
			resultText("tie");
			return;
		}	
		if(playerChoice === "Rock"){
			if(computerChoice === "Scissors"){
				resultText("won");
			}
			if(computerChoice === "Paper"){
				resultText("lost");
			}
		}
		if(playerChoice === "Paper"){
			if(computerChoice === "Rock"){
				resultText("won");
			}
			if(computerChoice === "Scissors"){
				resultText("lost");
			}
		}
		if(playerChoice === "Scissors"){
			if(computerChoice === "Paper"){
				resultText("won");
			}
			if(computerChoice === "Rock"){
				resultText("lost");
			}
		}
	}


	//Update the text between the scores with the result of the round and with what each player played
	function resultText(result) {
		if(playerScore == winningScore || computerScore == winningScore ){
			gameOver();
		}
		if (result === "tie"){
			roundResultText.innerHTML = "It was a tie.";
		} else if (result === "won"){
			playerScore ++;
			playerScoreText.innerHTML = playerScore;
			roundResultText.innerHTML = "You won!";
		} else if (result === "lost"){
			computerScore ++;
			computerScoreText.innerHTML = computerScore;
			roundResultText.innerHTML = "You lost!";
		} else{
			// game is broken
		}
	}


	//Reset scores and text elements to 0
	function resetGame() {
		playerScore = 0;
		computerScore = 0;

		roundResultText.innerHTML = "";

		playerScoreText.innerHTML = "0";
		computerScoreText.innerHTML = "0";
	}


	//Alert the player whether they won or not after someone reaches 10 points
	function gameOver() {

		if (playerScore > computerScore){
			alert("player wins.");
		} else{
			alert("computer wins");
		}
		resetGame();
	}
}