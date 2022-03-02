import { GAMESTATE } from "/src/ts/game";
import { canvas } from "/src/index";
// let canvas = document.getElementById("gameCanvas");

export default class MouseHandler{
  selector: number;
  constructor(game){
    this.selector = 0;
    canvas.addEventListener('click', (e) => {
      if(game.gameState === GAMESTATE.START){
        let mousePos = getMousePos(canvas,e);
        if(Math.abs(mousePos.x-game.gameWidth/2) < 100){
          if(Math.abs(mousePos.y-game.gameHeight/2-68) < 20){
            // console.log("exit");
            window.location.href = "https://adrienrosselet.github.io/monSite/";
          }
          else if(Math.abs(mousePos.y-game.gameHeight/2-18) < 20) {
            // console.log("game3");
            game.selector = 2;
            game.start();
          }
          else if(Math.abs(mousePos.y-game.gameHeight/2+32) < 20) {
            // console.log("game2");
            game.selector = 1;
            game.start();
          }
          else if(Math.abs(mousePos.y-game.gameHeight/2+82) < 20) {
            // console.log("game1");
            game.selector = 0;
            game.start();
          }
        }
        // this.gameWidth/2-100, this.gameHeight/2-20-85+50*this.selector, 200, 40
      }
      console.log(getMousePos(canvas,e));



    });
  }
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
