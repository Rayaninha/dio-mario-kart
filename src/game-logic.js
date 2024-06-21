import { COLOR } from "./ansi-colors.js";

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let type;

  const roadTypes = ["straight", "curve", "fight"];

  const randomType = Math.floor(Math.random() * roadTypes.length);
  type = roadTypes[randomType];

  return {
    type,
  };
}

async function logRollResult(characterName, type, diceResult, attribute) {
  console.log(
    `${characterName} rolled a ${COLOR.ANSI_YELLOW}${type}${
      COLOR.ANSI_RESET
    } die on the side ${diceResult} adding: ${
      COLOR.ANSI_BLUE
    }${diceResult} + ${attribute} = ${diceResult + attribute}${
      COLOR.ANSI_RESET
    }`
  );
}

export async function playRaceEngine(player, opponent) {
  for (let round = 0; round < 5; round++) {
    console.log(`Round ${round}`);

    const { type } = await getRandomBlock();
    console.log(`${COLOR.ANSI_YELLOW}Type ${type}${COLOR.ANSI_RESET}`);

    let playerDieResult = await rollDice();
    let opponentDieResult = await rollDice();

    let totalPlayerSkill = 0;
    let totalOpponentSkill = 0;

    if (type === "straight") {
      totalPlayerSkill = playerDieResult + player.speed;
      totalOpponentSkill = opponentDieResult + opponent.speed;

      await logRollResult(player.name, "speed", playerDieResult, player.speed);
      await logRollResult(
        opponent.name,
        "speed",
        opponentDieResult,
        opponent.speed
      );
    }

    if (type === "curve") {
      totalPlayerSkill = playerDieResult + player.handling;
      totalOpponentSkill = opponentDieResult + opponent.handling;

      await logRollResult(
        player.name,
        "handling",
        playerDieResult,
        player.handling
      );
      await logRollResult(
        opponent.name,
        "handling",
        opponentDieResult,
        opponent.handling
      );
    }

    if (type === "fight") {
      let resultPlayerPower = playerDieResult + player.power;
      let resultOpponentPower = opponentDieResult + opponent.power;

      console.log(`${player.name} confronted ${opponent.name}`);

      await logRollResult(player.name, "power", playerDieResult, player.power);
      await logRollResult(
        opponent.name,
        "power",
        opponentDieResult,
        opponent.power
      );

      if (resultPlayerPower > resultOpponentPower && opponent.points > 0) {
        console.log(
          `${COLOR.ANSI_RED}${player.name} won the fight. ${opponent.name} lost one point${COLOR.ANSI_RESET}`
        );
        opponent.points--;
      }

      if (resultOpponentPower > resultPlayerPower && player.points > 0) {
        console.log(
          `${COLOR.ANSI_RED}${opponent.name} won the fight. ${player.name} lost one point${COLOR.ANSI_RESET}`
        );
        player.points--;
      }

      if (resultPlayerPower === resultOpponentPower) {
        console.log(
          `${COLOR.ANSI_BLUE}Draw, no points were lost${COLOR.ANSI_RESET}`
        );
      }
    }

    if (totalPlayerSkill > totalOpponentSkill) {
      console.log(
        `${COLOR.ANSI_GREEN}${player.name} scored a point${COLOR.ANSI_RESET}`
      );
      player.points++;
    } else if (totalOpponentSkill > totalPlayerSkill) {
      console.log(
        `${COLOR.ANSI_GREEN}${opponent.name} scored a point${COLOR.ANSI_RESET}`
      );
      opponent.points++;
    }

    console.log("\n");
  }
}
