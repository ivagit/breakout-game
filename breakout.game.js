(function(){
    function BreakOut() {
        this.canvas = document.getElementById('game-wrapper');
        this.ctx = this.canvas.getContext('2d');
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        this.dx = 4;
        this.dy = -4;
        this.ball = {
            radius: 20
        };
        this.paddle = {
            width: 105,
            height: 10,
            step: 8,
            leftControlPressed: false,
            rightControlPressed: false
        };
        this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
    }

    BreakOut.prototype = {
        _bootstrap: function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this._drawBall();
            this._drawPaddle();

            if (this.x + this.dx > this.canvas.width - this.ball.radius || this.x + this.dx < this.ball.radius) {
                this.dx = -this.dx;
            }

            if (this.y + this.dy < this.ball.radius) {
                this.dy = -this.dy;
            } else if (this.y + this.dy > this.canvas.height - this.ball.radius) {
                if(this.x > this.paddle.x && this.x < this.paddle.x + this.paddle.width) {
                    this.dy = -this.dy;
                }
                else {
                    alert('Game Over');
                    document.location.reload();
                }
            }

            this.x += this.dx;
            this.y += this.dy;

            window.requestAnimationFrame(this._bootstrap.bind(this));
        },

        _drawBall: function () {
            this.ctx.beginPath();
            this.ctx.arc(
                this.x,
                this.y,
                this.ball.radius,
                0,
                Math.PI*2,
                false
            );
            this.ctx.fillStyle = "#FF0000";
            this.ctx.fill();
            this.ctx.closePath();
        },
        
        _drawPaddle: function () {
            if (this.paddle.leftControlPressed && this.paddle.x > 0) {
                this.paddle.x -= this.paddle.step;
            }
            if (this.paddle.rightControlPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
                this.paddle.x += this.paddle.step;
            }
            this.ctx.beginPath();
            this.ctx.rect(
                this.paddle.x,
                this.canvas.height - this.paddle.height,
                this.paddle.width,
                this.paddle.height
            );
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fill();
            this.ctx.closePath();
        },

        _paddleStartMovingHandler: function (e) {
            if(e.keyCode == 39) {
                this.paddle.rightControlPressed = true;
            }
            else if(e.keyCode == 37) {
                this.paddle.leftControlPressed = true;
            }
        },

        _paddleStopMovingHandler: function (e) {
            if(e.keyCode == 39) {
                this.paddle.rightControlPressed = false;
            }
            else if(e.keyCode == 37) {
                this.paddle.leftControlPressed = false;
            }
        }
    };

    BreakOut.prototype.start = function () {
        document.addEventListener('keydown', this._paddleStartMovingHandler.bind(this), false);
        document.addEventListener('keyup', this._paddleStopMovingHandler.bind(this), false);
        this._bootstrap();
    }

    window.BreakOut = BreakOut;
}());