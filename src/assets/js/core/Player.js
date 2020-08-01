import Pile, { PileVisibility } from "./Pile";

export default class Player {
	constructor(nDiscardPiles = 4, maxHandSize = 5) {
		this.maxHandSize = maxHandSize;
		this.hand = [];
		this.discardPiles = [];
		for (let i = 0; i < nDiscardPiles; i++) {
			this.discardPiles.push(new Pile(PileVisibility.ALL));
		}
		this.goalPile = new Pile(PileVisibility.TOP);
	}

	receiveGoalCards(cards = []) {
		this.goalPile.addMany(cards);
	}

	draw(n = 1, fromPile) {
		this.hand.push(...fromPile.draw(n));
	}

	fillHand(fromPile) {
		this.draw(this.maxHandSize - this.hand.length, fromPile);
	}

	playCard(card, toPile) {
		toPile.addTop(card);
	}

	playCardFromHand(idx, toPile) {
		let card = this.hand.splice(idx, 1)[0];
		this.playCard(card, toPile);
	}

	playTop(fromPile, toPile) {
		this.playCard(fromPile.draw(1), toPile);
	}

	playTopFromDiscard(discardIdx, toPile) {
		this.playTop(this.discardPiles[discardIdx], toPile);
	}

	playTopFromGoal(toPile) {
		this.playTop(this.goalPile, toPile);
	}

	playTopFromHand(cardIdx, toPile) {
		this.playCard(this.hand[cardIdx], toPile);
	}
}
