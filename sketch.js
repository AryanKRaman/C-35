var ball;
var database,position;
function setup(){
    createCanvas(500,500);

    //Connecting to DB
    database=firebase.database();

    //Ball sprite
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


    //.ref() is used to create reference to location of DB
    var ballP=database.ref('Ball/position');
    //.on() is used to create listener which keeps listening to the changes in DB
    ballP.on("value",readPosition)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

//Write it back to DB
function changePosition(x,y){
    //.set() is used to set values to DB
    database.ref('Ball/position').set({
        x:position.x+x,
        y:position.y+y
    })
    
}

//Reading values from DB
function readPosition(data){
    //.val() is used to retrieve data from DB
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;

}