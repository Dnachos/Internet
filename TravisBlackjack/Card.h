#pragma once
//Card class definition
class Card {
public:

	//Default Constructor: Initialize rank to 'A' (ace) and suit to 'S' (spades)
	Card();

	//Constructor: Set suit and rank to given values. If either given value
	//is invalid, error msg is written to cerr and program terminates
	Card(char rank, char suit);

	// set card rank to given value.  If rank is invalid, err msg is written to
	// cerr and program terminates
	void setRank(char rank);

	// set card suit to given value.  If suit is invalid, err msg is written to
	// cerr and program terminates
	void setSuit(char suit);

	//Print the card�s rank and suit to the screen
	void print(bool show = true);

	//returns the value of the card (2-11)
	int value();


private:
	char suit;  // S=spaces, C=clubs, H=hearts, D=diamonds
	char rank;  // 2-9, T, J, K, Q, A
};
