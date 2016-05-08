/**
 * Created by Administrator on 2016/5/8.
 */

    function Track(options) {
        this.options = options || {};
        this.paneName = this.options.paneName || 'labelPane';
        this.zIndex = this.options.zIndex || 0;
        this._map = options.map;
        this.points = options.points;
        this.pos = [];
        this.init();
        this.speed = 1.5;
        this.time = 0;
        this.running = true;
        this.creeper = new Creeper(this,0);
        this.context;

    };

    Track.prototype = new BMap.Overlay();

    Track.prototype.init = function() {
        //将经纬度转换成像素坐标
        var arrPoints = this.points.split(";");
        for(var i in arrPoints) {
            var pixel = map.pointToPixel(new BMap.Point(arrPoints[i].split(",")[0],arrPoints[i].split(",")[1]));
            this.pos.push([pixel.x, pixel.y]);
        }
    };

    Track.prototype.initialize = function(map) {
        this._map = map;
        var canvas = this.canvas = document.createElement("canvas");
        canvas.style.cssText = "position:absolute;" + "left:0;" + "top:0;" + "z-index:" + this.options.zIndex + ";";
        map.getPanes()[this.paneName].appendChild(canvas);
        return this.canvas;
    };

    Track.prototype.draw = function() {
        var map = this._map;

        var size = map.getSize();
        var center = map.getCenter();
        if (center) {
            var pixel = map.pointToOverlayPixel(center);
            this.canvas.style.left = pixel.x - size.width / 2 + 'px';
            this.canvas.style.top = pixel.y - size.height / 2 + 'px';
        }

        var canvas = this.canvas;
        canvas.width = map.width;
        canvas.height = map.height;
        this.context = canvas.getContext('2d');
    }

    var draw1 = function(ctx) {
        if (Math.floor(this.fpc) == this.time) {
            time = 0;
            creeper = creeper.spawn(this);
            //console.log(creeper.depth);
        }
        if(true) {
            ctx.clearRect(0, 0, map.width, map.height);
            var target = this.segment(creeper.x,creeper.y,creeper.x1, creeper.y1, time);

            var g = ctx.createRadialGradient(target.x,target.y, 0, target.x,target.y, 10);
            g.addColorStop(0, 'black');
            g.addColorStop(1, 'rgba(0, 0, 255, 0)');
            ctx.beginPath();
            ctx.arc(target.x,target.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
        }
    };

    Track.prototype.segment = function(x1, y1, x2, y2, n) {
        this.fpc = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) / speed;
        var dx = (x2 - x1) / this.fpc;
        var dy = (y2 - y1) / this.fpc;
        var xx = x1 + n * dx;
        var yy = y1 + n * dy;
        return {
            x: xx,
            y: yy
        };
    };

    Track.prototype.loop = function() {
        draw1(this.context);
        this.time++;
        if (this.running) requestAnimationFrame(this.loop);
    };

    Track.prototype.getContainer = function () {
        return this.canvas;
    };

    Track.prototype.show = function () {
        if (!this.canvas) {
            this._map.addOverlay(this);
        }
    };

    Track.prototype.hide = function () {
        this._map.removeOverlay(this);
    };

    Track.prototype.setZIndex = function (zIndex) {
        this.canvas.style.zIndex = zIndex;
    };

    Track.prototype.getZIndex = function () {
        return this.zIndex;
    };

    function Creeper(t, n) {
        if(t.pos) {
            if(n == t.pos.length-1) n=0;
            this.x = t.pos[n][0];
            this.y = t.pos[n][1];
            this.x1 = t.pos[n+1][0];
            this.y1 = t.pos[n+1][1];
            this.depth = (n || 0);
        }
    };

    Creeper.prototype.spawn = function(t) {
        return new Creeper(t,this.depth + 1);
    };

