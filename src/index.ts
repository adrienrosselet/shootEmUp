import Game from "/src/ts/game";

export const canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);


let lastTime = 0;

function gameLoop(actualTime) {
  let timeDiff = actualTime - lastTime;
  lastTime = actualTime;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
 // console.time("time");
  game.update(timeDiff);
  game.draw(ctx);
  // console.timeEnd("time");
  // debugger;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
