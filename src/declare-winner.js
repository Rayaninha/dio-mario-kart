import { COLOR } from "./ansi-colors.js";

export async function declareWinner(player, opponent) {
  console.log("Final result:");
  console.log(`${player.name}: ${player.points} point(s)`);
  console.log(`${opponent.name}: ${opponent.points} point(s)`);

  if (player.points > opponent.points)
    console.log(
      `\n${COLOR.ANSI_GREEN}${player.name} won the race. Congratulations${COLOR.ANSI_RESET}`
    );
  else if (opponent.points > player.points)
    console.log(
      `\n${COLOR.ANSI_GREEN}${opponent.name} won the race. Congratulations${COLOR.ANSI_RESET}`
    );
  else
    console.log(
      `${COLOR.ANSI_BLUE}The race ended in a draw${COLOR.ANSI_RESET}`
    );
}