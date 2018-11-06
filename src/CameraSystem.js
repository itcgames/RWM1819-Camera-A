class CameraSystem{
    constructor(){
        this.cam = new Camera();
        this.world = new World();
        this.focus = {};
        this.elements = [];
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

    setFocus(obj){
        this.focus = obj;
    }

    Pan(x, y){
        this.world.Pan(x, y);
    }


}