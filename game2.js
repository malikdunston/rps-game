function runGame(){
	const buttons = document.querySelectorAll('.choice');
	const roundResultText = document.querySelector('#roundResultText');
	const roundResultPlays = document.querySelector('#roundResultPlays');
	const resetButton = document.querySelector('#resetBtn'); 

	const choices = [
		"rock",
		"paper",
		"scissors"
	];

	let playerScore = 0;
	let computerScore = 0;
	let roundsPlayed = 0;
	const winningScore = 10;


	buttons.forEach(function(button){
		button.addEventListener('click', playerClick);
		button.addEventListener('touchstart', (ev)=>{
			ev.currentTarget.classList.add("hover")
		});
		button.addEventListener('mouseenter', (ev)=>{
			ev.currentTarget.classList.add("hover")
		});
		button.addEventListener('touchend', (ev)=>{
			ev.currentTarget.classList.remove("hover")
		});
		button.addEventListener('mouseleave', (ev)=>{
			ev.currentTarget.classList.remove("hover")
		});
	});
		function playerClick(event){
			let selected = event.currentTarget
			let playerChoice = selected.getAttribute('data-option');
			buttons.forEach(function(button){
				button.removeEventListener("click", playerClick);
			});
			document.querySelectorAll(".score-container")[0].classList.add(playerChoice);
			select(selected);
			setTimeout(
				()=>{playRound(playerChoice)}, 750
			);
		}	

	function select(option){
		option.classList.add("selected");
	}


	resetButton.addEventListener('click', function(){
		resetGame();
	});



	//Play a round of rock, paper, scissors
	function playRound(playerChoice) {
		let randomIndex = Math.floor(Math.random() * choices.length);
		let computerChoice = choices[randomIndex];

		select(
			document.querySelector(`.${computerChoice}`)
		);
		document.querySelectorAll(".score-container")[1].classList.add(computerChoice);

		setTimeout(()=>{
			if (playerChoice === computerChoice){
				resultText("tie");
				return;
			}	
			if(playerChoice === "rock"){
				if(computerChoice === "scissors"){
					resultText("won");
				}
				if(computerChoice === "paper"){
					resultText("lost");
				}
			}
			if(playerChoice === "paper"){
				if(computerChoice === "rock"){
					resultText("won");
				}
				if(computerChoice === "scissors"){
					resultText("lost");
				}
			}
			if(playerChoice === "scissors"){
				if(computerChoice === "paper"){
					resultText("won");
				}
				if(computerChoice === "rock"){
					resultText("lost");
				}
			}

		}, 1000)

		buttons.forEach(function(button){
			button.addEventListener('click', playerClick);
		});

	}


	//Update the text between the scores with the result of the round and with what each player played
	function resultText(result) {
		if(playerScore == winningScore || computerScore == winningScore ){
			let text;
			if (playerScore > computerScore){
				text = "Player Wins.";
			} else{
				text = "Computer Wins";
			}
			roundResultText.innerHTML = `<div>${text}</div><button onclick="resetGame()">New Game?</button>`;
			document.querySelector(".round-result").classList.add("show");
			return
		}

		if (result === "tie"){
			roundResultText.innerHTML = "Tie";
		} else if (result === "won"){
			playerScore ++;
			playerScoreText.innerHTML = playerScore;
			roundResultText.innerHTML = `You<br/>Win`;
		} else if (result === "lost"){
			computerScore ++;
			computerScoreText.innerHTML = computerScore;
			roundResultText.innerHTML = `You<br/>Lose`;
		}


		document.querySelector(".round-result").classList.add("show");
		setTimeout(()=>{
			document.querySelectorAll(".score-container")[0].classList.remove("rock");
			document.querySelectorAll(".score-container")[0].classList.remove("paper");
			document.querySelectorAll(".score-container")[0].classList.remove("scissors");
			document.querySelectorAll(".score-container")[1].classList.remove("rock");
			document.querySelectorAll(".score-container")[1].classList.remove("paper");
			document.querySelectorAll(".score-container")[1].classList.remove("scissors");
			document.querySelector(".round-result").classList.remove("show");
		}, 1500);

		document.querySelectorAll(".choice").forEach(c=>{c.classList.remove("selected")})
	}


	//Reset scores and text elements to 0
	function resetGame() {
		playerScore = 0;
		computerScore = 0;

		roundResultText.innerHTML = "";

		playerScoreText.innerHTML = "0";
		computerScoreText.innerHTML = "0";
	}

	resetGame()

}