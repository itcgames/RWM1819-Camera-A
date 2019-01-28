class World {
    constructor(canvas) {
        this.canvas = canvas;
        this.elements = [];
        this.layers = {
            0: []
        };
        this.canvases = {
            0: this.canvas
        };
        this.panCoords = {
            x: 0,
            y: 0
        };
        this.depth = 1;
    }

    addElement(elem) {
        this.elements.push(elem);
        this.addElementToLayer(elem, 1);
    }

    addElementToLayer(elem, layer) {
        if (this.layers.hasOwnProperty(layer)) {
            this.layers[layer].push(elem);
        } else {
            var keys = Object.keys(this.layers);
            while (keys[keys.length - 1] != layer) {
                var index = keys.length;
                this.layers[index] = [];
                this.canvases[index] = document.createElement('canvas');
                this.canvases[index].id = this.canvas.id + index.toString();
                this.canvases[index].style.position = this.canvas.style.position;
                this.canvases[index].width = this.canvas.width;
                this.canvases[index].height = this.canvas.height;
                this.canvases[index].style.backgroundColor = this.canvas.style.backgroundColor;
                this.canvases[index].style.zIndex = -index;
                document.body.appendChild(this.canvases[index]);
                keys = Object.keys(this.layers);
            }
            this.layers[layer].push(elem);
            document.body.appendChild(this.canvases[layer]);
        }

    }

    draw() {
        for (var key in this.layers) {
            this.layers[key].forEach(function (entry) {
                if (key != 0) {
                    entry.draw(this.canvases[key]);
                } else {
                    entry.draw(this.canvases[key]);
                }
            }, this)
        }
    }

    pan(x, y) {
        for (var key in this.canvases) {
            if (key != 0) {
                var ctx = this.canvases[key].getContext("2d");
                ctx.translate(-x / key * this.depth, y / key * this.depth);
            }
        }
    }

    zoom(zoomRatio) {
        var actualZoom = zoomRatio / this.zoomFactor;
        this.zoomFactor = zoomRatio;
        for (var key in this.canvases) {
            var ctx = this.canvases[key].getContext("2d");
            ctx.translate(this.canvases[key].width / 2, this.canvases[key].height / 2);
            ctx.scale(actualZoom, actualZoom);
            ctx.translate(-(this.canvases[key].width / 2), -(this.canvases[key].height / 2));
        }
    }

    resetZoom(){
        var resetRatio = 1/this.zoomFactor;
        for (var key in this.canvases) {
            var ctx = this.canvases[key].getContext("2d");
            ctx.translate(this.canvases[key].width / 2, this.canvases[key].height / 2);
            ctx.scale(resetRatio, resetRatio);
            ctx.translate(-(this.canvases[key].width / 2), -(this.canvases[key].height / 2));
        }
    }

    rotate(angle){
        //angle measured clockwise from top
        var actualAngle = angle-this.angle;
        this.angle = angle;
        for (var key in this.canvases) {
            var ctx = this.canvases[key].getContext("2d");
            ctx.translate(this.canvases[key].width / 2, this.canvases[key].height / 2);
            ctx.rotate(actualAngle * Math.PI / 180);
            ctx.translate(-(this.canvases[key].width / 2), -(this.canvases[key].height / 2));
        }
    }

    clear() {
        for (var key in this.canvases) {
            var ctx = this.canvases[key].getContext("2d");
            ctx.clearRect(-1000, -1000, this.canvases[key].width * this.canvases[key].width, this.canvases[key].height * this.canvases[key].height);
        }
    }

    setDepthFactor(d) {
        this.depth = d;
    }
}