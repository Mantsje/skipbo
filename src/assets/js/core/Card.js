const validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0];

export default class Card {
	constructor(value) {
		if (!validValues.includes(value)) {
			throw Error("Invalid card value, valid values are 0=SKIPBO, and 1-12");
		}

		this.value = value;
	}
}
