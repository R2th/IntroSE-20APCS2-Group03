Link to [**Part 2**](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-23-4P8563AAKY3).
<br>
<br>

-----

# Adding Time Travel
Ở mục cuối này, chúng ta sẽ xây dựng tính năng "đi ngược thời gian" để quay về các nước đi trước trong ván cờ.

### Lưu lịch sử các nước cờ
Nếu trước đây, chúng ta biến đổi mảng `squares` thì việc implement tính năng time travel sẽ rất khó khăn.
<br>
<br>
Tuy nhiên, chúng ta đã sử dụng `slice()` để tạo ra một bản sao của mảng `squares` sau mỗi nước đi và [coi nó là bất biến](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-23-4P8563AAKY3#_vi-sao-tinh-bat-bien-immutability-lai-quan-trong-2). Điều này sẽ cho phép chúng ta lưu tất cả các phiên bản trước đó của mảng `squares` và di chuyển tới những lượt đi trước.
<br>
<br>
Chúng ta sẽ lưu các phiên bản cũ của mảng `squares` trong một mảng khác gọi là `history`. Mảng `history` sẽ đại diện cho tất cả các trạng thái của bản cờ, từ nước đi đầu tiên tới nước đi cuối cùng. Nó sẽ có dạng như sau:
```javascript
history = [
  // Trước khi đi nước đầu tiên
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // Sau khi đi nước đầu tiền
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // Sau khi đi nước thứ hai
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

Giờ chúng ta cần quyết định component nào sẽ sở hữu state `history`.

### Đẩy state lên trên lần nữa
Chúng ta sẽ cần component Game ở trên cùng để hiển thị danh sách các nước đi. Để hiển thị được, nó cần có được sự truy cập tới mảng `history`, vậy nên chúng ta sẽ đặt state `history` bên trong component Game ở trên cùng.
<br>
<br>
Việc đặt state `history` vào trong component Game sẽ cho phép chúng ta xóa bỏ state `squares` khỏi Board, component con của nó. Cũng giống như khi chúng ta ["đẩy state lên"](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-23-4P8563AAKY3#_day-state-len-tren-1) từ component Square vào component Board, giờ chúng ta sẽ đẩy nó từ Board vào trong component Game ở trên cùng. Điều này sẽ cho component Game toàn quyển điểu khiển dữ liệu của Board và cho phép nó chỉ thị Board render ra các nước đi trước từ `history`.
<br>
<br>
Đầu tiên, chúng ta sẽ định nghĩa state ban đầu cho component Game ở trong constructor của nó:
```javascript:App.js
...

class Game extends React.Component {    // modified
  constructor(props) {                  // added
    super(props);                       // added
    this.state = {                      // added
      history: [                        // added
        {                               // added
          squares: Array(9).fill(null), // added
        },                              // added
      ],                                // added
      xIsNext: true,                    // added
    };                                  // added
  }                                     // added

  render() {                            // added
    return (                            // added
      <View style={styles.game}>
        <View style={styles.gameBoard}>
          <Board />
        </View>
        <View style={styles.gameInfo}>
          <View>{/* status */}</View>
          {/* TODO */}
        </View>
      </View>
    );                                  // added
  }                                     // added
}                                       // modified

export default Game;
```

Tiếp theo, chúng ta sẽ để component Board nhận `squares` và prop `onPress` từ component Game. Vì giờ chúng ta sẽ chỉ có một press handler trong Board cho nhiều Squares, chúng ta sẽ cần phải truyền vị trí của mỗi Square vào `onPress` handler để chỉ rõ Square nào đã được ấn vào. Dưới đây là các bước cần có để biến đổi component Board:
* Xóa `constructor` trong Board.
* Thay thế `const { squares } = this.state;` bằng `const { squares, onPress } = this.props;` trong `renderSquare` của Board.
* Thay thế `this.handlePress(i)` bằng `onPress(i);` trong `renderSquare` của Board.

Component Board giờ sẽ trông như thế này:
```javascript:components/Board.js
...

class Board extends React.Component {
  handlePress(i) {
    const { squares, xIsNext } = this.state;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const aSquares = squares.slice();
    aSquares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      squares: aSquares,
      xIsNext: !xIsNext,
    });
  }

  renderSquare(i) {
    const { squares, onPress } = this.props;                         // modified
    return <Square value={squares[i]} onPress={() => onPress(i)} />; // modified
  }

  render() {
    const { squares, xIsNext } = this.state;
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = <Text>Winner: {winner}</Text>;
    } else {
      status = <Text>Next player: {xIsNext ? 'X' : 'O'}</Text>;
    }

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

