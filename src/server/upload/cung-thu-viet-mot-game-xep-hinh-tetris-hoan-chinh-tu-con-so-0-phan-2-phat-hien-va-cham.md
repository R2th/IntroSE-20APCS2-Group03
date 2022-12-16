*Va chạm* là tình huống rất phổ biến và xuất hiện ở khắp nơi trong thế giới video game. Trong series game **Mario Bros**, Mario húc đầu vào ô gạch để phá ô đó hoặc nhận được item thưởng. Hay ở tựa game **Flappy Bird** "cây nhà lá vườn", khi khi chú chim đâm phải ống cống, trò chơi sẽ kết thúc.

Để các sự kiện như thế xảy ra, người làm game cần phải xây dựng những cơ chế để **phát hiện va chạm** giữa các vật thể trong game, từ các nhân vật, đến đường bay viên đạn, địa hình,...

Nghe thì đơn giản, nhưng đây lại là một **vấn đề nan giải** trong thiết kế game, nhất là trong các tựa game 3D phức tạp với nhiều vật thể. Có lẽ khi chơi game, bạn thi thoảng gặp những lỗi như: bị kẹt vào tường, đi được xuyên tường, bị chui góc lag và rơi ra ngoài thế giới,... thì khả năng cao trách nhiệm thuộc về cơ chế phát hiện va chạm của game đã không hoạt động chính xác :D

Ở bài viết này, mình xin được cùng các bạn tìm hiểu và phát triển tính năng phát hiện va chạm cho tựa game 2D đơn giản **Tetris** đang còn dở dang ở bài trước đó, và qua đó có cái nhìn tổng quan về cơ chế phát hiện va chạm trong video game nói chung.

# Ý tưởng
Ở game Tetris, các hình khối (Tetromino) sẽ bị thay đổi vị trí cứ sau mỗi game tick hoặc khi người chơi nhấn phím di chuyển hay xoay khối. Như vậy, chúng ta đơn giản chỉ cần kiểm tra xem, với mỗi lần khối Tetromino bị thay đổi vị trí đó, nó có bị **đè lên bất cứ phần tử nào khác** hay không. Cụ thể, ta phải thực hiện từng bước kiểm tra giữa khối Tetromino với các phần tử:
* Đường biên dưới,
* Đường biên trái,
* Đường biên phải,
* Và với các khối Tetromino đã "hạ cánh".

Và may mắn nữa là ở trong game Tetris, **khối Tetromino hiện đang rơi là thứ duy nhất di chuyển**. Nếu là game khác có nhiều phần tử di chuyển trong trò chơi (người chơi, kẻ địch, NPC, viên đạn,...), bạn sẽ phải kiểm tra va chạm giữa tất cả phần tử đó với nhau và với vật thể đứng yên khác. Thử tưởng tượng một game phức tạp với môi trường cực rộng và có hàng nghìn phần tử lớn nhỏ khác nhau. Chưa kể, game lại phải render liên tục với số khung hình 60FPS (khác xa với Tetris là gần 1 giây mới trôi qua được 1 tick). Rõ ràng là đây không phải điều đơn giản.

Với vấn đề trên, có rất nhiều phương pháp khác nhau để tối ưu hóa hiệu năng, tuy nhiên nó nằm ngoài khuôn khổ của bài này, và làm game cũng không phải chuyên môn của mình (dòng đời xô đẩy vào làm Web mất rồi :sob:). Nếu bạn có đam mê viết game, đừng ngại ngùng mà theo đuổi và tìm hiểu sâu hơn nhé :D

