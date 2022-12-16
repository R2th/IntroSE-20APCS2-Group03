Hẳn rằng ai trong chúng ta cũng đều biết và đã từng chơi thử **trò chơi xếp hình (tetris)** rồi đúng không, nhưng không phải trò "xếp hình" như bạn đang nghĩ đâu nhé. Tetris là một game hết sức đơn giản được làm bởi những người bạn Liên Xô của chúng ta từ những năm 80, đi cùng không thể thiếu là bản nhạc của Hồng Quân huyền thoại **Korobeiniki**.

Tuy đơn giản và lâu đời như vậy, Tetris có sức hút và tính gây nghiện rất lớn (tác giả gốc của tựa game còn nói rằng khi đang phát triển game, anh **mải chơi game này đến mức quên cả việc hoàn thành** nốt các đoạn code!). **Hội chứng Tetris Effect** nổi tiếng cũng dùng để chỉ trạng thái người chơi một tựa game (như Tetris) quá nhiều, đến mức nhìn đâu cũng thấy mấy hình khối rơi xuống, kể cả trong giấc mơ.

Hôm nay, mình sẽ cùng các bạn **làm một tựa game Tetris từ A-Z hoàn chỉnh**, không bug, đủ chức năng nhất. Trong bài này, mình xin lựa chọn **ngôn ngữ Javascript** để tiện lợi cho việc demo ngay trên trình duyệt. Tuy nhiên, sau khi đọc xong bài này, bạn hoàn toàn có thể đủ khả năng để làm nó với **bất cứ ngôn ngữ** hướng đối tượng nào khác.


# Sơ lược về Tetris
Có lẽ bạn cũng đã biết hay cũng chơi game Tetris rất nhiều lần rồi. Nhưng để cho chắc ăn, mình xin phép được nhắc lại chút ít về nguyên tắc tựa game này:

## Game Board
Còn hay được gọi là "playfield", hay "matrix",... Đại loại đây chính là phần bố cục ô lưới, và là nơi chính để chơi game của bạn. Ở màn hình khi chơi game, bạn sẽ thấy game board rộng cỡ 20 hàng x 10 cột. Tuy nhiên, bạn có biết thực tế ở những game Tetris, board game có chiều cao thật từ 22 lên đến 40 ô (tức 40 hàng x 10 cột), và các ô trên cao từ thứ 20 từ dưới lên trở đi thực chất bị ẩn khỏi màn hình? Trong bài này, mình sẽ sử dụng **board game rộng 23 x 10**, với **3 hàng trên cùng bị ẩn** khỏi giao diện game.