Chúng ta sẽ update hàm `render` của component Game để có thể sử dụng history gần đây nhất để hiển thị status của game:
```javascript:App.js
import React from 'react';
import { View, Text } from 'react-native';                      // modified
import styles from './styles';
import Board from './components/Board';
import calculateWinner from './helpers/calculateWinner';        // added

...

  render() {
    const { history, xIsNext } = this.state;                    // added
    const current = history[history.length - 1];                // added
    const winner = calculateWinner(current.squares);            // added

    let status;                                                 // added
    if (winner) {                                               // added
      status = <Text>Winner: {winner}</Text>;                   // added
    } else {                                                    // added
      status = <Text>Next player: {xIsNext ? 'X' : 'O'}</Text>; // added
    }                                                           // added

    return (
      <View style={styles.game}>
        <View style={styles.gameBoard}>
          <Board
            squares={current.squares}                           // added
            onPress={(i) => this.handlePress(i)}                // added
          />
        </View>
        <View style={styles.gameInfo}>
          <View>{status}</View>                                 // modified
          {/* TODO */}
        </View>
      </View>
    );
  }
}

export default Game;
```

style lại một chút:
```javascript:styles.js
...
  game: {
    flexDirection: 'row',
  },
  gameBoard: {},
  gameInfo: {
    paddingVertical: 15,
  },
...
```

Bởi vị bây giờ component Game sẽ render status của game, chúng ta có thể xóa đoạn code tương ứng trong method `render` của Board. Sau khi sửa, hàm `render` của Board sẽ trông như sau:
```javascript:components/Board.js
import React from 'react';
import { View } from 'react-native';
...

  render() {
    return (
      <View style={styles.container}>
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
  
...
```

Cuối cùng, chúng ta cần di chuyển method `handlePress` từ component Board tới component Game. Chúng ta cũng cần thay đổi `handlePress` vì state của component Game có cấu trúc khác. Bên trong method `handlePress` của Game chúng ta sẽ thêm các bản ghi lịch sử mới vào trong `history`.
```javascript:App.js
...

  handlePress(i) {
    const { history, xIsNext } = this.state;     // modified
    const current = history[history.length - 1]; // added
    const squares = current.squares.slice();     // added
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';            // modified
    this.setState({
      history: history.concat([                  // added
        {                                        // added
          squares,                               // added
        },                                       // added
      ]),                                        // added
      xIsNext: !xIsNext,
    });
  }

...
```
<br>

> **Note**
> 
> Không giống như method `push()` của mảng, method `concat()` không biến đổi mảng gốc, do đó mình chọn sử dụng nó.
> Bạn để ý trong `this.setState` có `squares`, đây chính là cú pháp viết ngắn của `squares: squares`.
> 
Tại thời điểm này, component Board chỉ cần các method `renderSquare` và `render`.

State của game và method `handlerPress` sẽ ở trong component Game.

