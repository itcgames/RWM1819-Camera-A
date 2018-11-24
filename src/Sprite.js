class Sprite{

    draw(canvas){
        canvas.getContext("2d").drawImage(this.src, this.x, this.y, this.w, this.h);

    }
    constructor(X = 0, Y = 0, W = 100, H = 100, img = new Image()){
        this.x = X;
        this.y = Y;
        this.w = W;
        this.h = H;
        this.src = img;
        //var that = this;
        //this.src.addEventListener("load", function(){that.draw()}, false)
    }
}