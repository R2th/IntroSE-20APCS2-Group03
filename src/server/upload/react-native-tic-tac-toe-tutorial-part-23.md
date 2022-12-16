Link to [**Part 1**](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-13-LzD5dJxWZjY).
<br>
<br>

-----

# Completing the game
Qua phần trước, chúng ta đã có được "nền móng" để xây dựng game tic-tac-toe của chúng ta. Để hoàn chỉnh app game, chúng ta cần phải có thể luân phiên điền "X" và "O" vào bàn cờ, và chúng ta cần phải tìm được cách xác định ai là người thắng cuộc.

### Đẩy state lên trên
Hiện giờ, mỗi component `<Square>` chính là nơi giữ state của game. Để check xem ai là người thắng, chúng ta sẽ giữ giá trị của mỗi ô trong 9 ô tại một chỗ.
<br>
<br>
Ban đầu có thể bạn sẽ nghĩ rằng `<Board>` sẽ yêu cầu state từ mỗi `<Square>`. Tuy cách này là khả thi với React Native nhưng mình không khuyến khích các bạn làm cách này vì như vậy code sẽ trở nên khó hiểu, dễ gặp bug và khó sửa lại code. Thay vì vậy, cách tốt nhất chính là lưu state của game  tai component cha là `<Board>` thay vì tại mỗi `<Square>`. Component `<Board>` có thể chỉ cho mỗi `<Square>` hiển thị ra cái gì bằng việc truyền prop, [giống như khi chúng ta truyền một chữ số cho mỗi Square vậy](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-13-LzD5dJxWZjY#_truyen-du-lieu-thong-qua-props-7).
<br>
<br>
**Để thu thập dữ liệu từ nhiều component con hoặc để có được hai component con tương tác với nhau, bạn sẽ cần phải khai báo state chung tại component cha của chúng. Component cha có thể truyền lại state về cho các con của nó bằng cách dùng prop, điều này sẽ giữ cho các components con đồng bộ với nhau và với component cha của chúng.**
<br>
<br>
Đẩy state lên một component cha chung là chuyện thường gặp khi tái cấu trúc lại các component React Native — chúng ta hãy cũng thử làm xem.
<br>
<br>
Thêm một constructor vào `<Board>` và đặt state ban đầu là một mảng có 9 phần tử null tương ứng với 9 ô:
```javascript:components/Board.js
...

class Board extends React.Component { // modified
  constructor(props) {                // added
    super(props);                     // added
    this.state = {                    // added
      squares: Array(9).fill(null),   // added
    };                                // added
  }                                   // added

  render() {                          // added
    const status = <Text>Next player: X</Text>;

    return (
      <View style={styles.container}>
        <View style={styles.status}>{status}</View>
        <View style={styles.boardRow}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={[styles.boardRow, { borderBottomWidth: 0.5 }]}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
    );
  }                                   // added
}

export default Board;
```

Sau này, khi chúng ta điền vào bàn cờ thì mảng `this.state.squares` sẽ trông kiểu như thế này:
```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

Hàm `renderSquare` của `<Board>` hiện giờ đang như thế này:
```javascript
const renderSquare = (i) => <Square value={i} />;
```

Lúc đầu, chúng ta [truyền prop `value`](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-13-LzD5dJxWZjY#_truyen-du-lieu-thong-qua-props-7) từ `<Board>` để hiển thị các số từ 0 đến 8 trong mỗi ô. Sau đó, chúng ta đã thay thế các con số bằng dấu "X" [là state của chính Square](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-13-LzD5dJxWZjY#_tao-ra-mot-component-co-tinh-tuong-tac-8). Đây chính là lý do vì sao mà hiện giờ Square đang lờ đi prop `value` được truyền tới nó từ Board.
<br>
<br>
Bây giờ chúng ta sẽ lại sử dụng cơ chế truyền prop lần nữa. Chúng ta sẽ thay đổi Board để chỉ cho mỗi Square biết được giá trị hiện tại của nó (`'X'`, `'O'` hoặc `null`). Chúng ta đã định nghĩa mảng `squares` trong constructor của Board, giờ chúng ta cần thay đổi method `renderSquare` của Board để có thể đọc được dữ liệu từ nó. Hãy chuyển nó vào bên trong class `Board` và sửa như sau:
```javascript:components/Board.js
...

  renderSquare(i) {
    const { squares } = this.state;

    return <Square value={squares[i]} />;
  }

  render() {
    const status = <Text>Next player: X</Text>;

    return (
      <View style={styles.container}>
        <View style={styles.status}>{status}</View>
        <View style={styles.boardRow}>
          {this.renderSquare(0)} // modified
          {this.renderSquare(1)} // modified
          {this.renderSquare(2)} // modified
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(3)} // modified
          {this.renderSquare(4)} // modified
          {this.renderSquare(5)} // modified
        </View>
        <View style={[styles.boardRow, { borderBottomWidth: 0.5 }]}>
          {this.renderSquare(6)} // modified
          {this.renderSquare(7)} // modified
          {this.renderSquare(8)} // modified
        </View>
      </View>
    );
  }
}

