class World {
    constructor(){
        this.elements = [];
    }

    addElement(elem){
        this.elements.push(elem);
    }

    Pan(x, y){
    var canvas = document.getElementById("mycanvas");
    canvas.getContext("2d").translate(-x, y);
    }
}