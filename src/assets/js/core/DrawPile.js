import Card from "./Card";
import Pile, { PileVisibility } from "./Pile";

export default class DrawPile extends Pile {
	constructor(packs = 30, skipbos = 30) {
		super(PileVisibility.NONE);

		for (let pack = 0; pack < packs; pack++) {
			for (let value = 1; value <= 12; value++) {
				this.cards.push(new Card(value));
			}
		}
		for (let i = 0; i < skipbos; i++) {
			this.cards.push(new Card(0));
		}

		this.shuffle();
	}
}
