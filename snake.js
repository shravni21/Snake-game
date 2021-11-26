function init() {
     canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 50;
    game_over = false;
    score=5;
  
    food = getRandomfood();
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createsnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawsnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 3, cs - 3);

            }
        },
        updatesnake: function () {
            console.log("updating snake according to the direction property");
            //if snake has eaten the food the length must be increase
            //generate new food object alse
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y) {
                console.log("food eaten");
                food = getRandomfood();
                score++;
            }
            else {

                this.cells.pop();
            }

            var nextx, nexty;
            //this is varying part
            if (this.direction == "right") {
                nextx = headX + 1;
                nexty = headY;
            }
            else if (this.direction == "left") {
                nextx = headX - 1;
                nexty = headY;
            }
            else if (this.direction == "down") {
                nextx = headX;
                nexty = headY + 1;
            }
            else {
                nextx = headX;
                nexty = headY - 1;

            }

            this.cells.unshift({ x: nextx, y: nexty });
            //prevent a snake to go out
            var last_x = Math.round(W / cs);
            var last_y = Math.round(H / cs);
            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y) {
                game_over = true;
            }
        }

    };

    snake.createsnake();
    // event listner on document object
    function keyPressed(e) {
        if (e.key == 'ArrowRight') {
            snake.direction = "right";

        }
        else if (e.key == 'ArrowLeft') {
            snake.direction = "left";
        }
        else if (e.key == 'ArrowDown') {
            snake.direction = "down";
        }
        else {
            snake.direction = "up";
        }
        console.log(snake.direction);
    }
    //adding event listner
    document.addEventListener('keydown', keyPressed);


}
function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawsnake();
    pen.fillStyle = food.color;
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
   // pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle = "white";
    pen.font = "70px cursive";
    pen.fillText(score,50,50);

}
function update() {
    snake.updatesnake();


}
function getRandomfood() {
    var foodX = Math.round(Math.random() * (W - cs) / cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);
    var food = {
        x: foodX,
        y: foodY,
        color: "red",

    }
    return food;
}
function gameloop() {
    if (game_over == true) {
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}
init();
var f = setInterval(gameloop, 100);