export default Board;
```

Giờ thì mỗi Square sẽ nhận một prop `value` là `'X'`, `'O'` hoặc `null`.
<br>
<br>
Tiếp theo, chúng ta cần phải thay đổi điều sẽ xảy ra khi ấn vào ô. Component Board giờ sẽ quản lý xem ô nào được điền vào. Chúng ta cần phải tìm cách làm cho Square có thể cập nhật được state trong Board. Vì state được coi là private với component mà nó được định nghĩa trong đó do đó chúng ta không thể trực tiếp update state của Board từ Square được.
<br>
<br>
Thay vào đó, chúng ta sẽ truyền một hàm từ Board tới Square và chúng ta sẽ làm cho Square gọi hàm đó khi nó được ấn vào. Chúng ta sẽ sửa hàm `renderSquare` trong Board thành:
```javascript:components/Board.js
...

  renderSquare(i) {
    const { squares } = this.state;

    return <Square value={squares[i]} onPress={() => this.handlePress(i)} />; // modified
  }
  
...
```

Giờ thì chúng ta đã truyền hai prop từ Board xuống Square: `value` và `onPress`. Prop `onPress` là một hàm mà Square sẽ gọi nó khi được ấn. Chúng ta sẽ sửa những thứ sau trong Square:
* Thay thế `const { value } = this.state;` bằng `const { value, onPress } = props;` trong hàm `render` của Square
* Thay thế `this.setState()` bằng `onPress()` trong hàm `render` của Square
* Xóa `constructor` khỏi Square vì Square không còn theo dõi state của game nữa
* Chuyển component Square thành kiểu stateless

Sau những thay đổi, component Square sẽ trông như sau:
```javascript:components/Square.js
...

