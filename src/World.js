class World {
    constructor(canvas){
        this.elements = [];
        this.canvas = canvas;
    }

    addElement(elem){
        this.elements.push(elem);
    }
    
    draw(){
        this.elements.forEach(function(entry){
            entry.draw(this.canvas);
        },this)
    }
}