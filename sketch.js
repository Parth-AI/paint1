var points = [];
var database;
var position;

var currentPath = [];

function setup()
{
    database = firebase.database();

    var canvas = createCanvas(700,500);
    canvas.mousePressed(startPath);
   // canvas.mouseReleased(endPath);


    var pointsPosition = database.ref('mouse/points');
    pointsPosition.on("value",readPosition,showError);
}

function startPath(){
    currentPath = [];
    points.push(currentPath);
}

/*function endPath(){

}*/

function draw()
{
    background(0);

    

    stroke(255);
    strokeWeight(8);
    noFill();
    for(var i = 0;i<points.length;i++){
        var path = points[i];
        beginShape();
        for(var j = 0;j<path.length;j++){
        vertex(path[j].x,path[j].y);
    }
    endShape();
}
}

function mouseDragged(){
    var point = {
        x:mouseX,
        y:mouseY
    }
    currentPath.push(point);
}

function keyPressed(){
    if(keyCode === 32){
        points = [];
    }
}

function readPosition(data){
    position = data.val();
    points.x = position.x;
    points.y = position.y;
}

function showError(){
    console.log("error to writing in a database");
}
