import { selectPlayer } from "./select-player.js";
import { playRaceEngine } from "./game-logic.js";
import { declareWinner } from './declare-winner.js'

(async function main() {
  const { selectedPlayer, selectedOpponent } = await selectPlayer();
  console.log(
    `Race between ${selectedPlayer.name} and ${selectedOpponent.name}`
  );

  await playRaceEngine(selectedPlayer, selectedOpponent);
  await declareWinner(selectedPlayer, selectedOpponent);
})();