Giờ ta bắt đầu bắt tay vào làm từ những gì đã có ở [phần bài viết trước](https://viblo.asia/p/cung-thu-viet-mot-game-xep-hinh-tetris-hoan-chinh-tu-con-so-0-phan-1-giao-dien-va-game-loop-gDVK2mdA5Lj).

# Tiến hành
Có tổng cộng 4 hành động mà chúng ta cần phải kiểm tra va chạm: khối di chuyển xuống, khối di chuyển sang trái/phải và khối bị xoay.

## Bắt các sự kiện nhấn phím
Trước hết, mình sẽ thêm hàm lắng nghe những sự kiện nhấn phím, giúp người dùng điều khiển được game:
```javascript
window.addEventListener('keydown', (event) => {
switch (event.keyCode) {
  case 37: // Left
    game.tryMoveLeft()
    break

  case 38: // Up
    game.tryRotating()
    break

  case 39: // Right
    game.tryMoveRight()
    break

  case 40: // Down
    game.tryMoveDown()
    break
}
```

Các hàm `tryMoveLeft()`, `tryRotating()`, `tryMoveRight()`, `tryMoveDown()` sẽ được implement sau đó trong bài này.

## Di chuyển xuống
Khối Tetromino di chuyển xuống sau mỗi game tick (0,8 giây), hoặc khi người dùng đẩy nhanh tiến độ game bằng cách ấn nút mũi tên xuống. Ở hành động này, ta cần phải kiểm tra va chạm giữa khối Tetromino và 2 phần tử: **đường biên dưới** và **các khối đã hạ cánh**. Để làm được điều này, mình chọn cách như sau:
1. Cứ mỗi 0,8 giây hoặc khi người dùng ấn arrow down, thực thi hàm `progress()`.
2. Ở hàm `progress()`, mình tiến hành làm những việc như sau:
    1. Thay vì update `currentTetromino` ngay, mình tạo một object **Tetromino tạm thời**, gọi là `nextTetromino` giống y hệt khối Tetromino hiện tại, chỉ khác là hàng ở vị trí thấp hơn 1 ô.
    2. Kiểm tra xem khối tạm thời `nextTetromino` này có bị vượt qua khỏi đường biên dưới **hoặc** overlap (tức bị trùng đè) với các khối đã hạ cánh hay chưa:
        1. Nếu chưa thì tiếp tục hạ khối currentTetromino xuống bằng cách gọi `currentTetromino.fall()`.
        2. Nếu đã có phát hiện bị trùng đè, gắn khối này vào mảng các khối đã hạ cánh `landedBoard` và lấy một khối Tetromino ngẫu nhiên mới khác.
3. Tiến hành cập nhật, vẽ thay đổi lên giao diện người chơi qua canvas.

### Cập nhật lại hàm `progress()`
Hàm `progress()` từ bài trước của mình cần phải cập nhật thêm như sau:
```javascript
let nextTetromino = new this.currentTetromino.constructor(this.currentTetromino.row + 1, this.currentTetromino.col, this.currentTetromino.angle)
if (!this.bottomOverlapped(nextTetromino) && !this.landedOverlapped(nextTetromino)) {
  this.currentTetromino.fall()
} else {
  this.mergeCurrentTetromino()
  this.currentTetromino = this.randomTetromino()
  // TODO
}
```

Ghi chú nhỏ: phương thức `constructor()` giúp mình gọi đến chính xác phương thức khởi tạo của class trực tiếp tạo ra `currentTetromino`. Nhờ vậy dù `currentTetromino` có là LShape hay ZShape hay gì thì mình cũng sẽ tạo ra được Tetromino khác tương tự thế với code ít dài dòng nhất :).

Giờ ta cần bắt đầu tiến hành viết những phương thức được dùng trong `progress()`.
### Kiểm tra vượt đường biên dưới với `bottomOverlapped()`
`bottomOverlapped()` nhận vào một đối tượng thuộc lớp Tetromino và trả về kết quả boolean, cho biết Tetromino đó có bị vượt qua đường biên dưới của game hay chưa. Chẳng phải nói nhiều, hàm này hết sức đơn giản như sau: 

```javascript
bottomOverlapped(tetromino) {
  if (tetromino.row + tetromino.height > this.boardHeight) {
    return true
  } else {
    return false
  }
}
```

### Kiểm tra trùng đè vào các ô đã hạ cánh với `landedOverlapped()`
`landedOverlapped()` cũng nhận vào một object Tetromino và trả về kết quả boolean. Giá trị *true* tức là có phát hiện sự trùng nhau giữa landedArray và khối Tetromino.

