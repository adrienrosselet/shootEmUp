export default class Gun {
  position: { x: number; y: number; };
  angle: number;
  angSpeed: number;
  angMaxSpeed: number;
  gunRadius: number;
  gunLength: number;
  gunWidth: number;
  speed: number;
  maxSpeed: number;
  moLeft: boolean;
  moRight: boolean;
  gaW: number;
  gaH: number;
  speedIncrement: number;
  constructor(game) {
    this.position = {
      x: 0,
      y: game.gameHeight/2
    }
    this.gaW = game.gameWidth;
    this.gaH = game.gameHeight;
    this.angle = 0;//radian
    this.angSpeed = 0;
    this.angMaxSpeed = 0.003;
    this.speed = 0;
    this.speedIncrement = 0.01;
    this.maxSpeed = 0.3;
    this.gunRadius = 40;
    this.gunLength = 80;
    this.gunWidth = 20;
    this.moLeft = false;
    this.moRight = false;
  }

  rotateLeft(){
    // this.rotLeft = true;
    this.angSpeed = -this.angMaxSpeed;
  }
  rotateRight(){
    // this.rotRight = true;
    this.angSpeed = this.angMaxSpeed;
  }
  stop(){
    this.moLeft = false;
    this.moRight = false;

    this.angSpeed = 0;
  }
  moveLeft(){
    this.moLeft = true;
    // this.speed -= 0.1;
    // if(this.speed < -this.maxSpeed){
    //   this.speed = -this.maxSpeed;
    // }
  }
  moveRight(){
    this.moRight = true;
    // this.speed += 0.1;
    // if(this.speed > this.maxSpeed){
    //   this.speed = this.maxSpeed;
    // }
  }
  draw(ctx){
    //tube
    ctx.beginPath();
    ctx.moveTo(this.position.x,this.position.y);
    ctx.lineTo(
        this.position.x + this.gunLength * Math.cos(this.angle),
        this.position.y + this.gunLength * Math.sin(this.angle)
      );
    ctx.lineWidth = this.gunWidth;
    ctx.strokeStyle = '#009300';
    ctx.stroke();
    //body
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.gunRadius, -Math.PI, Math.PI, false);
    ctx.fillStyle = '#004310';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#009300';
    ctx.stroke();
  }
  update(timeDiff){
    if(!timeDiff) return;
    if(this.moLeft){
      this.speed -= this.speedIncrement;
      if(this.speed < -this.maxSpeed){
        this.speed = -this.maxSpeed;
      }
    }
    if(this.moRight){
      this.speed += this.speedIncrement;
      if(this.speed > this.maxSpeed){
        this.speed = this.maxSpeed;
      }
    }
    this.angle += this.angSpeed * timeDiff;
    this.position.y += Math.sin(this.angle)*3;
    this.position.x += this.speed *timeDiff;

    if(this.position.x > this.gaW){
      this.position.x = this.gaW;
      this.speed = 0;
    }else if(this.position.x < 0){
      this.position.x = 0;
      this.speed = 0;
    }
    if(this.position.y > this.gaH){
      this.position.y = this.gaH;
      this.speed = 0;
    }else if(this.position.y < 0){
      this.position.y = 0;
      this.speed = 0;
    }
    if(this.angle < -Math.PI/2) this.angle = -Math.PI/2;
    if(this.angle > Math.PI/2) this.angle = Math.PI/2;
    }
    // this.position.x += this.angSpeed * timeDiff;
    // this.position.x += this.angSpeed;
  }
