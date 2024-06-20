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

async function logRollResult(characterName, type, diceResult, attribute) {
  console.log(`${characterName} rolled a ${type} die on the side ${diceResult} adding: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(player, opponent) {
  for (let round = 0; round < 5; round++) {
    console.log(`Round ${round}`)

    const { type } = await getRandomBlock()
    console.log(`Type ${type}`)

    let playerDieResult = await rollDice()
    let opponentDieResult = await rollDice()

    let totalPlayerSkill = 0
    let totalOpponentSkill = 0

    if (type === "straight") {
      totalPlayerSkill = playerDieResult + player.speed;
      totalOpponentSkill = opponentDieResult + opponent.speed;

      await logRollResult(player.name, "speed", playerDieResult, player.speed);
      await logRollResult(opponent.name, "speed", opponentDieResult, opponent.speed);
    }

    if (type === "curve") {
      totalPlayerSkill = playerDieResult + player.handling;
      totalOpponentSkill = opponentDieResult + opponent.handling;

      await logRollResult(player.name, "handling", playerDieResult, player.handling);
      await logRollResult(opponent.name, "handling", opponentDieResult, opponent.handling);
    }

    if (type === "fight") {
      let resultPlayerPower = playerDieResult + player.power
      let resultOpponentPower = opponentDieResult + opponent.power

      console.log(`${player.name} confronted ${opponent.name}`)

      await logRollResult(player.name, "power", playerDieResult, player.power);
      await logRollResult(opponent.name, "power", opponentDieResult, opponent.power);

      if (resultPlayerPower > resultOpponentPower && opponent.points > 0) {
        console.log(`${player.name} won the fight. ${opponent.name} lost one point`)
        opponent.points--;
      }

      if (resultOpponentPower > resultPlayerPower && player.points > 0) {
        console.log(`${opponent.name} won the fight. ${player.name} lost one point`)
        player.points--;
      }

      if (resultPlayerPower === resultOpponentPower) {
        console.log('Draw, no points were lost')
      }
    }

    if (totalPlayerSkill > totalOpponentSkill) {
      console.log(`${player.name} scored a point`);
      player.points++;
    } else if (totalOpponentSkill > totalPlayerSkill) {
      console.log(`${opponent.name} scored a point`);
      opponent.points++;
    }

    console.log('\n')
  }
}

(async function main() {
  const { selectedPlayer, selectedOpponent } = await selectPlayer();
  console.log(`Race between ${selectedPlayer.name} and ${selectedOpponent.name}`);

  await playRaceEngine(selectedPlayer, selectedOpponent)
})();
