export const PileVisibility = {
	TOP: "TOP",
	BOTTOM: "BOTTOM",
	ALL: "ALL",
	NONE: "NONE"
};

export default class Pile {
	constructor(visibility = PileVisibility.NONE) {
		this.cards = [];
		this.visibility = visibility;
	}

	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	draw(n = 1) {
		return this.cards.splice(0, n);
	}

	// Always returns the top card, whether it should be visible or not
	// Returns null when empty
	peek() {
		if (!this.isEmpty()) {
			return this.cards[0];
		}
		return null;
	}

	addTop(card) {
		this.cards.unshift(card);
	}

	addMany(cards = []) {
		this.cards.push(...cards);
	}

	size() {
		return this.cards.length;
	}

	isEmpty() {
		return this.cards.length == 0;
	}
}
