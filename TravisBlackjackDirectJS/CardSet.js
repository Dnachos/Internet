import {cout, cin} from './iostream.js';
import Card from "./Card.js";

const MAX_CARDS = 52;

export default class CardSet
{
	//constructor : initializes numCards to zero(set is empty)
	constructor()
	{
		this.cards = new Array(MAX_CARDS);
		this.numCards = 0;
	}
	//returns the number of cards in the set
	count()
	{
		return this.numCards;
	}
	//adds the given card to the set; returns true if successful, false
	//otherwise
	addCard(card)
	{
		if (this.numCards >= 52)
		{
			return 0;
		}
		else {
			this.cards[this.numCards] = card;
			this.numCards++;
			return 1;
		}
	}
	//removes the last card in the set and returns it.If there is not a card to
	//Remove, an error msg is printed to cerr and program exits.
	removeCard()
	{
		if (this.numCards >= 1)
		{
			this.numCards--;
			const card = this.cards[this.numCards];
			this.cards[this.numCards] = null;
			return card;
		}
		else
		{
			throw new Error("no card to remove");
		}
	}
	//prints out all the cards in the set.
	//If hideFirstCard is true, two ** are printed in place of the first card.
	show(hideFirstCard = false)
	{
		if (this.numCards == 0)
			return;

		if (hideFirstCard == true)
			cout("** ");
		else
		{
			this.cards[0].print(true);
			cout(" ");
		}

		for (let x = 1; x < this.numCards; x++)
		{
			this.cards[x].print(true);
			cout(" ");
		}
	}
	//randomly rearranges the cards in the set.
	shuffle()
	{
		let temp;
		let arraySpot;
		let arraySpot2;
		for (let x = 0; x < 1000000; x++)
		{
			arraySpot = Math.floor(Math.random() * this.numCards);
			arraySpot2 = Math.floor(Math.random() * this.numCards);

			temp = this.cards[arraySpot];
			this.cards[arraySpot] = this.cards[arraySpot2];
			this.cards[arraySpot2] = temp;
		}
	}
	//gets the total value of all the cards in the set.
	getValue()
	{
		let totalValue = 0;
		let aces = this.findAces();

		for (let x = 0; x < this.numCards; x++)
		{
			totalValue = totalValue + this.cards[x].value();
		}

		while ((totalValue > 21) && (aces> 0))
		{
			totalValue = totalValue - 10;
			aces--;
		}
		return totalValue;
	}
	findAces()
	{
		let aces = 0;
		for (let x = 0; x < this.numCards; x++)
		{
			if (this.cards[x].value() == 11)
			{
				aces++;
			}
		}
		return aces;
	}
};
