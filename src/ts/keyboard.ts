import Bullet from "/src/ts/bullet";
import { GAMESTATE } from "/src/ts/game";
var boom = new Audio('boom.m4a');
export default class KeyboardHandler{
  constructor(game){
    document.addEventListener("keydown", (event) =>{
      switch (event.keyCode){
        case 32://space
          event.preventDefault();
          if(game.gameState === GAMESTATE.START){
            game.start();
          } else if(game.gameState === GAMESTATE.RUNNING && game.munition > 0){
              game.bulletsArray.push(new Bullet(game));
              game.munition--;
              if(boom.paused){
                boom.play();
              }else{
                boom.pause;
                boom.currentTime = 0;
                boom.play();
              }

          }
          break;
        case 37://left
          game.gun.rotateLeft();
          break;
        case 38://up
          event.preventDefault();
          if(game.gameState === GAMESTATE.RUNNING){
            game.gun.moveRight();
          } else {
            game.selector--;
            if(game.selector < 0){
              game.selector = 3;
            }
          }
          // alert(game.selector);
          break;
        case 39://right
          game.gun.rotateRight();
          break;
        case 40://down
          event.preventDefault();
          if(game.gameState === GAMESTATE.RUNNING){
            game.gun.moveLeft();
          } else {
            game.selector++;
            if(game.selector > 3){
              game.selector = 0;
            }
          }
          break;
        case 27://esc
          game.togglePause();
          if (game.gameState === GAMESTATE.OVER){
            game.gameState = GAMESTATE.START;
          }
          break;
      }
    });
    document.addEventListener("keyup", (event) =>{
      switch (event.keyCode){
        case 37:
          // game.gun.stop();
          // break;
        case 39:
          // game.gun.stop();
          // break;
        case 38:
          // game.gun.stop();
        case 40:
          game.gun.stop();
          break;
      }
    });
  }
}
