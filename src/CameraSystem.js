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
        this.lerping = false;
        this.lerpOptions = {dx:0, dy:0, lx: 0, ly: 0, startTime:0, duration: 200};
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
            if((this.focusLastCoords.x !== this.focus.x || this.focusLastCoords.y !== this.focus.y)&&this.lerping === false)
            {
                this.lerping = true;
                this.lerpOptions.dx = this.focus.x-this.focusLastCoords.x;
                this.lerpOptions.dy = this.focusLastCoords.y-this.focus.y;
                this.lerpOptions.lx = 0;
                this.lerpOptions.ly = 0;
                this.lerpOptions.startTime = Date.now();
                //var lerpStart = Date.now();
                /*this.Pan(this.focus.x-this.focusLastCoords.x, this.focusLastCoords.y-this.focus.y);*/
                this.focusLastCoords = {x:this.focus.x, y:this.focus.y};
            }
            if(this.lerping)
            {
                var factor = this.SmoothLerp(this.lerpOptions.startTime, this.lerpOptions.duration)
                if(factor >= 1)
                {
                    factor = 1;
                    this.lerping = false;
                }
                var targetDX = this.lerpOptions.dx*factor;
                var targetDY = this.lerpOptions.dy*factor;
                var tempx = targetDX;
                var tempy = targetDY;
                targetDX-=this.lerpOptions.lx;
                targetDY-=this.lerpOptions.ly;
                this.Pan(targetDX, targetDY);
                this.lerpOptions.lx = tempx;
                this.lerpOptions.ly = tempy;
            }
        }
        //this.cam.canvas.getContext("2d").clearRect(0,0, this.cam.canvas.width, this.cam.canvas.height);
        this.world.canvas.getContext("2d").clearRect(-1000,-1000, this.world.canvas.width*this.world.canvas.width, this.world.canvas.height*this.world.canvas.height);
        this.world.draw();
        this.cam.draw();
    }

    setFocus(obj, duration = 200){
        this.focusing = true;
        this.focus = obj;
        this.focusLastCoords = {x:obj.x, y:obj.y};
        this.lerpOptions.duration = duration;
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

    SmoothLerp(startTime, timeToTarget = 185){
        //gives how far along you are before reaching the target
        let lerpFactor = 0;
        let now = Date.now();
        lerpFactor = (now - startTime) / timeToTarget;
        if(lerpFactor>1)
            lerpFactor =1;
        //gives the actual displacement factor
        let smoothstepFactor = 0;

        smoothstepFactor= lerpFactor * lerpFactor * (3.0 - 2.0 * lerpFactor);
        return smoothstepFactor;
        //find the actual position
    }


}