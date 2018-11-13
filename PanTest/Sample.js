var gameNS = {};
var count;

function main()
{
    var canvas = document.getElementById("mycanvas");
    //this.ctx = this.canvas.getContext("2d");
    canvas.id = 'mycanvas';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d");

    gameNS.cameraSystem = new CameraSystem();
    var imgSrc = new Image(100, 100);
    imgSrc.src = "trashMammal.png";
    imgSrc.x = 0;
    imgSrc.y = 0;
    imgSrc.w = 100;
    imgSrc.h = 100;
    this.img = new Sprite(100, 100, 100, 100, imgSrc);

    gameNS.cameraSystem.addElementToWorld(this.img);
    
    count = 0;
    setInterval(panLoop, 33);
}

function panLoop(){
    if(count < 10)
        gameNS.cameraSystem.Pan(-10, 0); 
    else if(count < 20)
        gameNS.cameraSystem.Pan(0, 10);
    else if(count < 25)
        gameNS.cameraSystem.Pan(10, 0); 
    else if (count < 30)
        gameNS.cameraSystem.Pan(0, -10); 

    var canvas = document.getElementById("mycanvas");
    canvas.getContext("2d").clearRect(0,0, canvas.width, canvas.height);
    gameNS.cameraSystem.elements[0].draw();
    count ++;
}