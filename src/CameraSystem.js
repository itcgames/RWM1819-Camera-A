class CameraSystem{
    constructor(worldSpace, cameraSpace){
        this.cam = new Camera(cameraSpace);
        this.world = new World(worldSpace);
        this.focus = {};
        this.focusing = false;
        this.focusLastCoords = {x:0,y:0};
        this.elements = [];
        this.zoomFactor = 1;
        this.angle = 0;
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

    addElementToCameraLayer(elem, layer){
        this.elements.push(elem);
        this.cam.addElementToLayer(elem, layer);
    }

    addElementToWorldLayer(elem, layer){
        this.elements.push(elem);
        this.world.addElementToLayer(elem, layer);
    }

    draw(){
        if(this.focusing)
        {
            if(this.focusLastCoords.x !== this.focus.x || this.focusLastCoords.y !== this.focus.y)
            {
                this.Pan(this.focus.x-this.focusLastCoords.x, this.focusLastCoords.y-this.focus.y);
                this.focusLastCoords = {x:this.focus.x, y:this.focus.y};
            }
        }
        //this.cam.canvas.getContext("2d").clearRect(0,0, this.cam.canvas.width, this.cam.canvas.height);
        this.world.canvas.getContext("2d").clearRect(0,0, this.world.canvas.width, this.world.canvas.height);
        this.world.draw();
        this.cam.draw();
    }

    setFocus(obj){
        this.focusing = true;
        this.focus = obj;
        this.focusLastCoords = {x:obj.x, y:obj.y};
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

    Rotate(angle){
        //angle measured clockwise from top
        var actualAngle = angle-this.angle;
        this.angle = angle;
        this.world.canvas.getContext("2d").translate(this.world.canvas.width / 2, this.world.canvas.height / 2);
        this.world.canvas.getContext("2d").rotate(actualAngle * Math.PI / 180);
        this.world.canvas.getContext("2d").translate(-(this.world.canvas.width / 2), -(this.world.canvas.height / 2));
    }


}