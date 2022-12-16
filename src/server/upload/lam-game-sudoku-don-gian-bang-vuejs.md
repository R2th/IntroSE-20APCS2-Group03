# Mở đầu
Xin chào các bạn, dạo trước đây thì dự án của mình khá rảnh, và chị QA chẳng có việc gì làm nên ngồi chơi Sudoku. Rồi mình tự hỏi dù sao cũng đang rảnh, tại sao không tự viết riêng cho mình một ứng dụng chơi Sudoku cho riêng mình nhỉ. Bài viết này sẽ sử dụng Vue.js để xây dựng một game Sudoku đơn giản.

Mình sẽ giới thiệu với các bạn trong khuôn khổ bài viết những thứ sau:
* Biểu diễn ma trận trò chơi với dữ liệu động
* Thuật toán để tạo ma trận cho trò chơi
* Cách để xác nhận lời giải cho trò chơi

# Bước đầu
Trước hết, hãy tạo một số file mới sau:
* `index.html`
* `app.js`
* `style.css`

Thêm vào file `index.html` đường dẫn tới file giao diện `style.css`, file JavaScript `app.js`, và tất nhiên là đến cả file `Vue.js` nữa, trong ứng dụng đơn giản mình sử dụng Vue.js thông qua CDN:
```html
<head>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <link href="style.css" rel="stylesheet" />
</head>
<body>
    <script src="app.js"></script>
</body>
```

Game của chúng ta sẽ có giao diện nháp như sau:

