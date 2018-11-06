class World {
    constructor(){
        this.elements = [];
    }

    addElement(elem){
        this.elements.push(elem);
    }

    Pan(x, y){
        for(var i = 0; i<this.elements.length; i++)
        {
            this.elements[i].x = this.elements[i].x-x;
            this.elements[i].y = this.elements[i].y-y;
        }
    }
}