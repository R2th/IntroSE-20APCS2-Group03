Ở [phần trước đó của series](https://viblo.asia/p/cung-thu-viet-mot-game-xep-hinh-tetris-hoan-chinh-tu-con-so-0-phan-3-an-diem-va-game-over-gDVK2eAj5Lj), chúng ta đã phát triển tới đoạn giúp game có thể ăn hàng, tăng điểm cũng như phát hiện trường hợp game over, và sản phẩm của chúng ta đã hoàn thiện hơn nhiều, nhưng vẫn còn lâu mới được gọi là hoàn thành.

Hôm nay, thay vì tiếp tục phát triển thêm tính năng mới, mình xin được cải thiện lại phần sinh khối ngẫu nhiên đã có trước đó bằng cách áp dụng vào đó **thuật toán sinh khối 7-bag**, cái mà hầu hết các phiên bản Tetris hiện đại đang áp dụng vào game của họ.

# Implement 7-bag random generator
## Giải thích về 7-bag
Trước tiên, chúng ta cần nhìn lại đoạn code của phần sinh tetromino ngẫu nhiên hiện tại:

```javascript
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
  ```
  
Hàm `Math.random()` được cho là hàm PRNG có phân bố random xấp xỉ đều nhau nếu xét trên một số lượng đủ lớn mẫu. Tuy vậy, việc dùng hàm `random()` để sinh khối tetromino ngẫu nhiên cũng không tránh khỏi việc thi thoảng bạn **gặp xui xẻo**, thành ra một loại khối tetromino bạn cần mãi không thấy đâu (khả năng rất cao lại là khối chữ I :rofl:). Điều này làm ảnh hưởng đến trải nghiệm chơi trò chơi, cũng như tăng tính "may rủi" của tựa game.
  
Để hạn chế lại tình huống "xui xẻo" ở trên, ở các game Tetris hiện đại, người ta áp dụng **thuật toán random 7-bag** để thay thế. Ở thuật toán này, người ta sinh ra một mảng ngẫu nhiên gồm tất cả 7 loại tetromino, sau đó lần lượt lấy từng phần tử ra làm khối tetromino tiếp theo. Khi tất cả các phần tử bị lấy ra thì họ lại tiếp tục tương tự với một mảng mới. Có thể hiểu đơn giản là họ bỏ 7 khối tetromino khác loại vào một cái túi, rồi xáo cái túi đó lên sau đó lần lượt lấy ra từng thứ một, nên mới có cái tên là "7-bag".
  
Kết quả của việc áp dụng cơ chế random mới này là **các khối tetromino phân bố đều hơn**. Bạn nếu xui xẻo lắm cũng chỉ cần chờ tối đa 12 lượt phải chờ để một khối xuất hiện trở lại. Bằng cách giảm đi tính may rủi, người chơi dễ dàng đoán trước được các tetromino kế tiếp và vạch ra chiến lược hơn, chơi game sẽ vui hơn và đỡ ức chế hơn.

## Áp dụng
Bây giờ, mình sẽ áp dụng thuật toán random 7-bag vào những gì chúng ta đang làm hiện tại, thay thế cho phần random tối giản mà chúng ta đã làm trước đó.

Về cơ bản chỉ có vài bước mà chúng ta phải thực hiện:
- Tạo một mảng mới gồm 7 khối tetromino khác nhau
- Trộn xáo đều các khối tetromino trong mảng đó
- Lấy từng phần tử ra khỏi mảng để làm khối tetromino tiếp theo
- Khi tất cả các phần tử trong mảng đã được lấy ra thì tạo ra mảng mới

## Xáo trộn các phần tử trong mảng (shuffle)
Để xáo trộn các phần tử trong một mảng, cách "naive" nhất là lần lượt lấy ngẫu nhiên một phần tử ở mảng, sao chép nó sang mảng tạm mới, sau đó "gỡ bỏ" nó khỏi mảng ban đầu với `splice` và lặp lại cho đến khi mảng ban đầu không còn phần tử nào nữa. Cách này tuy hoạt động nhưng việc sử dụng thêm `splice` để xóa đi phần tử trong mảng khiến **độ phức tạp trở thành O(n^2)**.

```javascript
const shuffle = (array) => {
  const n = array.length
  const temp = []
  for (let i = n - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    temp.push(array[randomIndex])
    array.splice(randomIndex, 1)
  }
  array = temp
  return array
}

console.log(shuffle([1, 2, 3]))
```

Thay vào đó, ở đây mình sẽ sử dụng **Fisher–Yates shuffle Algorithm**. Thuật toán này thay vào đó chỉ **swap các phần tử** của mảng đã có, giúp **giảm độ phức tạp về O(n)**. Đồng thời Fisher–Yates algorithm cũng cho kết quả phân bố đều và không gây ra bias (thiên vị đến một dạng kết quả nào đó).

```javascript
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
```

## Tạo method `generateBag`
Một lưu ý nhỏ là hàm shuffle có gây mutate array ban đầu, nên cần cẩn thận trước khi dùng :3

```javascript
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

class Game {
  ...
  generateBag() {
    const newBag = [
      new LShape(1, 4),
      new JShape(1, 4),
      new OShape(2, 4),
      new TShape(2, 4),
      new SShape(2, 4),
      new ZShape(2, 4),
      new IShape(0, 4)
    ]
    
    return shuffle(newBag)
  }
}
```

## Sửa lại method `randomTetromino`
Ở đây, mình dần dần lấy các hình khối ra khỏi bag bằng method `shift()`. Khi bag chưa được tạo hoặc đã bị lấy hết các phần tử ra thì mình sẽ chạy phương thức `generateBag` để tạo ra bag mới.

```javascript
  randomTetromino() {
    if (this.currentBag === null) {
      this.currentBag = this.generateBag()
    }
    const tetromino = this.currentBag.shift()
    if (this.currentBag.length === 0) {
      this.currentBag = this.generateBag()
    }
    return tetromino
  }
```

# Bonus: Hiện khối tetromino tiếp theo
Sau khi đã hoàn thành sửa lại sinh khối ngẫu nhiên theo kiểu 7-bag, để biết được khối tetromino tiếp theo, việc bạn cần làm chỉ là kiểm tra phần tử đầu tiên của bag sau khi generate ra tetromino mới thôi:

```javascript
class Game {
  ...
  randomTetromino() {
    if (this.currentBag === null) {
      this.currentBag = this.generateBag()
    }
    const tetromino = this.currentBag.shift()
    if (this.currentBag.length === 0) {
      this.currentBag = this.generateBag()
    }
    this.nextTetromino = this.getNextTetromino()
    return tetromino
  }
  
  getNextTetromino() {
    return this.currentBag[0]
  }
}
```

Sau đó, để vẽ ra giao diện game, bạn cần bổ sung thêm logic vẽ khối tetromino tiếp theo vào hàm `draw`. Cách làm tương tự như khi bạn vẽ ra board thôi:

```javascript
class Game {
  ...
  draw(blockSize = 24, padding = 4) {
    ...
    /* Vẽ ra tetromino tiếp theo */
    if (this.nextTetromino) {
      for (let i = 0; i < this.nextTetromino.height; i++) {
        for (let j = 0; j < this.nextTetromino.width; j++) {
          if (this.nextTetromino.shape[i][j] > 0) {
            this.ctx.fillStyle = this.getColor(this.nextTetromino.shape[i][j])
          } else {
            this.ctx.fillStyle = 'rgb(255, 255, 255)'
          }
          this.ctx.fillRect(300 + j * padding + j * blockSize, 50 + i * padding + i * blockSize, blockSize, blockSize)
        }
      }
    }
  }
}
```

# Kết quả của ngày hôm nay

![](https://images.viblo.asia/051ea118-8a39-4f28-ac56-1dfa96c80db9.gif)

Bạn cũng có thể [xem trực tiếp sản phẩm tại CodePen](https://codepen.io/tranxuanthang/pen/XWRgvBm):

{@embed: https://codepen.io/tranxuanthang/pen/XWRgvBm}