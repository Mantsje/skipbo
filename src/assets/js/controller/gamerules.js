import { Type } from "./Selection";

// Validate the passed selection structs, meaning we can uniquely identify two entities
// Target should always be either a discard pile or a playable pile
export function validateMoveTargets(activePlayer, selected, target) {
	return new Promise((resolve, reject) => {
		if (!selected.isValid() || !target.isValid()) {
			console.error("Either selected or target are not a valid 'Selection' struct");
			reject("Encountered unexpected error");
		} else {
			// Selections are valid, so we can unambiguously identify the targeted elements
			if (
				!(
					target.type == Type.PILE &&
					(target.playablePileIdx >= 0 || (target.playerIdx == activePlayer && target.playerDiscardPileIdx >= 0))
				)
			) {
				// if target should be either one of the playable piles or the player's discard pile
				reject("Invalid target");
			}
			if (selected.playerIdx !== activePlayer) {
				reject("You can only play one of your own cards");
			}
			resolve();
		}
	});
}

export function isValidMove(selected, target) {
	let selectedCard = selected.value;
	if (selected.type == Type.PILE) {
		selectedCard = selected.value.peek();
	}
	if (selectedCard == null) {
		console.error("Something went wrong, selected card is empty");
		return false;
	}
	if (target.playerDiscardPileIdx >= 0) {
		return !selected.isPlayerGoalPile && selected.playerDiscardPileIdx < 0;
	} else if (target.playablePileIdx >= 0) {
		if (target.value.isEmpty()) {
			return selectedCard.value == 1 || selectedCard.value == 0;
		}
		let isNext = selectedCard.value == target.value.size() + 1;
		let isSkipbo = selectedCard.value == 0;
		return isNext || isSkipbo;
	}
	console.error("Something went wrong in checking move validity, should not end up here", target);
	return false;
}
