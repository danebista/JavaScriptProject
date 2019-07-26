

var vector2d = function (vx, vy) {

    var vec = {
        
        x: vx,
        y: vy,

        scale: function (scale) {
            vec.x *= scale;
            vec.y *= scale;
            return(this);
        },
        add: function (vec2) {
            vec.x += vec2.x;
            vec.y += vec2.y;
            return(this);
        },

        sub: function (vec2) {
            vec.x -= vec2.x;
            vec.y -= vec2.y;
            return(this);
        },

        dist: function (vec2) {
         return(vec2.copy().sub(this).length());
        },

        angleBetween: function (vec2) {
            return(vec2.angle() - this.angle());
        },

        angle: function () {
            return(Math.atan2(this.y, this.x));
        },

        negate: function () {
            vec.x = -vec.x;
            vec.y = -vec.y;
            return(this);
        },


        length: function () {
            return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
        },

        lengthSquared: function () {
            return vec.x * vec.x + vec.y * vec.y;
        },
        normalize: function () {
            var len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
            if (len) {
                vec.x /= len;
                vec.y /= len;
            }
            return(this);
        },

       
        rotate: function (angle) {
            var x = vec.x,
                y = vec.y,
                cosVal = Math.cos(angle),
                sinVal = Math.sin(angle);
            vec.x = x * cosVal - y * sinVal;
            vec.y = x * sinVal + y * cosVal;
            return(this);
       },


        dotProd: function(v2) {
 		    return (this.x * v2.x) + (this.y * v2.y);
        },

        copy: function() {
            return(vector2d(this.x, this.y));
        }
    };
    return vec;
};

function Vector2d()
{
	if (arguments.length == 1)
	{
		this.x = arguments[0].x;
		this.y = arguments[0].y;
	}
	else
	{
		this.x = arguments[0];
		this.y = arguments[1];
	}


	Vector2d.prototype.mul = function(mul)
	{
		this.x *= mul;
		this.y *= mul;
        return(this);
	};


	Vector2d.prototype.add = function(v2)
	{
		this.x += v2.x;
		this.y += v2.y;
        return(this);
	};

	Vector2d.prototype.sub = function(v2)
	{
		this.x -= v2.x;
		this.y -= v2.y;
        return(this);
	};


	Vector2d.prototype.len = function()
	{
		return Math.sqrt(this.x*this.x + this.y*this.y);
	};

    Vector2d.prototype.normalize = function()
	{
		var len = Math.sqrt(this.x*this.x + this.y*this.y);
		if(len) {
			this.x /= len;
			this.y /= len;
		}
        return(this);
	};

	
	Vector2d.prototype.dotProd = function(v2)
	{
		return (this.x * v2.x) + (this.y * v2.y);
	};

	
	Vector2d.prototype.rotate = function(ang)
	{
		this.x = (this.x * Math.cos(ang)) - (this.y * Math.sin(ang));
		this.y = (this.y * Math.cos(ang)) + (this.x * Math.sin(ang));
        return(this);
	};

	Vector2d.prototype.negate = function()
	{
		this.x = -this.x;
		this.y = -this.y;
        return(this);
	};

	
	Vector2d.prototype.toString = function()
	{
		return 'x = ' + this.x + ', y = ' + this.y;
	};

    Vector2d.prototype.rotate = function(angle) {
        this.x = Math.cos(angle) * this.x - Math.Sin(angle) * this.y
        this.y = Math.Sin(angle) * this.x + Math.Cos(angle) * this.y
        return(this);

    };

           Vector2d.prototype.copy =  function() {
        return(new Vector2d(this.x, this.y));
    };

       
    Vector2d.prototype.dist = function (vec2) {
     return(vec2.copy().sub(this).len());
    };

       
    Vector2d.prototype.angleBetween = function (vec2) {
        return(vec2.angle() - this.angle());
    };

       
    Vector2d.prototype.angle =  function () {
        return(Math.atan2(this.y, this.x));
    };



};
