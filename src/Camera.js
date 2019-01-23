class Camera{
    constructor(canvas){
        //this.elements = [];
        this.canvas = canvas;
        this.layers = {1:[]};
    }

    addElement(elem){
        this.layers[1].push(elem);
    }

    addElementToLayer(elem, layer){
        debugger
        if(this.layers.hasOwnProperty(layer)){
            this.layers[layer].push(elem);
        }
        else{
            var keys = Object.keys(this.layers);
            while(keys[keys.length - 1] != layer){
                var index = keys.length;
                this.layers[index] = [];
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
        /*this.elements.forEach(function(entry){
            entry.draw(this.canvas);
        },this)*/
    }

}