![tetris game board](https://images.viblo.asia/544ba3dc-1a16-42f5-b60c-1171b5d082eb.png)

Các bạn hãy thử đoán xem tại sao mình lại để dư 3 hàng trên cùng đó nhé.

## Tetromino
Là những khối hình thù quái dị từ trên trời rơi xuống. Có 7 loại tất cả: khối chữ L, J, O, T, S, Z, và I. Mỗi loại khối có màu sắc tương ứng khác nhau.

![Tetrominos](https://images.viblo.asia/1e82b932-ea69-44b2-baa9-d90b74860d30.png)

Các khối này đều có thể bị xoay (theo chiều kim đồng hồ) cũng như di chuyển (sang trái hoặc phải). Tuy nhiên khối sẽ không thể xoay hay di chuyển được nếu gặp va chạm (với phần cạnh hay với các khối đã hạ cánh).

## Game tick
Cứ sau cùng một khoảng thời gian ngắn (thường được đặt từ 0,5 đến 1 giây), khối Tetromino hiện tại sẽ rơi xuống thêm một ô. Sau khi rơi xuống tận cùng (chạm mặt đất hay chạm vào các khối đã hạ cánh khác), khối hiện tại sẽ bị gắn lại, và một khối mới khác sẽ rơi xuống.

## Ăn điểm
Khi một hàng được "hoàn thành", hay được lấp đầy bởi các khối, bạn sẽ được ăn điểm. Với càng nhiều hàng được hoàn thành một lúc, bạn càng được nhiều điểm, tối đa là 4 hàng với khối chữ I.

Các hàng đã được hoàn thành sau đó sẽ được xóa khỏi bảng, cùng với khiến các khối ô ở phía trên nó thấp xuống dưới.

## Game over
Trò chơi kết thúc khi lượng khối đã rơi xuống chồng chất lên đến mức chạm vào cạnh trên cùng của board, và khối mới không thể rơi xuống được nữa.

Sơ qua như phía trên cũng là kha khá chi tiết rồi, giờ bắt tay vào làm thôi.
# Tiến hành
## Khởi tạo dự án
Tạo các thư mục và file như thế này:
```
tetris-html/
├── index.html
└── main.js
```
Khởi tạo file *index.html*:
```html
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>Tetris Game</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <!-- TODO -->
    <script src="./main.js"></script>
  </body>
</html>
```

Từ giờ các mã javascript sẽ được viết chủ yếu ở *main.js*.

## Bước 1: Xây dựng giao diện cơ bản cho game
Với tựa game đơn giản như Tetris, ta có thể lựa chọn dựng giao diện chơi bằng HTML và CSS (tức dựa vào DOM), hoặc dùng HTML5 Canvas. Trong bài này, mình sẽ thử xây dựng game qua HTML5 Canvas.

Mục tiêu của chúng ta sẽ là xây dựng một giao diện trông như thế này:
![Giao diện Tetris](https://images.viblo.asia/3e01af62-5a49-4b50-b8a3-be5f63b5043d.png)

### Khóa học `<canvas>` siêu tốc
Vẽ hình vuông/hình chữ nhật lên canvas rất đơn giản. Vẽ một hình vuông nhỏ lên canvas như sau:

```javascript
/* Lấy context của phần tử canvas */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

/* Vẽ hình vuông */
ctx.fillStyle = 'black'
ctx.fillRect(10, 20, 50, 50)
```

Bạn sẽ được hình vuông đã tô màu đen, nằm ở tọa độ x = 10, y = 20 và cạnh dài 50px.

![Canvas example 1](https://images.viblo.asia/86fc0976-a492-4176-b51d-66613064e890.png)

Một ví dụ khác, ta thử vẽ một hình chữ nhật có viền màu đỏ:

```javascript
ctx.strokeStyle = 'rgb(255, 0, 0)'
ctx.rect(10, 20, 50, 100)
ctx.stroke()
```

Bạn sẽ có ngay hình chữ nhật không tô màu nhưng có viền đỏ, đặt ở tọa độ x = 70, y = 20, rộng 50px và cao 100px.

![Canvas example 2](https://images.viblo.asia/b75c60f5-e16f-400f-9809-5fe7ffe34b8c.png)

Viết chữ lên canvas cũng rất đơn giản. Tương tự 2 ví dụ trên, chữ này được viết với màu đen, kích thước 14px, đặt ở tọa độ x = 10, y = 140:
 
```
ctx.fillStyle = 'black'
ctx.font = '14px';
ctx.fillText('HAPPY NEW YEAR', 10, 140)
```

![Canvas example 3](https://images.viblo.asia/d0552e3d-00c1-4ec7-bcbf-ccb1f7782223.png)

Demo như dưới đây, nhấn vào tab Result nhé.

{@embed: https://jsfiddle.net/tranxuanthang/1gq378pe/6/}

### Áp dụng vào bài
Trước hết, để game hoạt động được, ta cần có một vài biến để lưu lại trạng thái của game theo thời gian. Ví dụ như những cái sau:
* `boardWidth`, `boardHeight` là chiều rộng, chiều cao của game board.
* `currentTetromino` giữ đối tượng khối Tetromino hiện tại
* `currentBoard` giúp lưu trạng thái hiện tại của game board. `currentBoard` là một mảng 2 chiều lưu các phần tử số nguyên, với phần tử toàn là số 0 (tức chưa có khối nào được đặt lên). Tuy javascript không có khái niệm mảng 2 chiều, ta có thể mô phỏng nó bằng cách định nghĩa mảng con bên trong mảng.
* `landedBoard` cũng tương tự `currentBoard`. Nhưng thay vì lưu cả thông tin về khối đang rơi và các khối đã "hạ cánh" như `currentBoard`, `landedBoard` chỉ lưu thông tin về các khối đã "hạ cánh". Có thể nói `currentBoard`=`landedBoard`+`currentTetromino`.
* `score` để lưu điểm số hiện tại.

Chúng ta sẽ đi sâu nhiều hơn về các thuộc tính này ở phần sau của bài.

Mình sẽ dùng class syntax của ES6 để định nghĩa một class Game:
```javascript
class Game {
    constructor() {
        this.score = 0
        this.boardWidth = 10
        this.boardHeight = 23
        this.currentBoard = new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(0))
        this.landedBoard = new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(0))
        this.currentTetromino = null /* TODO */
    }
    
    /* TODO */
}
```

Ở phần `<body>`, ta bổ sung thêm thẻ `<canvas>`, nơi mà chúng ta sẽ vẽ ra đồ họa game:
```html
<canvas id="tetris-canvas" width="420" height="600"></canvas>
```

Lấy *context* của phần tử `<canvas>` đó:
```javascript
class Game {
  constructor() {
    /* ... */
    this.canvas = document.getElementById('tetris-canvas')
    this.ctx = this.canvas.getContext('2d')
  }
```

Thêm phương thức `draw()` vào class `Game`. Ở phương thức này, ta cần làm 3 việc:
* Vẽ khung bao bên ngoài, là hình chữ nhật chỉ có màu viền.
* Vẽ từng ô vuông block nhỏ theo dạng lưới 20x10, tô (fill) màu trắng nhạt cho nó. Ta cần 2 vòng `for` lồng nhau để làm điều này.
* Thêm một vài text lên nữa.

```javascript
class Game {
  /* ... */
    
  draw(blockSize = 24, padding = 4) {
    /* Vẽ khung của board */
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineWidth = 2
    this.ctx.rect(padding, padding, blockSize*this.boardWidth+padding*(this.boardWidth+1), blockSize*(this.boardHeight-3)+padding*(this.boardHeight-3+1))
    this.ctx.stroke()

    /* Lặp qua các phần tử của mảng board và vẽ các block tại đúng vị trí */
    for (let i = 3; i < this.boardHeight; i++) {
      for (let j = 0; j < this.boardWidth; j++) {
        if (this.currentBoard[i][j] > 0) {
          this.ctx.fillStyle = 'rgb(0, 0, 0)'
        } else {
          this.ctx.fillStyle = 'rgb(248, 248, 248)'
        }
        this.ctx.fillRect(padding*2+j*(blockSize+padding), padding*2+(i-3)*(blockSize+padding), blockSize, blockSize)
      }
    }
   
     /* Viết ra các đoạn text */
    this.ctx.fillStyle = 'rgb(0, 0, 0)'
    this.ctx.font = '28px';
    this.ctx.fillText('TIẾP THEO:', 300, 28)
    this.ctx.fillText('ĐIỂM SỐ:', 300, 200)
    this.ctx.fillText(this.score.toString(), 300, 230)
  }
}
```

**Hỏi**: Tại sao giá trị lặp i lại bắt đầu từ 3?

**Đáp**: Vì chúng ta cần bỏ lại 3 hàng đầu của board, không hiển thị ra giao diện game.

**Hỏi**: Cái đống cộng trừ nhân chia loằng ngoằng kia là gì @@!

**Đáp**: Đó là phép tính để tính toán vị trí của các ô nhỏ (block), sao cho chúng cách đều nhau và giữa chúng lại có khoảng cách (padding) hợp lý nhất. Bạn yên tâm vì giờ đọc lại đoạn vừa rồi mình cũng không hiểu gì đâu :grinning:

**Hỏi**: `ctx.clearRect` là cái quái gì thế?

**Đáp**: Nó có tác dụng xóa trắng canvas mỗi khi chạy mới phương thức `draw()` thôi. Nghĩa là với mỗi lần trạng thái game thay đổi, ta chạy lại `draw()` và mọi thứ sẽ bị xóa trắng và vẽ lại từ đầu. Tuy nghe có vẻ hiệu năng thấp, nhưng thực sự canvas rất nhanh, và việc xóa canvas theo vùng đôi khi mang lại hiệu năng thấp hơn cả xóa hết và vẽ lại nữa.

Xong bước này, ta đã có thể khởi tạo đối tượng mới từ object Game và thực thi hàm `draw()`:
```javascript
class Game {
  /* ... */
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  game.draw()
})
```

Xong rồi, bạn đã (tạm) hoàn thành tạo canvas cho giao diện game. Kết quả của bước 1 này như ở JSFiddle dưới đây:
{@embed: https://jsfiddle.net/tranxuanthang/qyt28nfh/17/}

## Bước 2: Định nghĩa class cho các hình khối (Tetromino)
### Ý tưởng để biểu diễn dữ liệu
![Tetris board data](https://images.viblo.asia/79188442-7ab7-4444-b3af-beb71b69876f.png)

Như ở phần trước, chúng ta đã sử dụng thuộc tính `currentBoard` là một **mảng 2 chiều** để diễn tả game board của chúng ta. Các phần tử của mảng này sẽ là **các số nguyên**, biểu diễn cho những ô nhỏ (block) tương ứng trong board:
* Số 0: Chưa có block nào ở đây
* Số 1: Block thuộc một khối chữ L
* Số 2: Block thuộc một khối chữ J
* Số 3: Block thuộc một khối chữ O
* Số 4: Block thuộc một khối chữ T
* Số 5: Block thuộc một khối chữ S
* Số 6: Block thuộc một khối chữ Z
* Số 7: Block thuộc một khối chữ I

Để diễn tả hình dạng các khối Tetromino, mình cũng sẽ sử dụng các mảng 2 chiều, ví dụ với khối chữ L nằm dọc:
```javascript
/* Khối chữ L nằm dọc */
[
  [1, 0],
  [1, 0],
  [1, 1]
]
```
Ấy nhưng trong Tetris, người chơi có thể **xoay Tetromino** đang rơi xuống theo nhiều góc khác nhau (theo chiều kim đồng hồ): 0, 90, 180 và 270 độ. Nếu muốn, bạn có thể làm một phương thức để "xoay" mảng trên và trả về mảng đã xoay bằng chút thuật toán. Tuy nhiên, để cho đơn giản, ở đây chúng ta sẽ định nghĩa mọi chiều xoay của các Tetromino luôn. Ví dụ với Tetromino chữ L như sau:

```javascript
[[[1, 0],
  [1, 0],
  [1, 1]],

 [[1, 1, 1],
  [1, 0, 0]],

 [[1, 1],
  [0, 1],
  [0, 1]],

 [[0, 0, 1],
  [1, 1, 1]]]
```

### Tạo class cho các Tetromino

Giờ chúng ta sẽ bắt tay vào viết code nào. Mình sẽ tạo một **abstract class** tên `Tetromino`, và cho các loại Tetromino **kế thừa** nó. Các Tetromino đều có chung những thuộc tính và phương thức:
* `row`, `col`: vị trí đặt theo hàng và cột.
* `angle`: chiều xoay hiện tại, là các số 0, 1, 2, 3 (tương ứng với các góc 0, 90, 180, 270 độ).
* `width`, `height`: chiều dài và chiều rộng.
* `move()`: di chuyển trái phải.
* `fall()`: di chuyển xuống.
* `rotate()`: xoay
* ...

Tóm lại, ta có các class định nghĩa các Tetromino như sau:
```javascript
class Tetromino {
  constructor(row, col, angle = 0) {
    if (this.constructor === Tetromino) {
      throw new Error("This is an abstract class.")
    }
    this.row = row
    this.col = col
    this.angle = angle
  }

  get shape() {
    return this.constructor.shapes[this.angle]
  }

  get width() {
    return this.shape[0].length
  }

  get height() {
    return this.shape.length
  }

  fall() {
    this.row += 1
  }

  rotate() {
    if (this.angle < 3) {
      this.angle += 1
    } else {
      this.angle = 0
    }
  }

  move(direction) {
    if (direction === 'left') {
      this.col -= 1
    } else if (direction === 'right') {
      this.col += 1
    }
  }
}

class LShape extends Tetromino { }

LShape.shapes =
  [[[1, 0],
    [1, 0],
    [1, 1]],

   [[1, 1, 1],
    [1, 0, 0]],

   [[1, 1],
    [0, 1],
    [0, 1]],

   [[0, 0, 1],
    [1, 1, 1]]]

LShape.color = 'rgb(255, 87, 34)'

class JShape extends Tetromino { }

JShape.shapes =
  [[[0, 2],
    [0, 2],
    [2, 2]],

   [[2, 0, 0],
    [2, 2, 2]],

   [[2, 2],
    [2, 0],
    [2, 0]],

   [[2, 2, 2],
    [0, 0, 2]]]

JShape.color = 'rgb(63, 81, 181)'

class OShape extends Tetromino { }

OShape.shapes =
  [[[3, 3],
    [3, 3]],

   [[3, 3],
    [3, 3]],

   [[3, 3],
    [3, 3]],

   [[3, 3],
    [3, 3]]]

OShape.color = 'rgb(255, 235, 59)'

class TShape extends Tetromino { }

TShape.shapes =
  [[[0, 4, 0],
    [4, 4, 4]],

   [[4, 0],
    [4, 4],
    [4, 0]],

   [[4, 4, 4],
    [0, 4, 0]],

   [[0, 4],
    [4, 4],
    [0, 4]]]

TShape.color = 'rgb(156, 39, 176)'

class SShape extends Tetromino { }

SShape.shapes =
  [[[0, 5, 5],
    [5, 5, 0]],

   [[5, 0],
    [5, 5],
    [0, 5]],

   [[0, 5, 5],
    [5, 5, 0]],

   [[5, 0],
    [5, 5],
    [0, 5]]]

SShape.color = 'rgb(76, 175, 80)'

class ZShape extends Tetromino { }

ZShape.shapes =
  [[[6, 6, 0],
    [0, 6, 6]],

   [[0, 6],
    [6, 6],
    [6, 0]],

   [[6, 6, 0],
    [0, 6, 6]],

   [[0, 6],
    [6, 6],
    [6, 0]]]

ZShape.color = 'rgb(183, 28, 28)'

class IShape extends Tetromino { }

IShape.shapes =
  [[[7],
    [7],
    [7],
    [7]],

   [[7, 7, 7, 7]],

   [[7],
    [7],
    [7],
    [7]],

   [[7, 7, 7, 7]]]

IShape.color = 'rgb(0, 188, 212)'
```

[Đây là JSFiddle](https://jsfiddle.net/tranxuanthang/oz8Lw6v0/12/) sau khi hoàn thành xong bước này. Nên nhớ về chức năng vẫn chưa có gì mới so với bước 1 đâu nhé.

## Bước 3: Làm khối Tetromino rơi xuống!
### Lấy ngẫu nhiên khối Tetromino
Trước hết, mình sẽ tạo một phương thức để lấy ngẫu nhiên 1 trong 7 loại khối Tetromino. Khi khởi tạo `Game` mới, mình cũng lấy ngẫu nhiên một khối Tetromino gắn vào `currentTetromino` luôn.
```javascript
class Game {
  constructor() {
    /* ... */
    this.currentTetromino = this.randomTetromino()
    /* ... */
  }

  randomTetromino() {
    const randNum = Math.floor(Math.random() * Math.floor(7))
    switch (randNum) {
      case 0:
        return new LShape(1, 4)
      case 1:
        return new JShape(1, 4)
      case 2:
        return new OShape(2, 4)
      case 3:
        return new TShape(2, 4)
      case 4:
        return new SShape(2, 4)
      case 5:
        return new ZShape(2, 4)
      case 6:
        return new IShape(0, 4)
    }
  }
  /* ... */
}
```

Thế nhưng, đôi khi RNG cũng hơi bất công, nếu bạn nhân phẩm kém thì có thể sẽ random ra toàn khối chữ S hay Z liên tiếp nhau, trong khi khối chữ I mãi không thấy đâu, khá là ức chế. **Về sau**, chúng ta sẽ tìm cách **cải thiện cơ chế random** của game để chơi sướng nhất (gợi ý: ta sẽ tạo cơ chế **random 7-bag**).
### Game Loop
Chắc hẳn bạn đã quen thuộc với cửa sổ dòng lệnh (*console* hay *terminal*) trên các hệ điều hành rồi đúng không? Khi đang chờ người dùng nhập câu lệnh, cửa sổ dòng lệnh sẽ hiện ra dấu nháy chờ input của người dùng. Nếu bạn gõ `ls -l` và ấn *enter*, cửa sổ dòng lệnh sẽ hiện ra các file và thư mục ở thư mục hiện tại của bạn. Sau khi trả về kết quả, cửa sổ dòng lệnh lại trở về trạng thái dấu nháy chờ bạn nhập câu lệnh tiếp. Nếu bạn không nhập gì, cửa sổ dòng lệnh cũng sẽ **không làm gì cả**.

Thế nhưng video game thì lại khác. Nếu game đang chạy, thì dù bạn không điều khiển gì, **game vẫn sẽ chạy** như thường. Gió vẫn sẽ thổi, mây vẫn bay, chim vẫn hót, ngày dần dần vẫn chuyển thành đêm, NPC vẫn đi dạo trên phố và kẻ thù vẫn lao vào đánh bạn,... Cụ thể hơn, ở trong game Tetris, cho dù nếu bạn không nhập input gì, khối Tetromino trên màn hình vẫn **sẽ dần hạ xuống**, buộc bạn phải sớm tìm vị trí thích hợp để đặt khối Tetromino này. Đây chính là cách hiểu cơ bản về **game loop**.

Ở trong bài này, mình sẽ tạm đặt thời gian mỗi khi khối Tetromino rơi xuống một ô là **0,8 giây**. Để làm được điều này, trong bài này mình sẽ đơn giản sử dụng `setInterval`. `setInterval` cho phép chúng ta thực hiện tính logic và vẽ ra canvas đều đặn *xấp xỉ* 0,8 giây. Lưu ý rằng, vì *event loop* của Javascript và cả sự lên lịch chạy Thread của hệ điều hành mà **`setInterval` chắc chắn sẽ bị trễ** từ trễ ít đến trễ rất lâu, tùy theo tốc độ máy tính và số tác vụ phải xử lý. Tuy nhiên, với những game mà thời gian giữa các vòng lặp lâu như Tetris thì dùng cách `setInterval` là đủ rồi.

Cứ với mỗi 0,8 giây, chúng ta cần làm 3 việc:
* Chạy phương thức `progress()`để tinh toán trạng thái tiếp theo của game.
* Cập nhật mới bảng `currentBoard` với `updateCurrentBoard()`. Phương thức này sẽ gộp `landedBoard` và `currentTetromino` lại vào `currentBoard`. Như mình đã nói, `currentBoard`=`landedBoard`+`currentTetromino` nhé.
* Vẽ lại trạng thái mới của game lên `<canvas>` bằng `draw()`.

```javascript
class Game {
  /* ... */
  
  play() {
    setInterval(() => {
      this.progress()
      this.updateCurrentBoard()
      this.draw()
    }, 800);
  }
  
  progress() {
    /* TODO */
    this.currentTetromino.fall()
  }
  
  updateCurrentBoard() {
    for (let i = 0; i < this.boardHeight; i++) {
      for (let j = 0; j < this.boardWidth; j++) {
        this.currentBoard[i][j] = this.landedBoard[i][j]
      }
    }

    for (let i = 0; i < this.currentTetromino.height; i++) {
      for (let j = 0; j < this.currentTetromino.width; j++) {
        if (this.currentTetromino.shape[i][j] > 0) {
          this.currentBoard[this.currentTetromino.row + i][this.currentTetromino.col + j] = this.currentTetromino.shape[i][j]
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game()
  game.updateCurrentBoard()
  game.draw()
  game.play()
})
```

Kết quả là bạn được một khối Tetromino đang chuyển động dần từ trên xuống:

![Game loop với Tetris](https://media.giphy.com/media/lS7ZDYtuVFXVf99Ws9/giphy.gif)

{@embed: https://jsfiddle.net/tranxuanthang/o7d1wst8/2/}

# Tạm kết
Tuy ta đã có thể thấy khối Tetromino đã từ từ rơi xuống, nhưng hiện tại ta vẫn còn thiếu rất nhiều chức năng, trước mắt chính là:
- Ta **chưa thể điều khiển** khối Tetromino hiện tại được (di chuyển trái, phải, xoay, hay làm rơi xuống nhanh hơn).
- Ta chưa xử lý trường hợp khối Tetromino chạm đất (game của chúng ta hiện tại sẽ **báo lỗi sau khi chạm đất** trên console vì truy cập ra ngoài mảng).

Để hoàn thành được 2 chức năng trên, chúng ta phải giải quyết một thử thách mới: **phát hiện va chạm**. Mình xin được đi tiếp cùng các bạn ở Phần 2 của series, mong được các bạn đón đọc và ủng hộ!