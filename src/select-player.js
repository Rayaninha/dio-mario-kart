import { createInterface } from "readline";
import { mario, peach, yoshi, bowser, luigi, donkeyKong } from "./players.js";

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

export async function selectPlayer() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const players = [mario, peach, yoshi, bowser, luigi, donkeyKong];

  let selectedPlayer;

  while (!selectedPlayer) {
    console.table(players);
    const index = await askQuestion(rl, "Choose an index: ");
    const selectedPlayerIndex = parseInt(index, 10);

    if (selectedPlayerIndex >= 0 && selectedPlayerIndex < players.length) {
      selectedPlayer = players[selectedPlayerIndex];
      players.splice(selectedPlayerIndex, 1);
    } else {
      console.log(
        ANSI_RED +
          "Invalid number. Please choose a number between 0 and 5." +
          ANSI_RESET
      );
    }
  }

  let selectedOpponent;

  const randomOpponent = Math.floor(Math.random() * players.length);
  selectedOpponent = players[randomOpponent];

  rl.close();
  return {
    selectedPlayer,
    selectedOpponent,
  };
}
