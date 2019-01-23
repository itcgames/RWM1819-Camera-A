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
    imgSrc.src = "trashMammal.png";
    imgSrc.x = 0;
    imgSrc.y = 0;
    imgSrc.w = 100;
    imgSrc.h = 100;

    this.img = new Sprite(100, 100, 100, 100, imgSrc);

    this.spr = new Sprite(250, 250, 100, 100, imgSrc);

    gameNS.cameraSystem.addElementToWorld(this.img);
    gameNS.cameraSystem.addElementToWorld(this.spr);
    gameNS.cameraSystem.setFocus(this.spr);
    //gameNS.cameraSystem.addElementToCamera(spr);
    
    count = 0;
    setInterval(Loop, 33);
}

function Loop(){
    if(count < 10)
        this.spr.x+=10;
    else if(count < 20)
        this.spr.y+=10;
    else if(count < 25)
        this.spr.y-=10;
    else if (count < 30)
        this.spr.x-=10;

    gameNS.cameraSystem.draw();
    count ++;
}