### Hiển thị các nước đi trước
Vì chúng ta đã ghi lại lịch sử của trò chơi nên giờ chúng ta có thể hiển thị nó với người chơi bằng một danh sách các nước đi.
<br>
<br>
Qua các phần trước chúng ta đã biết được rằng các phần tử React Native là các first-class JavaScript object, chúng ta có thể chuyền chúng trong app của chúng ta. Để render nhiều item trong React Native, chúng ta có thể dùng một mảng các phần tử React Native.
<br>
<br>
Trong JavaScript, các mảng có [method `map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) thường được dùng để ánh xạ dữ liệu này với dữ liệu khác, ví dụ:
```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

Sử dụng method `map` chúng ta có thể ánh xạ lịch sử các nước đi với các phần tử React Native tượng trưng cho các nút ấn trên màn hình và hiển thị ra một danh sách các nút để "nhảy" về các nước đi trước.
<br>
<br>
Hãy `map` mảng `history` trong method `render` của Game:
```javascript:App.js
import React from 'react';
import { View, Text, Button } from 'react-native';                       // modified
...

  render() {
    const { history, xIsNext } = this.state;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {                          // added
      const desc = move ? `Go to move #${move}` : 'Go to game start';    // added
      return <Button onPress={() => this.jumpTo(move)} title={desc} />;  // added
    });                                                                  // added

    let status;
    if (winner) {
      status = <Text>Winner: {winner}</Text>;
    } else {
      status = <Text>Next player: {xIsNext ? 'X' : 'O'}</Text>;
    }

    return (
      <View style={styles.game}>
        <View style={styles.gameBoard}>
          <Board
            squares={current.squares}
            onPress={(i) => this.handlePress(i)}
          />
        </View>
        <View style={styles.gameInfo}>
          <View style={styles.status}>{status}</View>
          <View>{moves}</View>                                           // added
        </View>
      </View>
    );
  }
...
```

Cứ mỗi nước đi trong lịch sử của trò chơi chúng ta sẽ tạo ra một `<Button>`. Nút sẽ có một handler `onPress` gọi tới một method tên là `this.jumpTo()`. Tuy nhiên chúng ta vẫn chưa định nghĩa method `jumpTo()`. Hiện tại, chúng ta sẽ thấy một danh sách các nước đi đã diễn ra trong game và một lời cảnh báo ở dưới:
> **Warning: Each child in a list should have a unique "key" prop."**
> 
> **Check the render method of \`Game\`.**
> 
Chúng ta hãy xem xét ý nghĩa của cảnh báo trên

### Chọn khóa
Khi chúng ta render một danh sách, React Native sẽ lưu một vài thông tin về mỗi item được render ra. Khi chúng ta cập nhật một danh sách, React cần xác định được những thứ gì đã được thay đổi. Chúng ta có thể đã thêm, xóa, sắp xếp lại hoặc cập nhật các item trong danh sách.
<br>
<br>
Hãy thử tưởng tượng chuyển từ
```javascript
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

thành
```javascript
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

Ngoài việc thay đổi các con số, một người đọc những dòng này có thể nói rằng chúng ta đã đổi vị trí của Alexa và Ben và thêm Claudia vào giữa. Tuy nhiên React Native là một trương trình máy tính và nó sẽ không biết được chúng ta muốn làm gì. Vì React Native không thể biết được ý đồ của chúng ta, chúng ta cần chỉ ra một thuộc tính *key* cho mỗi item trong danh sách để phân biệt chúng với nhau. Một trong các lựa chọn chinh là dùng các string `alexa`, `ben`, `claudia`. Nếu chúng ta hiển thị dữ liệu từ một cơ sở dữ liệu nào đó thì có thể dùng ID của Alexa, Ben và Claudia để làm key.
```javascript
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

