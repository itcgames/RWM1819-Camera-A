class Camera{
    constructor(canvas){
        this.elements = [];
        this.canvas = canvas;
        this.layers = {0:[]};
    }

    addElement(elem){
        this.elements.push(elem);
        this.addElementToLayer(elem, 1);
    }

    addElementToLayer(elem, layer){
        if(this.layers.hasOwnProperty(layer)){
            this.layers[layer].push(elem);
        }
        else{
            var keys = Object.keys(this.layers);
            while(keys[keys.length - 1] != layer){
                var index = keys.length;
                this.layers[index] = [];
                keys = Object.keys(this.layers);
            }
            this.layers[layer] = [];
            this.layers[layer].push(elem);
        }
        
    }

    draw(){
        for(var key in this.layers)
        {
            this.layers[key].forEach(function(entry){
                entry.draw(this.canvas);
            },this)
        }
    }
}