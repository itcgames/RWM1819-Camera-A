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
        //ex: input wants to get 4x zoom. Is at 2x zoom.
        //zoomratio is at 4.
        //zoomfactor is at 2(becomes 4) 
        //actualzoom should become 2
        //actualZoom = zoomRatio/zoomfactor?
        //ex: input wants to get 1/2 zoom. Is at 4x zoom.
        //zoomRatio is at 0.5
        //zoomfactor is at 4(becomes 0.5)
        //actualZoom should become 1/8
        //actualZoom = zoomRatio/zoomfactor?
        //ex: input wants to get 1/2 zoom. is at 1/2 zoom
        //zoomratio is at 0.5
        //zoomfactor is at 0.5
        //actualzoom should become 1
        //actualzoom = zoomratio/zoomfactor
        var actualZoom = zoomRatio/this.zoomFactor;
        this.zoomFactor = zoomRatio;
        this.world.canvas.getContext("2d").translate(this.world.canvas.width / 2, this.world.canvas.height / 2);
        this.world.canvas.getContext("2d").scale(actualZoom, actualZoom);
        this.world.canvas.getContext("2d").translate(-(this.world.canvas.width / 2), -(this.world.canvas.height / 2));
    }

    ResetZoom(){
        //ex: reset 4x zoom to 1x
        //zoomfactor is at 4
        //final zoom should be 1
        //resetRatio should be 1/zoomfactor
        //ex: reset 0.5x zoom to 1x
        //zoomfactor is at 0.5
        //final is 1
        //resetratio should be 1/zoomfactor
        var resetRatio = 1/this.zoomFactor;
        this.world.canvas.getContext("2d").translate(this.world.canvas.width / 2, this.world.canvas.height / 2);
        this.world.canvas.getContext("2d").scale(resetRatio, resetRatio);
        this.world.canvas.getContext("2d").translate(-(this.world.canvas.width / 2), -(this.world.canvas.height / 2));
    }


}