Khi một danh sách được render lại, React Native sẽ lấy key của các item và tìm trong danh sách lúc trước các item khớp với các key đó. Nếu danh sách hiện tại có một key chưa từng tồn tại trước đó, React Native sẽ tạo ra một component mới. Nếu danh sách hiện tại thiếu một key tồn tại trong danh sách cũ, React Native sẽ xóa bỏ component cũ. Nếu hai key khớp nhau thì component tương ứng sẽ được di chuyển. Key giúp React Native phân biệt được các component với nhau và giúp React Native duy trì được state giữa các lần render lại. Nếu key của một component bị thay đổi thì component đó sẽ bị xóa bỏ và được tạo lại với state mới.
<br>
<br>
`key` là một thuộc tính đặc biệt và dành riêng cho React Native (cùng với `ref`, một tính năng nâng cao hơn). Khi một phần tử được tạo ra, React Native sẽ trich xuất tính `key` ra và lưu nó trực tiếp trên phần tử được trả về. Mặc dù `key` trông có vẻ như là nó thuộc về `props` nhưng nó sẽ không thể được tham chiếu tới qua `this.props.key`. React Native tự động sử dụng `key` để biết được component nào cần update. Một component không thể truy vấn `key` của chính nó.
<br>
<br>
**Mỗi khi tạo một danh sách động các bạn cần đặc biệt lưu ý rằng nên gán các key phù hợp cho chúng**. Nếu project của bạn hiện giờ vẫn chưa có key thì hãy nên xem xét đến việc tái cấu trúc lại dữ liệu của nó để gán các key phù hợp.
<br>
<br>
Nếu không chỉ rõ key, React Native sẽ hiển thị cảnh báo và mặc định sử dụng index của mảng để làm key. Việc sử dụng index của mảng để làm key này sẽ trở thành một vấn đề khi bạn muốn sắp xếp lại các item trong list hoặc khi bạn muốn thêm/bớt item. Việc viết rõ `key={i}` khiến cảnh báo tắt đi nhưng cũng sẽ gặp vấn để giống như với index của mảng và không được khuyên dùng trong hầu hết mọi trường hợp.
<br>
<br>
Các key không cần phải là duy nhất xét trên global, chúng chỉ cần là duy nhất xét trong component chứa nó và các component khác cùng cấp với component đấy.

### Thực hiện tính năng Time Travel
Trong lịch sử của game của chúng ta, mỗi nước đi có một ID riêng biệt được gắn liền với chúng: đó là số thứ tự của nước đi. Các nước đi sẽ không bao giờ bị sắp xếp lại, xóa hoặc thêm vào giữa nên ta có thể sử dụng index của nước đi để làm key.
<br>
<br>
Trong method `render` của component Game, chúng ta có thể thêm key `key={move}` vào component `<Button>` và cảnh báo về key của React Native sẽ biến mất:
```javascript:App.js
...

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <Button key={move} onPress={() => this.jumpTo(move)} title={desc} />  // modified
      );
    });
    
...
```
Ấn vào bất kì một nút nào trong danh sách sẽ khiến lỗi bắn ra bởi vì method `jumpTo` vẫn chưa được định nghĩa. Trước khi thêm `jumpTo`, chúng ta sẽ thêm `stepNumber` vào state của component Game để chỉ rõ chúng ta đang xem step nào.
<br>
<br>
Đầu tiên, thêm `stepNumber: 0` vào state ban đầu trong `constructor` của Game:
```javascript:App.js
...

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0, // added
      xIsNext: true,
    };
  }
  
...
```

Tiếp theo, chúng ta sẽ định nghĩa method `jumpTo` trong game để update `stepNumber`. Chúng ta cũng sẽ đặt `xIsNext` thành true nếu chúng ta thay đổi `stepNumber` thành số lẻ:
```javascript:App.js
...

  jumpTo(move) {               // added
    this.setState({            // added
      stepNumber: move,        // added
      xIsNext: move % 2 === 0, // added
    });                        // added
  }                            // added

...
```

