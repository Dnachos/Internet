import {cout, cin} from './iostream.js';
import Card from './Card.js';
import CardSet from './CardSet.js';

//makes the deck
let deck = makeDeck();

//shuffels the deck
deck.shuffle();

let playerWins = 0;
let dealerWins = 0;

//Displayes welcom message and askes if they want to play
//Tauns them if they dont want to play
welcome(main);

function main()
{
	//Addes points deppending on who one the last hand
	//also plays said hand
	play();
}

function play()
{
	let wins = 0;
	oneHand(deck,
		function(wins)
		{
			if (wins == 1) {
				playerWins++;
			}
			if (wins == 0) {
				dealerWins++;
			}
			cout("The dealer has " + dealerWins + " points!\n");
			cout("You have " + playerWins + " points!\n\n");
			getUserInput("Do you want to play again?",
				function(response)
				{
					if ((response == true) && (deck.count() > 12))
					{
						play();
					}
					else
						finish();
				}
			);
		}
	);
}

function finish()
{
	if (deck.count() < 12)
		cout( "Out of Cards!\n");

	if (dealerWins > playerWins)
	{
		cout("The dealer won more rounds with " + dealerWins + " points!\n");
		cout("You only had " + playerWins + " points!\n");
	}
	else if (playerWins > dealerWins)
	{
		cout("You won more rounds with " + playerWins + " points!\n");
		cout("The dealer only had " + dealerWins + " points!\n");
	}
	else
	{
		cout("You both tied with " + playerWins + " points!");
	}
}

//code to run a single hand
function oneHand(deck, callback) {
	let player = new CardSet();
	let dealer = new CardSet();

	//Deals the cards
	player.addCard(deck.removeCard());
	dealer.addCard(deck.removeCard());
	player.addCard(deck.removeCard());
	dealer.addCard(deck.removeCard());

	//Lets you know what cards you have
	cout("The dealers cards are: ");
	dealer.show(true);
	cout("\n");
	cout("Your cards are: ");
	player.show(false);
	cout("\n");

	//askes if you want cards
	(function askForCards()
	{
		if (player.getValue() <= 21)
		{
			getUserInput("Do you want another card?",
				function(response)
				{
					if (response)
					{
						player.addCard(deck.removeCard());
						cout("Your cards are now: ");
						player.show(false);
						cout("\n");
						askForCards();
					}
					else
						next();
				}
			);
		}
		else
			next();
	})();

	function next()
	{
		//Checks if you busted(happens way too often)
		if (player.getValue() > 21)
		{
			cout("You busted!\n");
			cout("The dealers cards were: ");
			dealer.show(false);
			cout("\n");
			cout("Dealer wins!!!\n\n");
			callback(false);
			return;
		}

		//Checks if the dealer wants another card
		while (dealer.getValue() < 17)
		{
			dealer.addCard(deck.removeCard());

			cout("The dealer got another card!\nThe dealers cards are now: ");
			dealer.show(false);
			cout("\n");
		}

		//checks if he busted
		//player always rechecks becuase they cant belive such
		//little code is beating them
		//actually a ton of code when into making this very
		//stophitocated machine only for me to bellitle it with
		//such simple tasks

		if (dealer.getValue() > 21)
		{
			cout( "Dealer Busted!\n");
			cout("You win!!!\n\n");
			callback(true);
			return;
		}

		//checks if dealer has a higher hand value
		if (dealer.getValue() >= player.getValue())
		{
			cout("Dealer had a higher score\n");
			cout("The dealers cards were: ");
			dealer.show(false);
			cout("\n");
			cout("Dealer wins!!!\n\n");
			callback(false);
			return;
		}

		//checks if you have a higher hand value
		if (dealer.getValue() < player.getValue())
		{
			cout("The dealers cards were: ");
			dealer.show(false);
			cout("\n");
			cout("You had a higher score!\n");
			cout("You win!!!\n\n");
			callback(true);
			return;
		}

		//code should never execute these two lines.
		//If they do I know something is wrong
		throw new Error("oneHand has an issue");
	}
}

function welcome(callback)
{
	cout ("\n\n\n");
	cout ("Welcome To twenty one!\n");
	getUserInput("Ready to play?",
		function(response)
		{
			if (response == false)
			{
				cout("Are you scared of my computer?\n");
				return 1;
			}
			else {
				callback();
			}
		}
	);
}

function getUserInput(question, callback)
{
	cout("\n");

	let answer = 'T';

	cout(question + "\n");
	cout("Yes or No (answer Y or N): ");
	cin(
		function(answer)
		{
			cout("\n");
			if ((answer == 'Y') || (answer == 'y') || (answer == 'N') || (answer == 'n'))
			{
				if ((answer == 'Y') || (answer == 'y'))
					callback(true);
				else
					callback(false);
			}
			else
			{
				cout("Are you dumb? I said Y or N!\n");
				getUserInput(question, callback);
			}
		}
	);
}

function makeDeck()
{
	const suits = [ 'c', 's', 'h', 'd' ];
	const ranks = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K' ];

	let deck = new CardSet();

	for (let suitNum = 0; suitNum < 4; suitNum++)
	{
		for (let rankNum = 0; rankNum < 13; rankNum++)
		{
			deck.addCard(new Card(ranks[rankNum], suits[suitNum]));
		}
	}
	return deck;
}
