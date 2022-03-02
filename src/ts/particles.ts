export default class Particles{
  position: { x: number; y: number; };
  number: number;
  arrayParticles: {direction: number, lifeTime: number}[];
  speed: number;
  size: number;
  time: number;
  constructor(position){
    this.position = {
      x: position.x,
      y: position.y
    }
    this.number = 20;
    this.speed = 10;
    this.size = 3;
    this.time = 0;
    this.arrayParticles = Array.from({length: this.number},()=>{
      return {
        direction: Math.random()*Math.PI*2,
        lifeTime: Math.random()*10
      };
    });
  }
  draw(ctx){
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,105,0.7";
    this.arrayParticles.forEach(e => {
      ctx.fillRect(this.position.x + Math.cos(e.direction)*this.speed*this.time, this.position.y + Math.sin(e.direction)*this.speed*this.time, this.size, this.size);
    });
  }
  update(timeDiff){
    this.time++;
    this.arrayParticles.forEach(e => {e.lifeTime--});
    // let i = this.arrayParticles.findIndex(el => el.lifeTime < 0);
    // if(i != -1){
    //   this.arrayParticles.splice(i,1);
    // }
    this.arrayParticles = this.arrayParticles.filter( e => e.lifeTime > 0);
  }
}
