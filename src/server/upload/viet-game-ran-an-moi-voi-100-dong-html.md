Tiếp nối chuỗi bài viết Game bằng HTML, ở bài trước chúng ta đã tìm hiểu cách [Viết game flappy bird bằng HTML và JavaScript](http://5minuteshack.blogspot.com/2018/03/viet-game-flappy-bird-bang-html-js.html), hôm nay chúng ta sẽ viết 1 game khác đơn giản hơn, đó là [Rắn Ăn Mồi](http://5minuteshack.blogspot.com/2018/04/viet-game-ran-an-moi-voi-100-dong-html.html). Nếu các bạn đã xem bài Flappy chắc sẽ dễ hiểu code bài này do bài này ta vẫn dùng HTML Canvas để thiết kế game. Đầu tiên các bạn tạo 1 file HTML và nhập đoạn code sau:

```
<!DOCTYPE html>

<html>

<head>

<title></title>

<style>

  html, body {

    height: 100%;

    margin: 0;

  }


  body {

    background: black;

    display: flex;

    align-items: center;

    justify-content: center;

  }

  canvas {

    border: 1px solid white;

  }

  </style>

</head>

<body>

<canvas width="400" height="400" id="game"></canvas>

<script>
 //Ở đây ta tạo ra bộ khung chứa game

var canvas = document.getElementById('game');

var context = canvas.getContext('2d');



var grid = 16;
// khởi tạo đối tượng rắn là 1 ô vuông

var snake = {

  x: 160, //vị trí của snake theo hướng x,y

  y: 160,

  dx: grid, //hướng di chuyển theo phương x hoặc y,ở đây khi start game 
 //snake sẽ di chuyển theo x direction với value = 16

  dy: 0,      

  cells: [],

  maxCells: 4

};

var count = 0;

var apple = {

  x: 320,

  y: 320

};


function getRandomInt(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;

}


// game loop

function loop() {
//hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong

  requestAnimationFrame(loop);


  // slow game loop to 15 fps instead of 60 - 60/15 = 4

  if (++count < 4) {

    return;

  }


  count = 0;

  context.clearRect(0,0,canvas.width,canvas.height);


  snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị

  snake.y += snake.dy;


  // khi snake đụng tường sẽ chạy lại từ edge đối diện

  if (snake.x < 0) {

    snake.x = canvas.width - grid;

  }

  else if (snake.x >= canvas.width) {

    snake.x = 0;

  }


  if (snake.y < 0) {

    snake.y = canvas.height - grid;

  }

  else if (snake.y >= canvas.height) {

    snake.y = 0;

  }


  // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng

  snake.cells.unshift({x: snake.x, y: snake.y});


  // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.

  if (snake.cells.length > snake.maxCells) {

    snake.cells.pop();

  }


  // draw apple

  context.fillStyle = 'red';

  context.fillRect(apple.x, apple.y, grid-1, grid-1);


  // draw snake

  context.fillStyle = 'green';

  snake.cells.forEach(function(cell, index) {

    context.fillRect(cell.x, cell.y, grid-1, grid-1);


    // snake ate apple

    if (cell.x === apple.x && cell.y === apple.y) {

      snake.maxCells++;


      apple.x = getRandomInt(0, 25) * grid;

      apple.y = getRandomInt(0, 25) * grid;

    }


    // check va chạm khi rắn đụng đuôi

    for (var i = index + 1; i < snake.cells.length; i++) {

      

      // va chạm thì reset game

      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {

        snake.x = 160;

        snake.y = 160;

        snake.cells = [];

        snake.maxCells = 4;

        snake.dx = grid;

        snake.dy = 0;


        apple.x = getRandomInt(0, 25) * grid;

        apple.y = getRandomInt(0, 25) * grid;

      }

    }

  });

}

//bắt sự kiện bàn phím ấn xuống

document.addEventListener('keydown', function(e) {

  // lọc sự kiện keydown để rắn không di ngược lại

  if (e.which === 37 && snake.dx === 0) {

    snake.dx = -grid;

    snake.dy = 0;

  }

  else if (e.which === 38 && snake.dy === 0) {

    snake.dy = -grid;

    snake.dx = 0;

  }

  else if (e.which === 39 && snake.dx === 0) {

    snake.dx = grid;

    snake.dy = 0;

  }

  else if (e.which === 40 && snake.dy === 0) {

    snake.dy = grid;

    snake.dx = 0;

  }

});


requestAnimationFrame(loop);

</script>

</body>

</html>
```
Chạy file và xem kết quả:
https://2.bp.blogspot.com/-F7fQ_7M_LH0/WtVwlD6-R0I/AAAAAAAAAeo/Ysrn64EHSQ4WyQ2ulHLnvEaiwmkzFputwCLcBGAs/s1600/Vi%25E1%25BA%25BFt%2BGame%2BR%25E1%25BA%25AFn%2B%25C4%2582n%2BM%25E1%25BB%2593i%2Bv%25E1%25BB%259Bi%2B100%2Bd%25C3%25B2ng%2BHTML.PNG

[Viết game flappy bird bằng HTML và JavaScript (P.1)](http://5minuteshack.blogspot.com/2018/03/viet-game-flappy-bird-bang-html-js.html)