var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(player, this.x, this.y + 10);
    }
}

// dino.draw();
var player = new Image();
player.src = 'player.png';
var fence = new Image();
fence.src = 'fence.png';

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(fence, this.x, this.y);
};
};

var cactus = new Cactus();

cactus.draw();

var timer = 0;
var cactusArray = [];
var jumpTimer = 0;
var animation;
// function 프레임마다실행할거(){ //1초에60번
    function frames(){

        
        animation = requestAnimationFrame(frames);
        timer++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (timer % 200 === 0){
            var cactus = new Cactus();
            cactusArray.push(cactus);
        }

        cactusArray.forEach((a, i, o)=>{
            //x좌표가 0미만이면 제거
            if(a.x < 0){
                o.splice(i,1);
            }
            
            a.x--; 
            collision(dino, a);
            a.draw()
        });

        if(jumping == true){
            dino.y--;
            jumpTimer++;
        };

        if(jumping == false){
            if(dino.y < 200){
                dino.y++;
            }
        };

        if (jumpTimer > 100){
            jumping = false;
            jumpTimer = 0;
        }
        // cactus.draw();
        // dino.x++;
        dino.draw();
    };
frames();

        //충돌확인
        //collision check
        // 장애물의 왼쪽 x좌표 - 플레이어의 오른쪽 x좌표 < 0
        // 장애물의 위쪽 y좌표 - 플레이어의 아래 x좌표 < 0
function collision(dino, cactus){
    var xAxis = cactus.x - (dino.x + dino.width);
    var yAxis = cactus.y - (dino.y + dino.height);
    if (xAxis < 0 && yAxis < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        alert("한번 더?");
        location.reload();
    }
}

var jumping = false;
document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        jumping = true;
    }
});