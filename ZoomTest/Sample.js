var gameNS = {};
var count;

function main()
{
    //canvas init as required for camera system
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
    //init end

    gameNS.cameraSystem = new CameraSystem(worldCanvas, UICanvas);
    var imgSrc = new Image(100, 100);
    imgSrc.src = "trashMammal.png";
    imgSrc.x = 0;
    imgSrc.y = 0;
    imgSrc.w = 100;
    imgSrc.h = 100;

    this.img = new Sprite(900, 450, 100, 100, imgSrc);

    var spr = new Sprite(50, 50, 100, 100, imgSrc);

    gameNS.cameraSystem.addElementToWorld(this.img);
    gameNS.cameraSystem.addElementToCamera(spr);
    
    count = 0;
    setInterval(zoomLoop, 33);
}

function zoomLoop(){
    if(count < 10)
        gameNS.cameraSystem.Zoom(0.5); 
    else if(count < 20)
        gameNS.cameraSystem.Zoom(0.75); 
    else if(count < 30)
        gameNS.cameraSystem.Zoom(1);
    else if(count < 40)
        gameNS.cameraSystem.Zoom(1.5); 
    else if(count < 50)
        gameNS.cameraSystem.Zoom(2); 
    else if(count < 60) 
        gameNS.cameraSystem.Zoom(4); 

    gameNS.cameraSystem.draw();
    count ++;
}