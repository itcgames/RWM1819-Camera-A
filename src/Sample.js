//var img = {x:0, y:100, w:100, h:100};

function main()
{
    var canvas = document.getElementById("mycanvas");
    //this.ctx = this.canvas.getContext("2d");
    canvas.id = 'mycanvas';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d");

    this.cameraSystem = new CameraSystem();
    var imgSrc = new Image(100, 100);
    imgSrc.src = "trashMammal.png";
    imgSrc.x = 0;
    imgSrc.y = 0;
    imgSrc.w = 100;
    imgSrc.h = 100;
    this.img = new Sprite(0, 0, 100, 100, imgSrc);

    this.cameraSystem.addElementToWorld(this.img);

    //this.cameraSystem.Pan(1, 1);
    this.cameraSystem.Pan(0, 0);
    //img.src.onload = loadDisplay(img);
    /*imgSrc.onload = function(){
        document.getElementById("mycanvas").getContext("2d").drawImage(img.src, img.x, img.y, img.w, img.h);
    }*/
}
