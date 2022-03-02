import Gun from "/src/ts/gun";
import Bullet from "/src/ts/bullet";
import KeyboardHandler from "/src/ts/keyboard";
import MouseHandler from "/src/ts/mouse";
import Invader from "/src/ts/invader";
import Background from "/src/ts/background";
import Particles from "/src/ts/particles";
let audio = new Audio('scratch.m4a');

export const GAMESTATE = {
  PAUSE: 0,
  START: 1,
  RUNNING: 2,
  OVER: 3,
  SPLASH: 4,
  FADE: 5
}

export default class Game {
  gameWidth: number;
  gameHeight: number;
  bulletsArray: Bullet[];
  invaderArray: Invader[];
  particlesArray: Particles[];
  gun: Gun;
  key: KeyboardHandler;
  mouse: MouseHandler;
  background: Background;
  gameState: number;
  munition: number;
  lives: number;
  creationRate: number;
  selector: number;
  levels: string[];
  killed: number;
  splashCounter: number;
  fadeCounter: number;
  intervalId: any;
  logo: HTMLImageElement;

  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.bulletsArray = [];
    this.invaderArray = [];
    this.particlesArray = [];
    this.gun = new Gun(this);
    this.key = new KeyboardHandler(this);
    this.mouse = new MouseHandler(this);
    this.background = new Background(this.gameWidth,this.gameHeight);
    this.gameState = GAMESTATE.SPLASH;
    this.munition = 100;
    this.lives = 5;
    this.creationRate = 0.01;
    this.selector = 0;
    this.levels = ['GAME 1','GAME 2','GAME 3', 'EXIT'];
    this.killed = 0;
    this.splashCounter = 0;
    this.fadeCounter = 1;
    this.intervalId;
    this.logo = new Image();
    this.logo.src = 'logo.png';
    setTimeout(()=>this.gameState=GAMESTATE.FADE,2000);
  }
  start(){
    this.intervalId = setInterval(()=>{
      if(this.gameState === GAMESTATE.RUNNING){
        this.invaderArray.push(new Invader(this));
      }
    }, 2000);
    this.gameState = GAMESTATE.RUNNING;
    this.bulletsArray = [];
    this.invaderArray = [];
    this.killed = 0;
    this.gun = new Gun(this);
    switch (this.selector){

      case 0:
        this.creationRate = 0.01;
        this.munition = 100;
        this.lives = 10;
        break;
      case 1:
      this.creationRate = 0.015;
      this.munition = 50;
      this.lives = 5;
        break;
      case 2:
      this.creationRate = 0.02;
      this.munition = 10;
      this.lives = 3;
        break;
    }
  }

  update(timeDiff){
    if(this.gameState != GAMESTATE.RUNNING){
      this.background.update(timeDiff);
      return;
    }
    //update objects position
    [this.background, this.gun, ...this.bulletsArray, ...this.invaderArray, ...this.particlesArray].forEach(el => {
      el.update(timeDiff);
    });

    //delete
    // let i = this.bulletsArray.findIndex(el => el.delete);
    // if(i != -1){
    //   this.bulletsArray.splice(i,1);
    // }
    // i = this.invaderArray.findIndex(el => el.delete);
    // if(i != -1){
    //   this.invaderArray.splice(i,1);
    // }

    this.bulletsArray = this.bulletsArray.filter( e => e.delete == false);
    this.invaderArray = this.invaderArray.filter( e => e.delete == false);
    //create new invaders
    // if(Math.random() < this.creationRate){
    //   this.invaderArray.push(new Invader(this));
    // }

    //check collisions bullet-invader
    this.invaderArray.forEach(inva => {
      this.bulletsArray.forEach( bull => {
        if((bull.position.x - inva.position.x) * (bull.position.x - inva.position.x) + (bull.position.y - inva.position.y) * (bull.position.y - inva.position.y) < (bull.size + inva.size) * (bull.size + inva.size) && inva.explode == false){
          bull.delete = true;
          // inva.delete = true;
          inva.explode = true;
          this.particlesArray.push(new Particles(inva.position));
          if(audio.paused){
            audio.play();
          }else{
            audio.pause;
            audio.currentTime = 0;
            audio.play();
          }
          this.killed++;
        }
      });
      //collision invader gun
      if((inva.position.x - this.gun.position.x) * (inva.position.x - this.gun.position.x) + (inva.position.y - this.gun.position.y) * (inva.position.y - this.gun.position.y) < (inva.size + this.gun.gunRadius) * (inva.size + this.gun.gunRadius) && inva.explode == false){
        this.gameState = GAMESTATE.OVER;
        clearInterval(this.intervalId);
      }
    });
    if(this.lives < 1){
      this.gameState = GAMESTATE.OVER;
      clearInterval(this.intervalId);
    }
  }

  draw(ctx){
    switch (this.gameState){
      case GAMESTATE.RUNNING :
      [this.background, this.gun, ...this.bulletsArray, ...this.invaderArray, ...this.particlesArray].forEach(el => el.draw(ctx));
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "#55af88";
      ctx.fillText(this.munition, 20, 20);
      ctx.fillText(this.lives, 20, 40);
      ctx.fillText(this.killed,this.gameWidth-20,20);
      break;
      case GAMESTATE.FADE:
      let grad = ctx.createRadialGradient(400, 300, 0, 400, 300, 500.00);
      grad.addColorStop(0, 'rgba(255, 255, 255,'+ this.fadeCounter+')');
      grad.addColorStop(0.36, 'rgba(170, 248, 176,'+ this.fadeCounter+')');
      this.fadeCounter=this.fadeCounter-0.01;
      if(this.fadeCounter<0)this.gameState=GAMESTATE.START;
      grad.addColorStop(1, 'rgba(0, 0, 0,'+ this.fadeCounter+')');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      break;
      case (GAMESTATE.START) :
      this.background.draw(ctx);
      ctx.beginPath();
      ctx.font = "30px Helvetica";
      ctx.fillStyle = "#119911";
      ctx.textAlign = "center";

      ctx.drawImage(this.logo, this.gameWidth / 2 - 70, this.gameHeight / 2 - 200,141,65);
      ctx.fillText(this.levels[0], this.gameWidth / 2, this.gameHeight / 2 - 75);
      ctx.fillText(this.levels[1], this.gameWidth / 2, this.gameHeight / 2 - 25);
      ctx.fillText(this.levels[2], this.gameWidth / 2, this.gameHeight / 2 + 25);
      ctx.fillText(this.levels[3], this.gameWidth / 2, this.gameHeight / 2 + 75);
      // ctx.fillText("PRESS SPACE TO START", this.gameWidth / 2, this.gameHeight / 2 + 80);
      // ctx.font = "20px Helvetica";
      // ctx.fillText("use the arrows to turn and space to shoot", this.gameWidth / 2, this.gameHeight / 2 + 40);
      ctx.rect(this.gameWidth/2-100, this.gameHeight/2-20-85+50*this.selector, 200, 40);
      ctx.fillStyle = "rgba(255,255,155,0.3)";
      ctx.fill();
      break;
      case GAMESTATE.PAUSE :
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(255,0,255,0.2)";
      ctx.fill();
      ctx.font = "30px Helvetica";
      ctx.fillStyle = "#119911";
      ctx.textAlign = "center";
      ctx.fillText("PAUSE", this.gameWidth / 2, this.gameHeight / 2);
      break;
      case GAMESTATE.OVER :
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(255,0,0,0.2)";
      ctx.fill();
      ctx.font = "30px Helvetica";
      ctx.fillStyle = "#ff5538";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      break;
      case GAMESTATE.SPLASH:
      let grad = ctx.createRadialGradient(400, 300, 0, 400, 300, 500.00);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(this.splashCounter, 'rgba(170, 248, 176, 1)');
      this.splashCounter=this.splashCounter+0.003;
      grad.addColorStop(1, 'rgba(0, 0, 0, 1)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      break;
    }
  }

  togglePause(){
    if(this.gameState === GAMESTATE.PAUSE){
      this.gameState = GAMESTATE.RUNNING;
    }else if(this.gameState === GAMESTATE.RUNNING){
      this.gameState = GAMESTATE.PAUSE;
    }
  }
}
