#pragma once
#include "CardSet.h"
#include <iostream>
#include <time.h>


using namespace std;

CardSet::CardSet()
{
	srand(time(NULL));
	numCards = 0;
}

int CardSet::count()
{
	return numCards;
}

bool CardSet::addCard(Card card)
{
	if (numCards >= 52)
	{
		return 0;
	}
	else {
		cards[numCards] = card;
		numCards++;
		return 1;
	}
}

Card CardSet::removeCard()
{
	if (numCards >= 1)
	{
		numCards--;
		return cards[numCards];
	}
	else
	{
		cerr << "no card to remove";
		exit(2);
	}
}

void CardSet::show(bool hideFirstCard)
{
	if (numCards == 0)
		return;

	if (hideFirstCard == true)
		cout << "** ";
	else
	{
		cards[0].print(true);
		cout << " ";
	}

	for (int x = 1; x < numCards; x++)
	{
		cards[x].print(true);
		cout << " ";
	}
}

void CardSet::shuffle()
{
	Card temp;
	int arraySpot;
	int arraySpot2;
	for (int x = 0; x < 1000000; x++)
	{
		arraySpot = rand() % numCards;
		arraySpot2 = rand() % numCards;

		temp = cards[arraySpot];
		cards[arraySpot] = cards[arraySpot2];
		cards[arraySpot2] = temp;
	}
}

int CardSet::getValue()
{
	int totalValue = 0;
	int aces = findAces();

	for (int x = 0; x < numCards; x++)
	{
		totalValue = totalValue + cards[x].value();
	}

	while ((totalValue > 21) && (aces> 0))
	{
		totalValue = totalValue - 10;
		aces--;
	}
	return totalValue;
}

int CardSet::findAces()
{
	int aces = 0;
	for (int x = 0; x < numCards; x++)
	{
		if (cards[x].value() == 11)
		{
			aces++;
		}
	}
	return aces;
}
