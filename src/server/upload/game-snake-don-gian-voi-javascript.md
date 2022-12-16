Xin chào mọi người hôm nay chúng ta cùng nhau đi tìm hiểu cách để xây dựng một game đơn giản với HTML và JS như thế nào nhé. Trò chơi này rất đơn giản và cũng khá nhiều người biết đến đó là Snake. Bắt đầu thôi :D
## HTML
Việc đầu tiên là chúng ta sẽ tạo một tệp index.html như sau
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <canvas id = "canvas" width = "400" height = "400"> </ canvas>
</body>
</html>
```
## Javascript
Tiếp theo thẻ Canvas chúng ta sẽ thêm thẻ script, đây chính là nơi chúng ta xây dựng Javascript để xử lý logic con rắn và render vào canvas.

Trước tiên, hãy xác định những gì sẽ xảy ra khi sự kiên window.onload. Chúng ta muốn có được bối cảnh của canvas, chúng ta muốn nhận các sự kiện phím bấm của người chơi và render lại vị trí mới của con rắn cùng miếng mồi thường xuyên.
```js
var canvas, ctx;

    window.onload = function() {
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      document.addEventListener("keydown", keyDownEvent);

      var x = 8;
      setInterval(draw, 1000 / x);
    };
```
Sau 8 giây thì chúng ra sẽ vẽ lại một lần. Chúng ta có thể làm nó nhanh hơn bằng cách thay đổi x.
### Input
Bây giờ chúng ta cần xác định hàm keyDownEvent. Key codes chính là các phím mũi tên trên bàn phím, bắt đầu bằng phím mũi tên trái và đi theo chiều kim đồng hồ.
```js
function keyDownEvent(e) {
  switch (e.keyCode) {
  case 37:
    nextX = -1;
    nextY = 0;
    break;
  case 38:
    nextX = 0;
    nextY = -1;
    break;
  case 39:
    nextX = 1;
    nextY = 0;
    break;
  case 40:
    nextX = 0;
    nextY = 1;
    break;
  }
}
```
nextX và nextY đại diện cho hướng của con rắn. Có nghĩa là nếu chúng ta đi bên trái thì sẽ Y giống nhau nhưng X phải thay đổi.
### Snake
Bây giờ chúng ta sẽ tạo ra con rắn
```js
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = snakeY = 10;
```
Giá trị mặc định của con rắn sẽ là 3. Chúng ta sẽ bắt đầu với kích thước con rắn là mặc định. `snakeTrail` là cơ thể con rắn, nó lẽ là một loạt các vị trí X và Y. snakeX và snakeY là trị trí ban đầu của con rắn.
### Game world
game world (khu vực chơi) là nơi mà con rắn và mồi ăn sẽ được hiển thị. Nó được định nghĩa là một grid 20x20 phù hợp với chiều rộng và chiều cao của canvas. 
```js
var gridSize = tileSize = 20; // 20 x 20 = 400
var nextX = nextY = 0;
```
### Mồi rắn
Đối với mồi rắn chúng ta chỉ cần xác định vị trí X và Y
```js
var baitX = (baitY = 15);
```
### Cập nhật khu vực chơi
Sau mỗi lần x chạy chúng ta sẽ phải gọi làm hàm draw. Nó sẽ làm một vài điều. Đầu tiên chúng ta cần di chuyển chon rắn đến vị trí tiếp theo.
```js
snakeX += nextX;
snakeY += nextY;
```
Nhưng chúng ta cũng cần kiểm tra xem con rắn có nằm ngoài giới hạn của khu vực chơi không và thiết lập lại vị trí để nó có vẻ xuất hiện từ phía ngược lại
```js
if (snakeX < 0) {
  snakeX = gridSize - 1;
}
if (snakeX > gridSize - 1) {
  snakeX = 0;
}
if (snakeY < 0) {
  snakeY = gridSize - 1;
}
if (snakeY > gridSize - 1) {
  snakeY = 0;
}
```
Bây giờ chúng ta cần kiểm tra nếu ở vị trí này con rắn có ăn được miếng mồi không. Nếu có chúng ta cần tăng kích thước của con rắn và tính toán vị trí mới cho miếng mồi.
```js
if (snakeX == baitX && snakeY == baitY) {
  tailSize++;
  baitX = Math.floor(Math.random() * gridSize);
  baitY = Math.floor(Math.random() * gridSize);
}
```
Tiếp theo chúng ta cần vẽ lại background
```js
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
```
Bây giờ là xây dựng con rắn. Nhưng trong khi chúng ta vẽ con rắn, chúng ta phải kiểm tra xem con rắn có cắn vào người nó không. Điều đó có nghĩa là chúng ta phải thiết lập con rắn về kích thước bắt đầu của nó.
```js
ctx.fillStyle = "green";
for (var i = 0; i < snakeTrail.length; i++) {
  ctx.fillRect(
    snakeTrail[i].x * tileSize,
    snakeTrail[i].y * tileSize,
    tileSize,
    tileSize
  );
  // kiểm tra xem con rắn có cắn nó không
  if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
    tailSize = defaultTailSize;
  }
}
```
Xây dựng miếng mồi
```js
ctx.fillStyle = "red";
ctx.fillRect(baitX * tileSize, baitY * tileSize, tileSize, tileSize);
```
Và cuối cùng, chúng ta kiểm tra xem snakeTrail có vượt qua kích thước của con rắn không. Nếu có chúng ta sẽ chuyển trị trí cuối cùng ra khỏi snakeTrail.