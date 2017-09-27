const DISC_R_MIN = 10;
const DISC_R_MAX = 100;
const DISC_INNER_R_MAX = 20;
const DISC_DURATION = 5000.0;
const DISC_V = (2*DISC_R_MAX-DISC_R_MIN)/DISC_DURATION; // grow then shrink to zero size
const DISC_T_MAX_R = (DISC_R_MAX-DISC_R_MIN)/DISC_V;

class Disc
{
  constructor(canvas)
  {
    this.canvas=canvas;
    this.context=canvas.getContext("2d");
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.width;
    this.t = 0;
    this.r = DISC_R_MIN;
    this.alive=true;
  }

  draw()
  {
    if(!this.alive) {return;}
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(this.x,this.y,this.r,0,2*Math.PI);
    context.fill();
    /*
    context.fillStyle = "red";
    context.beginPath();
    context.arc(this.x,this.y,Math.min(this.r,DISC_INNER_R_MAX),0,2*Math.PI);
    context.fill();
    */
  }

  update(dt)
  {
    if(!this.alive) {return false;}
    this.t+=dt;
    if(this.t>DISC_DURATION)
    {
      this.alive=false;
      this.clicked=false;
      return false;
    }
    if(this.t<DISC_T_MAX_R)
    {
      this.r = DISC_R_MIN + DISC_V*this.t;
    } else
    {
      this.r = DISC_R_MAX - DISC_V*(this.t-DISC_T_MAX_R);
    }
    return true;
  }

  click(cursorX,cursorY)
  {
    console.log(cursorX);
    console.log(cursorY);
    if((Math.pow(cursorX-this.x,2)+Math.pow(cursorY-this.y,2))<this.r*this.r)
    {
      this.alive = false;
      this.clicked = true;
      return true;
    }
    return false;
  }
}

