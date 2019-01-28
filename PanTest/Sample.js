var gameNS = {};
var count;

function main()
{
    //var canvas = document.getElementById("mycanvas");
    //this.ctx = this.canvas.getContext("2d");
    var worldCanvas = document.createElement('canvas');
    worldCanvas.id = 'worldSpace';
    worldCanvas.style.position = 'absolute';
    worldCanvas.width  = window.innerWidth;
    worldCanvas.height = window.innerHeight;
    worldCanvas.style.backgroundColor = "transparent";
    document.body.appendChild(worldCanvas);
    var UICanvas = document.createElement('canvas');
    UICanvas.id = 'cameraSpace';
    UICanvas.style.position = 'absolute';
    UICanvas.width  = window.innerWidth;
    UICanvas.height = window.innerHeight;
    UICanvas.style.backgroundColor = "transparent";
    document.body.appendChild(UICanvas);

    gameNS.cameraSystem = new CameraSystem(worldCanvas, UICanvas);
    var imgSrc = new Image(100, 100);
    imgSrc.src = "../trashMammal.png";
    imgSrc.x = 0;
    imgSrc.y = 0;
    imgSrc.w = 100;
    imgSrc.h = 100;

    this.img = new Sprite(100, 100, 100, 100, imgSrc);

    var spr = new Sprite(50, 50, 100, 100, imgSrc);

    gameNS.cameraSystem.addElementToWorld(this.img);
    gameNS.cameraSystem.addElementToCamera(spr);
    
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

    gameNS.cameraSystem.draw();
    count ++;
}