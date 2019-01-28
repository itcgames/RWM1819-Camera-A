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

    this.img = new Sprite(50, 50, 100, 100, imgSrc);
    console.log("element");

    var spr1 = new Sprite(50, 50, 100, 100, imgSrc);
    var spr2 = new Sprite(50, 50, 100, 100, imgSrc);
    var spr3 = new Sprite(50, 50, 100, 100, imgSrc);
    var spr4 = new Sprite(50, 0, 100, 100, imgSrc);
    var spr5 = new Sprite(0, 0, 100, 100, imgSrc);

    //gameNS.cameraSystem.addElementToWorld(this.img);
    gameNS.cameraSystem.addElementToWorldLayer(this.img, 1);
    gameNS.cameraSystem.addElementToWorldLayer(spr1, 2);
    gameNS.cameraSystem.addElementToWorldLayer(spr2, 3);
    gameNS.cameraSystem.addElementToWorldLayer(spr3, 4);
    gameNS.cameraSystem.addElementToCameraLayer(spr4, 3);
    gameNS.cameraSystem.addElementToCameraLayer(spr5, 1);


    
    count = 0;
    setInterval(Loop, 33);
}

function Loop(){
    //gameNS.cameraSystem.Pan(-10, 0); 
    if(count < 50)
        gameNS.cameraSystem.Pan(-10, 0); 
    else if(count < 100)
    {   
        gameNS.cameraSystem.SetWorldLayerDepthFactor(1.5);
        gameNS.cameraSystem.Pan(0, 10);
    }
    else if(count < 150)
    {
        gameNS.cameraSystem.SetWorldLayerDepthFactor(0.5);
        gameNS.cameraSystem.Pan(10, 0);

    } 
    else if (count < 200)
    {
        gameNS.cameraSystem.SetWorldLayerDepthFactor(1);
        gameNS.cameraSystem.Pan(0, -10); 
    }

    gameNS.cameraSystem.draw();
    count ++;
}