Giờ chúng ta sẽ thêm một vài thay đổi trong method `handlePress` của Game.
<br>
<br>
State `stepNumber` mà chúng ta mới thêm vào sẽ phản ánh nước đi được hiên thị ra lúc này. Sau khi chúng ta đi thêm một nước, chúng ta cần phải update `stepNumber` bằng việc thêm `stepNumber: history.length` vào đối số của `this.setState`. Việc này giúp chúng ta đảm bảo được rằng sẽ không bị hiển thị ra nước đi cũ khi đã đi nước đi mới.
<br>
<br>
Chúng ta cũng sẽ thay thế `const { history, xIsNext } = this.state;` bằng `const { history, xIsNext, stepNumber }` và thêm `const aHistory = aHistory.slice(0, stepNumber + 1)`. Việc này sẽ đảm bảo rằng nếu chúng ta "đi ngược thời giàn" và đi một nước mới từ thời điểm đó, chúng ta sẽ vứt bỏ hết phần "tương lai" mà giờ đã trở nên không còn chính xác.
```javascript:App.js
...

  handlePress(i) {
    const { history, xIsNext, stepNumber } = this.state; // modified
    const aHistory = history.slice(0, stepNumber + 1);   // added
    const current = aHistory[aHistory.length - 1];       // modified
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: aHistory.concat([                         // modified
        {
          squares,
        },
      ]),
      stepNumber: aHistory.length,                       // added
      xIsNext: !xIsNext,
    });
  }

...
```

Cuối cùng, chúng ta sẽ sửa method `render` của component Game từ luôn render nước đi cuối cùng thành render nước đi đang được chọn dựa theo `stepNumber`:
```javascript:App.js
...

  render() {
    const { history, xIsNext, stepNumber } = this.state; // modified
    const current = history[stepNumber];                 // modified
    const winner = calculateWinner(current.squares);

...
```
Nếu chúng ta ấn vào bất kì một step nào trong danh sách lịch sử của trò chơi thì bàn cờ sẽ ngày lập tức update và show ra trạng thái của bàn cờ tại thời điểm đó.

### Tổng kết
Congratulations! Bạn vừa tạo được một app game tic-tac-toe mà có thể:
* Cho phép bạn chơi tic-tac-toe :joy:,
* Báo cho bạn biết ai đã thắng cuộc,
* Lưu lịch sử trò chơi khi trò chơi đang diễn ra,
* Cho phép người chơi xem lịch sử của trò chơi và xem các trạng thái trước đó của bàn cờ.

Nice work! Hy vọng giờ các bạn cảm thấy mình đã nắm bắt được về cách hoạt động của React Native.
<br>
<br>
Nếu bạn có thời gian rảnh hoặc muốn luyện tập các kỹ năng React Native mới học được thì sau đây là một vài ý tưởng về các cái tiến cho game tic-tac-toe, liệt kê theo mức độ khó tăng dần:
1. Hiển thị vị trí của mỗi nước đi theo format tọa độ (cột, hàng) trong danh sách lịch sử các nước đi.
2. Highlight nước đi đang chọn trong danh sách các nước đi.
3. Viết lại Board dùng hai vòng lặp để tạo ra các ô thay vì hardcode chúng.
4. Thêm một nút toggle với tác dụng có thể sắp xếp các nước đi theo thứ tự tăng hoặc giảm.
5. Khi có người thắng, hightlight ba ô vuông khiến người đó thắng.
6. Khi không có người thắng, hiển thị kết quả trò chơi là draw (hòa).

Qua bài tutorial này, chúng ta đã tiếp cận với các khái niệm của React Native bao gồm elements, components, props và state. Để có được sự giải thích chi tiết hơn về những khái niệm đó, các bạn có thể xem nốt [các phần tài liệu còn lại](https://facebook.github.io/react-native/docs/tutorial). Để tìm hiểu thêm về các component, hãy xem [Components và APIs của React Native](https://facebook.github.io/react-native/docs/components-and-apis).
<br>
<br>

-----

*(Hết)*

*Bài viết dựa theo Tutorial về React: https://reactjs.org/tutorial/tutorial.html*