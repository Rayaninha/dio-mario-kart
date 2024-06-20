import { createInterface } from 'readline';
import { mario, peach, yoshi, bowser, luigi, donkeyKong } from './players.js';

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function selectPlayer() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const players = [
    mario, 
    peach, 
    yoshi, 
    bowser, 
    luigi, 
    donkeyKong
  ];
  
  let selectedPlayer;

  while (!selectedPlayer) {
    console.table(players)
    const index = await askQuestion(rl, 'Choose an index: ');
    const selectedPlayerIndex = parseInt(index, 10);

    if (selectedPlayerIndex >= 0 && selectedPlayerIndex < players.length) {
      selectedPlayer = players[selectedPlayerIndex];
      players.splice(selectedPlayerIndex, 1)
    } else {
      console.log('Invalid number. Please choose a number between 0 and 5.');
    }
  }

  let selectedOpponent;

  const randomOpponent = Math.floor(Math.random() * players.length)
  selectedOpponent = players[randomOpponent];

  rl.close();
  return {
    selectedPlayer,
    selectedOpponent,
  };
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let type;

  const roadTypes = ["straight", "curve", "fight"]

  const randomType = Math.floor(Math.random() * roadTypes.length)
  type = roadTypes[randomType]

  return {
    type
  }
}

async function playRaceEngine(player, opponent) {
  for (let round = 0; round < 5; round++) {
    console.log(`Round ${round}`)

    const { type } = await getRandomBlock()
    console.log(`Type ${type}`)
  }
}

(async function main() {
  const { selectedPlayer, selectedOpponent } = await selectPlayer();
  console.log(`Race between ${selectedPlayer.name} and ${selectedOpponent.name}`);

  await playRaceEngine(selectedPlayer, selectedOpponent)
})();