Để phát hiện sự chồng đè, ở đây mình chọn cách kiểm tra mọi khối ô của Tetromino xem liệu có bị trùng vị trí với `landedBoard` hay không. Tuy là 2 vòng lặp for, nhưng các khối Tetromino luôn chỉ là tập hợp của 4 khối ô mà thôi, nên hiệu năng ở đây chưa phải là vấn đề. Với những game phức tạp hơn, bạn cần cân nhắc chọn các kỹ thuật khác (như dựa vào hitbox), thay vì kiểm tra hết từng đơn vị diện tích (hay thể tích) của vật thể như này :v.
```javascript
landedOverlapped(tetromino) {
  for (let i = 0; i < tetromino.height; i++) {
    for (let j = 0; j < tetromino.width; j++) {
      if (tetromino.shape[i][j] > 0 &&
        this.landedBoard[tetromino.row+i][tetromino.col+j] > 0) {
      return true
    }
  }
}
return false
}
```

### Gắn lại khối Tetromino vào các khối đã hạ cánh với `mergeCurrentTetromino()`
Khi đã biết rằng khối Tetromino hiện tại đã "va chạm" và không thể đi xuống hơn được nữa, ta cần cho nó dính vào mảng `landedBoard`. Mỗi loại khối Tetromino đều (sẽ) có màu sắc riêng, nên dù đã trở thành "một khối lớn" với các Tetromino khác, mình muốn màu sắc của khối vừa rơi xuống vẫn được giữ nguyên trong mảng `landedBoard`.

Ta cũng chỉ cần lặp qua `currentTetromino`, và cập nhật giá trị của từng ô nhỏ vào vị trí tương ứng của nó tại `landedBoard` là xong.
```javascript
mergeCurrentTetromino() {
  for (let i = 0; i < this.currentTetromino.height; i++) {
    for (let j = 0; j < this.currentTetromino.width; j++) {
      if (this.currentTetromino.shape[i][j] > 0) {
        this.landedBoard[this.currentTetromino.row + i][this.currentTetromino.col + j] = this.currentTetromino.shape[i][j]
      }
    }
  }
}
```

### Đẩy nhanh tiến độ với `tryMoveDown()`
Hàm này sẽ chạy khi người dùng ấn mũi tên xuống dưới. Ở đây đơn giản mình chỉ chạy tiếp hàm `progress()` rồi tiến hành vẽ thay đổi ra canvas là xong.
```javascript
tryMoveDown() {
  this.progress()
  this.updateCurrentBoard()
  this.draw()
}
```

### Kết quả
Xem JSFiddle sau phần vừa rồi tại đây: https://jsfiddle.net/tranxuanthang/3c1fj8os/6/

