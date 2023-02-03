class Cannonball{
    constructor(x,y,){
        var options={
            restitution:0.8,
            friction:0.1,
            density:1.0,
            isStatic:true
        };
        this.r=40;
        this.body= Bodies.circle(x,y,this.r,options);
        this.image = loadImage("./assets/cannonball.png");
        this.trajectory=[];
        World.add(world, this.body);
    }
    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate (pos.x, pos.y);
        rotate (angle);
        imageMode(CENTER);
        //this.r al final
        image (this.image,0,0,this.r,this.r);
        pop();
///segunda condición tiene que tener position en lugar de velocity
        if(this.body.velocity.x>0 && this.body.position.x>300){
            var position =[this.body.position.x, this.body.position.y];
            this.trajectory.push(position);
            console.log("error del if");
        }

        for(var i=0; i< this.trajectory.length ; i++){
            image(this.image, this.trajectory[i][0], this.trajectory[i][1],5,5);
            console.log("error del for");
        }
    }
    shoot(){
        //fromAngle con una l
        var velocity=p5.Vector.fromAngle(cannon.angle);
        velocity.mult(20);
        Matter.Body.setStatic(this.body,false);
        //setVelocity con l
        Matter.Body.setVelocity(this.body,{x:velocity.x,y:velocity.y});

    }
}