const Square = (props) => {
  const { value, onPress } = props;

  return (
    <TouchableNativeFeedback onPress={() => onPress()}>
      <View style={styles.square}>
        <Text style={styles.squareText}>{value}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Square;
```

Khi một Square được ấn vào, hàm `onPress` được truyền xuống bởi Board sẽ được gọi. Điều này được thực hiện như sau:
1. Prop `onPress` trong component DOM tích hợp sẵn `<TouchableNativeFeedback>` sẽ báo React Native thiết lập một event listener.
2. Khi ô cờ được ấn vào, React Native sẽ gọi event handler `onPress` được định nghĩa trong method `render()` của Square.
3. Event handler này sẽ gọi `onPress()`. Prop `onPress` của Square đã được chỉ định bởi Board.
4. Vì Board đã truyền `onPress={() => this.handlePress(i)}` tới Square, Square gọi `this.handlePress(i)` khi được ấn vào.
5. Chúng ta vẫn chưa định nghĩa method `handlePress()` nên app lúc này sẽ crash. Nếu giờ bạn ấn vào một ô nào đó, bạn sẽ thấy màn hình báo lỗi "\_this2.handlePress is not a function".

> **Note**
> 
> Thuộc tính `onPress` của component DOM `<TouchableNativeFeedback>` có ý nghĩa đặc biệt với React Native vì nó là một component tích hợp sẵn. Với các component tùy chỉnh như Square thì việc đặt tên cho nó là tùy theo ý của bạn. Chúng ta có thể đặt một cái tên bất kì cho prop `onPress` của Square hoặc method `handlePress` của Board mà code vẫn hoạt động giống hệt nhau. Trong React Native, với các prop đại diện cho các sự kiện bạn nên sử dụng tên `on[Tên event]` và với các method xử lý các sự kiện thì bạn nên đặt là `handle[Tên event]`, đặt như vậy sẽ giúp cho code của bạn có tính quy ước hơn.
> 
Khi các bạn ấn vào một Square bất kì, bạn sẽ thấy màn hình báo lỗi vì chúng ta vẫn chưa định nghĩa `handlePress`. Giờ chúng ta sẽ thêm `handlePress` vào class Board:
```javascript:components/Board.js
...

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handlePress(i) {                        // added
    const { squares } = this.state;       // added
    const aSquares = squares.slice();     // added
    aSquares[i] = 'X';                    // added
    this.setState({ squares: aSquares }); // added
  }                                       // added

  renderSquare(i) {
    const { squares } = this.state;

    return <Square value={squares[i]} onPress={() => this.handlePress(i)} />;
  }

  render() {
    const status = <Text>Next player: X</Text>;

    return (
      <View style={styles.container}>
        <View style={styles.status}>{status}</View>
        <View style={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={[styles.boardRow, { borderBottomWidth: 0.5 }]}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
}

export default Board;
```
Sau những thay đổi trên, chúng ta lại có thể điền vào các ô trống bằng cách ấn vào chúng giống như lúc trước. Tuy nhiên giờ state được lưu vào component Board thay vì các component Square. Khi state của Board thay đổi thì các component Square tự động render lại. Đặt state của tất cả các ô ở trong component Board sẽ cho phép chúng ta sau này xác đinh được người thắng cuộc.
<br>
<br>
Vì các component Square không còn giữ state nữa, các component Square sẽ nhận các giá trị từ component Board và báo cho component Board biết khi chúng được ấn vào. Nói theo React Native thì giờ các component Square giờ là các **controlled component**. Board có toàn quyền control chúng.
<br>
<br>
Hãy chú ý trong hàm `handlePress`, chúng ta gọi `.slice()` để tạo ra một bản sao của mảng `squares` và thay đổi nó thay vì thay đổi mảng ban đầu. Mình sẽ giải thích cho các bạn vì sao lại cần phải tạo ra một bản sao của mảng `squares` trong mục tiếp theo.

### Vì sao "tính bất biến" (Immutability) lại quan trọng
Trong đoạn code ở mục trước, mình đã sử dụng `.slice()` để tạo ra một bản sao của mảng `squares` và thay đổi nó thay vì thay đổi mảng ban đầu. Giờ chúng ta hãy thảo luận về tính bất biến và vì sao lại cần phải tìm hiểu về nó.
<br>
<br>
Thường thì sẽ có hai hướng để thay đổi dữ liệu. Hướng thứ nhất là *biến đổi* dữ liệu bằng việc trực tiếp thay đổi giá trị của dữ liệu. Hướng thứ hai là thay thế dữ liệu bằng một bản sao mà bản sao đó có những thay đổi mà bạn mong muốn.
<br>
<br>
**Thay đổi dữ liệu bằng cách biến đổi trực tiếp**
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// player giờ đổi thành {score: 2, name: 'Jeff'}
```

**Thay đổi dữ liệu nhưng không biến đổi trực tiếp**
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// player không thay đổi nhưng có được newPlayer là {score: 2, name: 'Jeff'}

// hoặc nếu bạn sử dụng cú pháp object spread bạn có thể viết như sau:
// var newPlayer = {...player, score: 2};
```

Kết quả cuối cùng của cả hai cách là như nhau, nhưng bằng việc không biến đổi trực tiếp, bạn sẽ thu được những lợi ích như dưới đây.
<br>
<br>
**Các tính năng phức tạp sẽ trở nên đơn giản hơn**

Tính bất biến khiến cho việc implement các tính năng phức tạp trở nên dễ dàng hơn rất nhiều. Sau này, chúng ta sẽ implement thêm một tính năng gọi là "time travel" cho phép chúng ta xem lại lịch sử các của game về "nhảy về" các nước đi trước. Tính năng này không chỉ là dành riêng cho các trò chơi mà việc có thể undo và redo các thao tác là một nhu cầu thường gặp ở bất kì một ứng dụng nào. Việc tránh biến đổi trực tiếp dữ liệu giúp cho chúng ta có thể giữ nguyên được các trạng thái trước đây của game và có thể sử dụng lại chúng.
<br>
<br>
**Tìm kiếm những thay đổi**

Khó có thể tìm kiếm được những thay đổi trong các object khả biến (mutable) vì chúng bị thay đổi một cách trực tiếp. Việc tìm kiếm đòi hỏi các object khả biến phải được so sánh với các bản sao trước đó của chính nó và phải xem toàn bộ cây object.
<br>
<br>
Tìm kiếm những thay đổi trong các object bất biến (immutable) đơn giản hơn đáng kể. Nếu object đang được tham chiếu đến khác biệt so với cái trước thì object đã bị thay đổi.
<br>
<br>
**Xác định khi nào cần render lại trong React Native**

Lợi ích chính của tính bất biến là giúp bạn xây dựng các *pure component* trong React Native. Dữ liệu bất biến có thể dễ dàng xác định được có thay đổi nào xảy ra hay không từ đó giúp quyết định được khi nào cần render lại component.
<br>
<br>
Bạn có thể tìm hiểu thêm về `shouldComponentUpdate()` và cách build *pure component* bằng cách đọc [`Optimizing Performance`](https://reactjs.org/docs/optimizing-performance.html#examples).

### Stateless Components
Trong React Native, **stateless component** (a.k.a. **function component**) là một cách đơn giản hơn để viết các component chỉ chứa một hàm `render` và không có state của chính nó. Thay vì định nghĩa một class mà có extend `React.Component`, chúng ta có thể viết một hàm mà nhận `props` làm input và trả về thứ cần được render. Viết stateless component sẽ nhanh gọn hơn viết class và rất nhiều component có thể được viết theo cách này.
<br>
<br>
Square của chúng ta hiện giờ chính là một stateless component được viết bằng cú pháp arrow function:
```javascript
const Square = (props) => {
  const { value, onPress } = props;

  return (
    <TouchableNativeFeedback onPress={() => onPress()}>
      <View style={styles.square}>
        <Text style={styles.squareText}>{value}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};
```
<br>

> **Note**
> 
> Các bạn cũng có thể thay đổi `onPress={() => onPress()}` thành phiên bản ngắn hơn `onPress={onPress}` (bạn hãy để ý, ngoặc ở *cả hai bên* đã được lược bỏ).
> 

### Chuyển lượt
Bây giờ chúng ta cần sửa một "lỗi" trong app tic-tac-toe của chúng ta: không thể đánh dấu "O" lên bàn cờ.
<br>
<br>
Chúng ta sẽ đặt mặc định cho nước đi đầu là "X". Chúng ta có thể đặt mặc định này bằng việc thay đổi state ban đầu trong constructor của Board:
```javascript:components/Board.js
...

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,                  // added
    };
  }
  
...
```
Cứ mỗi lần một ngươi chơi đi một nước, `xIsNext` (một boolean) sẽ bị thay đổi để quyết định người chơi nào sẽ đánh nước tiếp theo và state của game sẽ được lưu lại. Chúng ta sẽ update hàm `handlePress`  của Board để thay đổi giá trị của `xIsNext`:
```javascript:components/Board.js
...

  handlePress(i) {
    const { squares, xIsNext } = this.state; // modified
    const aSquares = squares.slice();
    aSquares[i] = xIsNext ? 'X' : 'O';       // modified
    this.setState({
      squares: aSquares,
      xIsNext: !xIsNext,                     // added
    });
  }

...
```
Với thay đổi như vậy, ta có thể thay phiên đánh 'X' và 'O'. Bạn hãy thử trên giả lập xem!
<br>
<br>
Hãy sửa cả dòng text "status" trong hàm `render` của Board nữa để nó có thể hiển thị người chơi nào sẽ đánh lượt tiếp theo:
```javascript:components/Board.js
...

  render() {
    const { xIsNext } = this.state;
    const status = <Text>Next player: {xIsNext ? 'X' : 'O'}</Text>;

...
```
Sau những thay đổi phía trên, component Board của bạn bậy giờ sẽ trông như thế này:
```javascript:components/Board.js
...

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,                                                // added
    };
  }

  handlePress(i) {
    const { squares, xIsNext } = this.state;                        // modified
    const aSquares = squares.slice();
    aSquares[i] = xIsNext ? 'X' : 'O';                              // modified
    this.setState({                                                 // modified
      squares: aSquares,                                            // modified
      xIsNext: !xIsNext,                                            // modified
    });                                                             // modified
  }

  renderSquare(i) {
    const { squares } = this.state;

    return <Square value={squares[i]} onPress={() => this.handlePress(i)} />;
  }

  render() {
    const { xIsNext } = this.state;                                 // added
    const status = <Text>Next player: {xIsNext ? 'X' : 'O'}</Text>; // modified

    return (
      <View style={styles.container}>
        <View style={styles.status}>{status}</View>
        <View style={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={[styles.boardRow, { borderBottomWidth: 0.5 }]}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
}

export default Board;
```

### Xác định người thắng cuộc
Sau khi ta đã hiển thị được lượt đi kế tiếp là của người chơi nào, chúng ta cũng cần phải thể hiện được khi nào thì chò trơi kết thúc và khi đó sẽ không thể đi thêm nước nào nữa. Hãy tạo thêm folder `helpers` ở thư mục gốc, trong đó tạo thêm file `calculateWinner.js`, sau đó hãy copy hàm sau vào đó:
```javascript:helpers/calculateWinnder.js
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default calculateWinner;
```

Truyền vào một mảng 9 ô, hàm trên sẽ tìm ra người chiến thắng và trả về `'X'`, `'O'` hoặc `null` tương ứng.
<br>
<br>
Chúng ta sẽ gọi hàm `calculateWinner(squares)` trong hàm `render` của Board để check xem đã có người chơi nào thắng cuộc chưa. Nếu có người thắng thì hiển thị text như là "Winner: X" hoặc "Winnder: O". Chúng ta sẽ thay thế biến `status` ở trong hàm `render` của Board với đoạn code sau:
```javascript:components/Board.js
...

  render() {
    const { squares, xIsNext } = this.state;                    // modified
    const winner = calculateWinner(squares);                    // added
    let status;                                                 // modified
    if (winner) {                                               // added
      status = <Text>Winner: {winner}</Text>;                   // added
    } else {                                                    // added
      status = <Text>Next player: {xIsNext ? 'X' : 'O'}</Text>; // added
    }                                                           // added

...
```

Chúng ta giờ cũng có thể thay đổi hàm `handlePress` của Board để return sớm hơn bằng cách lờ đi khi được ấn vào nếu có ai đó đã thắng hoặc ô đó đã được điền rồi:
```javascript:components/Board.js
...

  handlePress(i) {
    const { squares, xIsNext } = this.state;
    if (calculateWinner(squares) || squares[i]) { // added
      return;                                     // added
    }                                             // added
    const aSquares = squares.slice();
    aSquares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      squares: aSquares,
      xIsNext: !xIsNext,
    });
  }

...
```

Congratulations! Giờ bạn đã có được một app game tic-tac-toe hoàn chỉnh. Đi được đến đây tức là bạn đã học được những điều cơ bản về React Native rồi, do đó chính bạn mới là người thắng cuộc thực sự ở đây :wink:.
<br>
<br>

-----

Link to [**Part 3**](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-33-6J3Zgm8x5mB).

*Bài viết dựa theo Tutorial về React: https://reactjs.org/tutorial/tutorial.html*