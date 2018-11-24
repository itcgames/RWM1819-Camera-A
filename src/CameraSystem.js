class CameraSystem{
    constructor(worldSpace, cameraSpace){
        this.cam = new Camera(cameraSpace);
        this.world = new World(worldSpace);
        this.focus = {};
        this.elements = [];
        this.zoomFactor = 1;
    }

    addElement(elem){
        this.elements.push(elem);
    }

    addElementToCamera(elem){
        this.elements.push(elem);
        this.cam.addElement(elem);
    }

    addElementToWorld(elem){
        this.elements.push(elem);
        this.world.addElement(elem);
    }

    draw(){
        //this.cam.canvas.getContext("2d").clearRect(0,0, this.cam.canvas.width, this.cam.canvas.height);
        this.world.canvas.getContext("2d").clearRect(0,0, this.world.canvas.width, this.world.canvas.height);
        this.world.draw();
        this.cam.draw();
    }

    setFocus(obj){
        this.focus = obj;
    }

    Pan(x, y){
        this.world.canvas.getContext("2d").translate(-x, y);
    }

    Zoom(zoomRatio){
        var actualZoom = zoomRatio/this.zoomFactor;
        this.zoomFactor = zoomRatio;
        this.world.canvas.getContext("2d").translate(this.world.canvas.width / 2, this.world.canvas.height / 2);
        this.world.canvas.getContext("2d").scale(actualZoom, actualZoom);
        this.world.canvas.getContext("2d").translate(-(this.world.canvas.width / 2), -(this.world.canvas.height / 2));
    }

    ResetZoom(){
        var resetRatio = 1/this.zoomFactor;
        this.world.canvas.getContext("2d").translate(this.world.canvas.width / 2, this.world.canvas.height / 2);
        this.world.canvas.getContext("2d").scale(resetRatio, resetRatio);
        this.world.canvas.getContext("2d").translate(-(this.world.canvas.width / 2), -(this.world.canvas.height / 2));
    }


}