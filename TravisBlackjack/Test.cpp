
#include <iostream>
#include "Card.h"
#include "CardSet.h"

bool getUserInput(char question[35]);
bool oneHand(CardSet&);
bool welcome();
void makeDeck(CardSet& deck);

using namespace std;

int main()
{
	//makes the deck
	CardSet deck;
	makeDeck(deck);

	//shuffels the deck
	deck.shuffle();

	//Displayes welcom message and askes if they want to play
	//Tauns them if they dont want to play
	if (welcome() == false)
	{
		cout << "Are you scared of my computer?\n";
		return 1;
	}

	int playerWins = 0;
	int dealerWins = 0;

	//Addes points deppending on who one the last hand
	//also plays said hand
	do
	{
		int wins = 0;
		wins = oneHand(deck);
		if (wins == 1)
		{
			playerWins++;
		}
		if (wins == 0)
		{
			dealerWins++;
		}
		cout << "The dealer has " << dealerWins << " points!\n";
		cout << "You have " << playerWins << " points!\n\n";
	} while ((getUserInput("Do you want to play again?")) && (deck.count() > 12));

	if(deck.count() < 12)
		cout << "Out of Cards!\n";

	if (dealerWins > playerWins)
	{
		cout << "The dealer won more rounds with " << dealerWins << " points!\n";
		cout << "You only had " << playerWins << " points!\n";
	}
	else if (playerWins > dealerWins)
	{
		cout << "You won more rounds with " << playerWins << " points!\n";
		cout << "The dealer only had " << dealerWins << " points!\n";
	}
	else
	{
		cout << "You both tied with " << playerWins << " points!";
	}
	return 1;
}

//code to run a single hand
bool oneHand(CardSet& deck)
{

	CardSet player;
	CardSet dealer;

	//Deals the cards
	player.addCard(deck.removeCard());
	dealer.addCard(deck.removeCard());
	player.addCard(deck.removeCard());
	dealer.addCard(deck.removeCard());

	//Lets you know what cards you have
	cout << "The dealers cards are: ";
	dealer.show(true);
	cout << "\n";
	cout << "Your cards are: ";
	player.show(false);
	cout << "\n";

	//askes if you want cards
	while ((player.getValue() <= 21) && (getUserInput("Do you want another card?")))
	{
		player.addCard(deck.removeCard());
		cout << "Your cards are now: ";
		player.show(false);
		cout << "\n";
	}

	//Checks if you busted(happens way too often)
	if (player.getValue() > 21)
	{
		cout << "You busted!\n";
		cout << "The dealers cards were: ";
		dealer.show(false);
		cout << "\n";
		cout << "Dealer wins!!!\n\n";
		return false;
	}

	//Checks if the dealer wants another card
	while (dealer.getValue() < 17)
	{
		dealer.addCard(deck.removeCard());

		cout << "The dealer got another card!\nThe dealers cards are now: ";
		dealer.show(false);
		cout << "\n";
	}

	//checks if he busted
	//player always rechecks becuase they cant belive such
	//little code is beating them
	//actually a ton of code when into making this very
	//stophitocated machine only for me to bellitle it with
	//such simple tasks

	if (dealer.getValue() > 21)
	{
		cout << "Dealer Busted!\n";
		cout << "You win!!!\n\n";
		return true;
	}

	//checks if dealer has a higher hand value
	if (dealer.getValue() >= player.getValue())
	{
		cout << "Dealer had a higher score\n";
		cout << "The dealers cards were: ";
		dealer.show(false);
		cout << "\n";
		cout << "Dealer wins!!!\n\n";
		return false;
	}

	//checks if you have a higher hand value
	if (dealer.getValue() < player.getValue())
	{
		cout << "The dealers cards were: ";
		dealer.show(false);
		cout << "\n";
		cout << "You had a higher score!\n";
		cout << "You win!!!\n\n";
		return true;
	}

	//code should never execute these two lines.
	//If they do I know something is wrong
	cerr << "oneHand has an issue";
	exit(0);
}

bool welcome()
{
	char answer = 'T';
	cout << "\n\n\n";
	cout << "Welcome To twenty one!\n";
	while (true)
	{
		cout << "Ready to play? Y or N: ";
		cin >> answer;
		cout << "\n";
		if ((answer == 'Y') || (answer == 'y') || (answer == 'N') || (answer == 'n'))
		{
			if ((answer == 'Y') || (answer == 'y'))
				return true;
			else
				return false;
		}
		else
			cout << "Invalid answer, Try again!\n";
	}
}

bool getUserInput(char question[35])
{
	cout << "\n";
	do
	{
		char answer = 'T';

		cout << question << endl;
		cout << "Yes or No (answer Y or N): ";
		cin >> answer;
		cout << "\n";
		if ((answer == 'Y') || (answer == 'y') || (answer == 'N') || (answer == 'n'))
		{
			if ((answer == 'Y') || (answer == 'y'))
				return true;
			else
				return false;
		}
		else
			cout << "Are you dumb? I said Y or N!\n";
	} while (true);
}

void makeDeck(CardSet& deck)
{
	char suits[4] = { 'c', 's', 'h', 'd' };
	char ranks[13] = { 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', };

	for (int suitNum = 0; suitNum < 4; suitNum++)
	{
		for (int rankNum = 0; rankNum < 13; rankNum++)
		{
			deck.addCard(Card(ranks[rankNum], suits[suitNum]));
		}
	}

}
