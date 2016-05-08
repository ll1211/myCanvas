/**
 * Created by Administrator on 2016/5/8.
 */
;(function($){

    var Track = new function(opts) {
        this.context;
        this.width = innerWidth;
        this.height = innerHeight;
        this.pos = [];

        this.options = {
            speed: 1.5,
            points: ""
        },
        $.extend(this.options, opts||{});
        this.init();
    };

    Track.prototype = new BMap.Control();

    Track.prototype = {
        init: function() {
            var canvas = document.createElement('canvas');
            this.context = canvas.getContext('2d');
            var arrPoints = this.options.points.split(";");
            for(var i in arrPoints) {
                this.pos.push(arrPoints.split(","));
            }
        },

        draw: function() {
            if (Math.floor(FPC) == time) {
                time = 0;
                creeper = creeper.spawn();
                console.log(creeper.depth);
            }
            if(running) {
                this.context.clearRect(0, 0, this.width, this.height);
                var target = segment(creeper.x,creeper.y,creeper.x1, creeper.y1, time);

                var g = this.context.createRadialGradient(target.x,target.y, 0, target.x,target.y, 4);
                g.addColorStop(0, 'white');
                g.addColorStop(1, 'rgba(0, 0, 255, 0)');
                this.context.beginPath();
                this.context.arc(target.x,target.y, 4, 0, Math.PI * 2);
                this.context.fillStyle = g;
                this.context.fill();
            }
        }
    };

    window["Track"] = Track;

})(jQuery);