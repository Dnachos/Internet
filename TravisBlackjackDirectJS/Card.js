import {cout, cin, cerr} from "./iostream.js";

//Card class definition
// Card class iplementation
export default class Card
{
	//Default Constructor: Initialize rank to 'A' (ace) and suit to 'S' (spades)
	//Constructor: Set suit and rank to given values. If either given value
	//is invalid, error msg is written to cerr and program terminates
	constructor(rank = 'A', suit = 's')
	{
		this.setSuit(suit);
		this.setRank(rank);
	}
	// set card rank to given value.  If rank is invalid, err msg is written to
	// cerr and program terminates
	setRank(rank)
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
			this.rank = rank.toUpperCase();
			break;
		default:
			cerr("invalid rank: " + rank);
			break;
		}
	}
	// set card suit to given value.  If suit is invalid, err msg is written to
	// cerr and program terminates
	setSuit(suit)
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
			this.suit = suit.toLowerCase();
			break;
		default:
			cerr("invalid suit: " + suit);
		}
	}
	//Print the card's rank and suit to the screen
	print(show)
	{
		if (show == true)
		{
			cout(this.rank + this.suit);
		}
		else
		{
			cout("**");
		}
	}
	value()
	{
		if (this.rank >= '2' && this.rank <= '9')
			return this.rank - '2' + 2;
		else if (this.rank == 'A')
			return 11;
		else
			return 10;
	}
}
