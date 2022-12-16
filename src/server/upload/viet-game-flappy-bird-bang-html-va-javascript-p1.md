Chào mọi người, hôm nay chúng ta sẽ viết [một game tương tự flappy bird bằng HTML và JavaScript ](http://5minuteshack.blogspot.com/2018/03/viet-game-flappy-bird-bang-html-js.html)một cách đơn giản, bài viết không chỉ giúp bạn nâng cao khả năng lập tình HTML JS mà còn tạo ra 1 sản phẩm thú vị cho nên các bạn chịu khó theo dõi nha.
Các bạn xem demo sản phẩm khi chúng ta hoàn thành trên fiddle:  [Demo](https://jsfiddle.net/danhhuynh/ktvz4La3/1/) đây chỉ là demo cơ bản thôi, khi xem xong bài viết này các bạn có thể làm hay hơn thế nữa :)).
Nào ta bắt đầu thôi.


-----


**HTML Canvas**

Đầu tiên để tạo game chúng ta cần tạo background cho nó, chúng ta sẽ dùng HTML Canvas, Canvas là một element tuyệt vời cho việc thiết kế game trong HTML. Chúng ta sẽ dùng Js để vẽ trên Canvas.
Các bạn tạo 1 file html và nhập đoạn code sau:
```
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
canvas {
    border: 1px solid #d3d3d3;
    background-color: #f1f1f1;
}
</style>
</head>
<body onload="startGame()">
<script>

function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

</script>

<p>We have created a game area! (or at least an empty canvas)</p>

</body>
</html>
```
Kết quả ta được 1 background mùa xám như hình:

![](https://images.viblo.asia/8d771526-9aeb-454e-9d40-fe3e77867146.png)

Method **startGame()** sẽ được chạy khi trang web được load, object *myGameArea* sẽ chạy hàm **start()** của mình và vẽ ra một canvas như kết quả.
**document.body.insertBefore(this.canvas, document.body.childNodes[0])** lệnh này sẽ insert thằng canvas ta vừa vẽ vào trước thằng đầu tiên trong thẻ body hiểu nôm na là canvas sẽ là phần tử đầu tiên trong thẻ body.
**Game Components**
Tiếp theo chúng ta sẽ thêm vào các component cần có trong Game, đầu tiên là con chim đỏ này :))

![](https://images.viblo.asia/62787e0b-1d14-4da4-a8b8-1c712b1e487e.png)

Kể từ đây code sẽ khá phức tạp, các bạn xem kĩ.
Chúng ta sẽ tạo một constructor để add các component vào **Game**, chúng ta sẽ tạo component đầu tiên tên là **myGamePiece**.
Thêm cái function này dưới **myGameArea**.

```
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
} 
```
Khi đó đoạn code của ta như sau:

![](https://images.viblo.asia/e1da148d-40c7-46f6-a43c-dcf9fa950edd.png)

Trong function **startGame()** ta add component vào:
```
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
}
```
Refresh lại page ta sẽ có con chim như hình:

![](https://images.viblo.asia/da2f0749-7503-4598-b6c5-1c615486ecc6.png)

**ctx = myGameArea.context** nghĩa là chúng ta sẽ vẽ component này trong ngữ cảnh myGameArea.

**ctx.fillStyle =** color phủ màu component..

**ctx.fillRect(this.x, this.y, this.width, this.height**) vẽ 1 hình chữ nhật tương ứng thông số.

Để hiểu rõ các hàm trên các bạn xem thêm về [Canvas trên w3schools](https://www.w3schools.com/graphics/canvas_drawing.asp)

Các bạn xem tiếp part 2 trên blog mình nha: **[Viết game flappy bird bằng HTML và JavaScript (P.2)](http://5minuteshack.blogspot.com/2018/03/viet-game-flappy-bird-bang-html-va-js.html)**
    Trong part2 chúng ta sẽ làm con chim đỏ chuyển động.