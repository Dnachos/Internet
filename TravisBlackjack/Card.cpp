// Card class iplementation

#include <iostream>
#include <cctype>
#include "Card.h"

using namespace std;

Card::Card()
{
	setSuit('s');
	setRank('A');
}

Card::Card(char rank, char suit)
{
	setSuit(suit);
	setRank(rank);
}

void Card::setRank(char rank)
{
	switch (rank)
	{
	case'2':
	case'3':
	case'4':
	case'5':
	case'6':
	case'7':
	case'8':
	case'9':
	case'J':
	case'Q':
	case'K':
	case'A':
	case'j':
	case'q':
	case'k':
	case'a':
	case't':
	case'T':
		this->rank = toupper(rank);
		break;
	default:
		cerr << "invalid rank: " << rank;
		exit(0);
		break;
	}
}

void Card::setSuit(char suit)
{
	switch (suit)
	{
	case'S':
	case's':
	case'C':
	case'c':
	case'H':
	case'h':
	case'D':
	case'd':
		this->suit = tolower(suit);
		break;
	default:
		cerr << "invalid suit: " << suit;
		exit(1);
	}
}

void Card::print(bool show)
{
	if (show == true)
	{
		cout << this->rank << suit;
	}
	else
	{
		cout << "**";
	}
}

int Card::value()
{
	if (rank >= '2' && rank <= '9')
		return rank - '2' + 2;
	else if (rank == 'A')
		return 11;
	else
		return 10;
}