![](https://images.viblo.asia/b8157fd9-8f93-44f5-b8ce-925d7313d636.png)

![](https://images.viblo.asia/d92e0785-0bd4-4634-badd-baf5227ef880.png)

Như bạn có thể thấy, nó sẽ bao gồm một số thứ sau:
* Màn chọn độ khó, để giúp người chơi lựa chọn cấp độ phù hợp với mình
* Màn chính của game có 2 nút: New game (sẽ thoát khỏi màn chơi về màn chọn độ khó) và nút Veriry (sẽ có tác dụng kiểm tra màn chơi của bạn đã đúng hay chưa)
* Một màn Sudoku 9x9 cơ bản với một vài ô trống có thể điền vào. Mỗi ô là một `input type=”text”`

Chúng ta sẽ thêm một số thứ để làm trò chơi này thêm thú vị. Nếu bạn thua hoặc thắng, sẽ có một GIF xuất hiện để báo cho bạn biết điều đó:

![](https://images.viblo.asia/e42682cb-b596-415e-b6ae-d0a1f42d03b5.gif)

![](https://images.viblo.asia/75a7b76a-8882-48c0-aeca-9e6a5cd8e488.gif)

# Ma trận
Ok bạn đã bước đầu tưởng tượng ra ứng dụng của chúng ta sẽ có hình thù thế nào, hãy bắt đầu bước đầu tiên để xây dựng trò chơi này.
Thứ đầu tiên bạn sẽ cần là một ma trận số thỏa mãn những yêu cầu sau đây:

* Tất cả hàng ngang có tất cả số từ 1-9 không trùng nhau
* Tất cả hàng dọc có tất cả số từ 1-9 không trùng nhau
* Tất cả các ô 3x3 được chia sẵn có tất cả số từ 1-9 không trùng nhau

Ở đây mình sẽ sử dụng một thuật toán vét cạn tìm được trên mạng và sửa đổi một chút:

https://www.emanueleferonato.com/2015/06/23/pure-javascript-sudoku-generatorsolver/

{@embed: https://gist.github.com/thangcx-1985/da1d6dbbaeb5d6a99fb1753df0b30f50}

Thuật toán này sẽ khởi tạo ma trận ban đầu 9x9 đều là 0, sau đó điền random số vào lần lượt từng vị trí và vét cạn đến khi nào tạo ra được một ma trận hoàn chỉnh với những yêu cầu bên trên.


Chúng ta sẽ tạo ra 1 **array of object** để lưu trữ thông tin ma trận, array của chúng ta sẽ có dạng như sau:

```js
var defaultSudokuMatrix = [
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
    [{object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}, {object}],
];
```

Mỗi object sẽ có dạng:
```js
{ num: 5, readOnly: true}
```

- `num`: dùng để lưu giá trị của ô
- `readOnly`: dùng để đánh dấu những ô được gen bởi hệ thống, do đó những ô này không thể bị sửa, thuộc tính này sẽ dùng bên html

Bên cạnh đó, lý do chúng ta phải tạo một **array of object** vì chúng ta sẽ lặp qua array này trong Vue.js với `v-for`, và bind số đó vào ô `input="text"` thông qua `v-bind`, và Vue không muốn khi chúng ta sử dụng biến lặp để binding, vì thế chúng ta phải dùng thông qua 1 object.

Điều tiếp theo cần làm là chúng ta sẽ loại bỏ một số phần tử trong array trên để tạo thành một màn chơi - Tức là chúng ta sẽ loại bỏ random một số phần tử `object.num`.

Như đã nêu ở trên thì trò chơi của chúng ta sẽ bao gồm nhiều level từ dễ đến cực khó, cách đơn giản để mình tạo ra các cấp độ khó khác nhau là: độ khó càng cao, số phần tử bị loại bỏ sẽ càng nhiều.

```js
for (var i = 0; i < defaultSudokuMatrix.length; ++i) {
    var k = 0;
    while (k < level) {
        var randomColumnIndex = Math.floor(Math.random() * defaultSudokuMatrix.length);
        if (defaultSudokuMatrix[i][randomColumnIndex].num != "") {
            k++;
            defaultSudokuMatrix[i][randomColumnIndex].num = "";
            defaultSudokuMatrix[i][randomColumnIndex].readOnly = false;
        }
    }
}

this.sudokuMatrix = defaultSudokuMatrix;
```

Sau đó chúng ta sẽ có `sudokuMatrix` là một array với các phần tử đã bị loại bỏ, và sẽ được dùng để binding sang html.


Cuối cùng, chúng ta cần một function để kiểm tra xem trò chơi đã giải chính xác hay chưa. Đơn giản chỉ cần so sánh `sudokuMatrix` với array nguyên bản của chúng ta đã được tạo ra trong file `sudoku.js` ở đây mình đặt là `sudoku`:

```js
var result = sudoku.map((x, i) => sudoku[i].map(y => parseInt(y.num)));
var maxtrixCheck = this.sudokuMatrix.map((x, i) => this.sudokuMatrix[i].map(y => parseInt(y.num)));

if (JSON.stringify(result) == JSON.stringify(maxtrixCheck)) {
    this.answerImage = "success.gif";
    this.showAnswer = true;
    this.isGameStarted = false;
    this.isNewGame = false;

    setTimeout(() => {
        this.showAnswer = false;
        this.isGameStarted = true;
        this.isNewGame = false;
    }, 2000);
}
else {
    this.answerImage = "fail.gif";
    this.showAnswer = true;
    this.isGameStarted = false;
    this.isNewGame = false;

    setTimeout(() => {
        this.showAnswer = false;
        this.isGameStarted = true;
        this.isNewGame = false;
    }, 2000);
}
```

Sau đó chúng ta cần thêm một chút chức năng ngoài lề để hoàn thiện trò chơi, ví dụ như:

- Restart game:

```js
restart() {
    this.isGameStarted = false;
    this.showAnswer = false;
    this.isNewGame = true;
},
```

- Khi người dùng nhập vào 1 ô đã có giá trị, xóa giá trị cũ đi và điền vào giá trị mới:

```js
formatCell(row, cell) {
    if (this.sudokuMatrix[row][cell].num.length > 1) {
        this.sudokuMatrix[row][cell].num = this.sudokuMatrix[row][cell].num[1];
    }
},
```

- Chỉ cho phép người dùng nhập số:

```js
onlyNumber($event) {
    let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

    if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
    }
}
```

app.js của chúng ta cuối cùng sẽ bao gồm những thứ này:

{@embed: https://gist.github.com/thangcx-1985/cfe8458e8abd7e0010f9c1620d32b0e8}


# HTML
{@embed: https://gist.github.com/thangcx-1985/7892106b3633055374ddc09e51845fbd}

Grid của chúng ta sẽ là một array of object, vì vậy chúng ta sẽ show data bằng 2 `v-for` lồng nhau:
- `v-for="(row, indexRow) in sudokuMatrix` biểu diễn các hàng của Grid
- `v-for="(cell, indexCell) in row` biểu diễn các ô của Grid
- Và cuối cùng là `input type=”text”` chứa data được bind

Hola, vậy là chúng ta đã hoàn thành.

Bạn có thể xem toàn bộ source code của mình tại [repo này](https://github.com/chuxuanthang/sudoku/tree/deploy) và chơi thử game hoàn chỉnh tại trang http://sudokuuu.herokuapp.com/

# Tổng kết
Trên đây là game Sudoku đơn giản mình làm trong lúc rảnh rỗi để đỡ lụt nghề về Vue.js thêm vào đó tìm hiểu cách lập trình ở một lĩnh vực khác. Ở nội dung bài viết chủ yếu mình giới thiệu cho các bạn sơ qua luồng của code, nếu có vấn đề gì thắc mắc, hãy comment bên dưới để mình giải đáp nhé :D.