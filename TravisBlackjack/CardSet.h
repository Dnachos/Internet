#pragma once
#include "Card.h"

const int MAX_CARDS = 52;
class CardSet
{
public:

	CardSet();
	//constructor : initializes numCards to zero(set is empty)
	int count();
	//returns the number of cards in the set
	bool addCard(Card card);
	//adds the given card to the set; returns true if successful, false
	//otherwise
	Card removeCard();
	//removes the last card in the set and returns it.If there is not a card to
	//Remove, an error msg is printed to cerr and program exits.
	void show(bool hideFirstCard = false);
	//prints out all the cards in the set.
	//If hideFirstCard is true, two ** are printed in place of the first card.
	void shuffle();
	//randomly rearranges the cards in the set.
	int getValue();
	//gets the total value of all the cards in the set.
	int findAces();
private:
	Card cards[MAX_CARDS];
	int numCards;
};