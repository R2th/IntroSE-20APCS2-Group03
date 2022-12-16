![](https://images.viblo.asia/763293e0-9f2f-4047-95f9-1aa1e222c6e8.png)

Chào các bạn, sau khi đã hiatus cái series về Tetris này cả năm trời thì hôm nay mình mới nổi hứng tái khởi động cái series viết game Tetris này 😂

Những vấn đề khó nhất trong quá trình làm game ở bài này (xây dựng phần giao diện, logic phát hiện va chạm,...) đã được giải quyết ở 2 phần trước đó. Tuy nhiên, sản phẩm của chúng ta vẫn còn rất xa ở mức hoàn thành, cũng như vẫn còn rất nhiều bài toán thú vị khác đang chờ chúng ta khám phá.

Trong phần này, mình xin được viết một bài ngắn về phát triển thêm tính năng *ăn điểm* và *game over* cho trò chơi.

# Clear hàng và ăn điểm
## Phát hiện hàng có thể clear
Bài toán này quá đơn giản. Nhiệm vụ của bạn lại là sử dụng vòng lặp để kiểm tra xem hàng nào trong ma trận `landedBoard` của bạn có tất cả các ô đều có giá trị là được.

```javascript
findClearableRows() {
  const clearableIndexes = []

  this.landedBoard.forEach((row, index) => {
    if (row.every(cell => cell > 0)) {
      clearableIndexes.push(index)
    }
  })

  return clearableIndexes
}
```

## Xóa đi hàng có thể clear
Bước này có phần "tricky" hơn: bạn cần implement một method sao cho nó có đủ khả năng:
- Có thể "xóa" đi một hàng
- Dồn các phần tử phía trên nó xuống phía dưới
- Vẫn đảm bảo số hàng như ban đầu

Vì "lười nhác" nên mình sử dụng một cách có hoạt động tốt, nhưng có phần kém hiệu năng một tẹo: mình sử dụng hàm splice để xóa đi các hàng và sau đó thêm lại hàng trống mới cho đủ số lượng bằng method `unshift()`.

```javascript
clearRows(rowIndexes) {
  for (let i = this.landedBoard.length - 1; i>=0; i--) {
    for (let j = 0; j < rowIndexes.length; j++) {
      if (rowIndexes[j] === i) {
        this.landedBoard.splice(rowIndexes[j], 1)
      }
    }
  }
}
```

Một điều cần lưu ý ở phương pháp này: do sau khi sử dụng `splice()` số index của mảng ban đầu sẽ bị thay đổi. Đó là lý do mình phải duyệt vòng lặp `for` theo chiều ngược lại.

## Ăn điểm
Việc ăn điểm này hoàn toàn phụ thuộc vào sở thích của mỗi người, nhưng thường là phải làm sao để nếu người chơi càng mạo hiểm "ăn dày", tức clear "combo" được càng nhiều hàng trong một nước đi, thì càng phải được cộng nhiều điểm.

Ở bài này, mình sẽ làm công thức tính điểm dựa trên *dãy số tam giác* (*Triangular Number Sequence*):
- Nếu chỉ ăn được **1 hàng:** bạn nhận được **1 điểm**
- Nếu ăn được **2 hàng**: bạn nhận được **3 điểm** (tức +1 điểm so với bình thường)
- Nếu ăn được **3 hàng**: bạn nhận được **6 điểm** (tức +3 điểm so với bình thường)
- Nếu ăn được **4 hàng**: bạn nhận được **10 điểm** (tức +6 điểm so với bình thường) (tối đa)

Công thức tính cho dãy số này đơn giản như sau: $x_n = \frac{n(n+1)}{2}$

Viết thành method nào:
```javascript
calculateScore(rowsCount) {
  return (rowsCount * (rowsCount + 1)) / 2
}
```

## Thêm những hàm đã implement vào `progress`
Bạn cần bổ sung chạy những method clear hàng + ăn điểm vừa viết vào lúc ngay sau khi khối Tetromino bị va chạm (với đáy hoặc các phần tử đã hạ) và merge vào mảng chính:

```diff
progress() {
  let nextTetromino = new this.currentTetromino.constructor(this.currentTetromino.row + 1, this.currentTetromino.col, this.currentTetromino.angle)
  if (!this.bottomOverlapped(nextTetromino) && !this.landedOverlapped(nextTetromino)) {
     this.currentTetromino.fall()
   } else {
     this.mergeCurrentTetromino()
+
+    const clearableRowIndexes = this.findClearableRows()
+    this.clearRows(clearableRowIndexes)
+    this.score += this.calculateScore(clearableRowIndexes.length)
+
     this.currentTetromino = this.randomTetromino()
   }
 }
```

# Game Over
Nhắc lại một chút, ở phần 1, mình có nói rằng mặc dù bạn nhìn thấy board của Tetris có 20 hàng x 10 cột, thực chất đằng sau logic của trò chơi là có đến 23 hàng x 10 cột, với 3 hàng trên cùng không thể nhìn thấy được!

![Board game của tetris](https://images.viblo.asia/544ba3dc-1a16-42f5-b60c-1171b5d082eb.png)

Vậy để kiểm tra xem game over hay chưa, bạn chỉ cần check hàng thứ 3 xem có bất kỳ khối nào không là xong!

```javascript
isGameOver() {
  for (let i = 0; i < this.boardWidth; i++) {
    if (this.landedBoard[2][i] > 0) {
      return true
    }
  }
    
  return false
}
```

# Bonus: Màu sắc cho từng khối Tetromino
Bạn cần bổ sung thêm method `getColor` như sau:

```javascript
getColor(cellNumber) {
  switch (cellNumber) {
    case 1:
      return LShape.color
    case 2:
      return JShape.color
    case 3:
      return OShape.color
    case 4:
      return TShape.color
    case 5:
      return SShape.color
    case 6:
      return ZShape.color
    case 7:
      return IShape.color
  }
}
```

Sau đó, ở method `draw()`, hãy thay màu đen `rgb(0, 0, 0)` bằng màu sắc được trả về từ method `getColor()` đã định nghĩa:
```diff
     for (let i = 3; i < this.boardHeight; i++) {
       for (let j = 0; j < this.boardWidth; j++) {
         if (this.currentBoard[i][j] > 0) {
-          this.ctx.fillStyle = 'rgb(0, 0, 0)'
+          this.ctx.fillStyle = this.getColor(this.currentBoard[i][j])
         } else {
           this.ctx.fillStyle = 'rgb(248, 248, 248)'
         }
```

# Thành quả của ngày hôm nay ^^
Nhấn vào [CodePen](https://codepen.io/tranxuanthang/pen/PopEogB) để xem đầy đủ code nhé.

{@embed: https://codepen.io/tranxuanthang/pen/PopEogB}

# Còn gì nữa không?
Rất nhiều là đằng khác:
- Hiện ra khối tetromino kế tiếp ở cạnh bên, để giúp người chơi vạch ra chiến thuật và có thể chuẩn bị tốt hơn
- Thuật toán random 7-bag, giúp trải nghiệm chơi dễ chịu hơn, tránh trường hợp mãi không ra "khối dọc" mà bạn đang cần
- Cải thiện giao diện cho thật hoàn chỉnh
- Thử refactor toàn bộ code về TypeScript, cho vui là chính
- Thêm animation mượt mà khi khối tetromino di chuyển, rơi, hay khi ăn điểm??
- ...

Hy vọng rằng mình có thể viết về nó trong các bài viết tiếp theo!