![Img](https://media.giphy.com/media/cODkT8djw4zwtgQBpB/giphy.gif)

## Di chuyển trái/phải
### Kiểm tra khối Tetromino vượt ra ngoài biên trái/phải
Tương tự với `landedOverlapped()`, việc kiểm tra xem khối Tetromino có vượt ra ngoài biên trái/phải hay không hết sức đơn giản:

```javascript
leftOverlapped(tetromino) {
  if (tetromino.col < 0) {
    return true
  } else {
    return false
  }
}

rightOverlapped(tetromino) {
  if (tetromino.col + tetromino.width > this.boardWidth) {
    return true
  } else {
    return false
  }
}
```

### Tiến hành di chuyển khối
Giờ chúng ta tạo các hàm `tryMoveLeft()` và `tryMoveRight()` để tiến hành di chuyển khối Tetromino sang trái/phải khi người dùng nhấn phím mũi tên tương ứng.

Ta tiếp tục phải tạo một khối Tetromino tạm thời để mô phỏng trạng thái tiếp theo của khối Tetromino. Dù di chuyển sang trái hay phải, bạn đều cần kiểm tra trùng đè với `landedBoard` (sử dụng lại `landedOverlapped()` chúng ta đã viết ở phần trước) và đồng thời kiểm tra trùng đè ở hai phía trái/phải tương ứng. Không cần thiết kiểm tra trùng đè với cả phía cạnh đối diện hay đường biên dưới nhé.

```javascript
  tryMoveLeft() {
    const tempTetromino = new this.currentTetromino.constructor(this.currentTetromino.row, this.currentTetromino.col - 1, this.currentTetromino.angle)
    if (!this.leftOverlapped(tempTetromino) &&
      !this.landedOverlapped(tempTetromino)) {
      this.currentTetromino.col -= 1
      this.updateCurrentBoard()
      this.draw()
    }
  }

  tryMoveRight() {
    const tempTetromino = new this.currentTetromino.constructor(this.currentTetromino.row, this.currentTetromino.col + 1, this.currentTetromino.angle)
    if (!this.rightOverlapped(tempTetromino) &&
      !this.landedOverlapped(tempTetromino)) {
      this.currentTetromino.col += 1
      this.updateCurrentBoard()
      this.draw()
    }
  }
```

### Kết quả
Đỡ hơn rất nhiều rồi. Xem JSFiddle đến bước này tại đây: https://jsfiddle.net/tranxuanthang/4uLw7hn6/4/

![Img](https://media.giphy.com/media/cLMxR3kwsmk7sulMCR/giphy.gif)

## Xoay khối Tetromino
Cũng tương tự như khi chúng ta tiến hành viết các hàm đưa khối Tetromino xuống dưới hay qua trái/phải. Tuy nhiên, xoay khối Tetromino là chuyển động khá phức tạp và bất ngờ do nó thay đổi cả chiều rộng lẫn chiều cao của khối Tetromino khi nằm trong bảng. Để việc xoay hoạt động 100% chính xác, bạn phải kiểm tra đầy đủ va chạm/trùng với mọi phần tử khác (trừ cạnh trái, do cách mà mình chọn làm điểm đặt vị trí khối Tetromino là góc trên bên trái).

May thay, các hàm kiểm tra chúng ta đều làm ở phía trên rồi, chỉ cần tái sử dụng/gọi lại ra thôi:

```javascript
tryRotating() {
  const tempTetromino = new this.currentTetromino.constructor(this.currentTetromino.row + 1, this.currentTetromino.col, this.currentTetromino.angle)
  tempTetromino.rotate()
  if (!this.rightOverlapped(tempTetromino) &&
    !this.bottomOverlapped(tempTetromino) &&
    !this.landedOverlapped(tempTetromino)) {
    this.currentTetromino.rotate()
    this.updateCurrentBoard()
    this.draw()
  }
}
```

Cuối cùng, chúng ta đã hoàn thiện được tính năng di chuyển và điều khiển của người chơi cho game:

![Img](https://media.giphy.com/media/ftB5qUSCkS2Q483XLf/giphy.gif)

Kết quả tại đây, các bạn có thể ấn vào tab Result, bấm vào khung canvas một lần và thử điều khiển bằng 4 phím mũi tên lên/xuống/trái/phải xem sao:
{@embed: https://jsfiddle.net/tranxuanthang/13fdm0nr/1/}

# Tạm kết
Hôm nay chúng ta đã tìm hiểu và làm được kha khá, và game cũng bắt đầu ra hình dáng rồi đấy. Tuy nhiên, game hiện vẫn còn ở xa mức hoàn thiện, và vẫn còn rất nhiều tính năng chúng ta phải phát triển như:
* Làm sao để clear hàng và ăn điểm? Tính điểm như thế nào cho hợp lý?
* Cải thiện thuật toán RNG thành random theo kiểu 7-bag như thế nào?
* Làm sao để đưa ra gợi ý cho người dùng về khối tiếp theo để giúp người chơi vạch ra chiến lược?
* Pause & resume, hiệu ứng âm thanh và nhạc nền,...

Mình xin được để dành những thiếu sót trên cho phần sau của bài. Cảm ơn mọi người đã đón đọc.