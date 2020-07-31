export const Type = {
	CARD: "CARD",
	PILE: "PILE"
};

export default class Selection {
	constructor(
		value,
		type = Type.PILE,
		isDrawpile = false,
		playablePileIdx = -1,
		playerIdx = -1,
		playerHandIdx = -1,
		playerDiscardPileIdx = -1,
		isPlayerGoalPile = false
	) {
		this.value = value;
		this.type = type;
		this.playerIdx = playerIdx;
		this.playerHandIdx = playerHandIdx;
		this.playerDiscardPileIdx = playerDiscardPileIdx;
		this.isPlayerGoalPile = isPlayerGoalPile;
		this.playablePileIdx = playablePileIdx;
		this.isDrawpile = isDrawpile;
	}

	isValid() {
		// It must have the selected object (as getter)
		if (this.value == null) {
			return false;
		}
		// Each Selection should be one of these two types
		if (this.type != Type.PILE && this.type != Type.CARD) {
			return false;
		}
		// Furthermore at most a subset should be set, if it is a specific player related thing
		if (this.playerIdx >= 0) {
			// Only 1 of the things of a player can be selected: a hand card, discard pile or its goal pile
			let ans = this.playerHandIdx >= 0 + this.playerDiscardPileIdx >= 0 + this.isPlayerGoalPile;
			// If multiple of these, or any of the other options are also detected, this selection is invalid and ambiguous
			if (ans != 1 || this.playablePileIdx >= 0 || this.isDrawpile) {
				return false;
			}
			return true;
			// Now that we've covered 1 option (player-related), only check if the third option is also selected
		} else if (this.playablePileIdx >= 0) {
			return !this.isDrawpile;
		} else {
			// Finally ensure that there is at least one of the 3 options selected.
			// It was not player-related and not a playablePile, so it has to be the draw pile
			return this.isDrawpile;
		}
	}

	equals(selection) {
		if (selection.constructor !== this.constructor) {
			return false;
		}
		let result = [
			this.value === selection.value,
			this.type === selection.type,
			this.playerIdx === selection.playerIdx,
			this.playerHandIdx === selection.playerHandIdx,
			this.playerDiscardPileIdx === selection.playerDiscardPileIdx,
			this.isPlayerGoalPile === selection.isPlayerGoalPile,
			this.playablePileIdx === selection.playablePileIdx,
			this.isDrawpile === selection.isDrawpile
		];
		return result.reduce((a, b) => a + b, 0) == result.length;
	}
}
