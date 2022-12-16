# Introduction
- Hôm nay, chúng ta sẽ cùng nhau xây dựng game cờ caro (x/o) đơn giản. 
- Kết quả cuối cùng trông sẽ như thế này 

![](https://images.viblo.asia/a95e9fb2-d8a5-436f-853c-4f7650c5230e.png)

- Giờ thì bắt đầu code thôi
# Content
- Ở trong bài này mình sẽ sử dụng `create-react-app` để tạo project react.
    ```shell
    create-react-app demo-caro
     ```
 - Đầu tiên chúng ta sẽ có 1 bàn cờ gồm 9 ô, ở bước này mình sẽ để nó là 1 component gọi là `Square`.
 - Ta có code như sau
     ```javascript
     // Square.js
     
    import React from "react";

    export default function Square({ onClick, value }) {
      return (
        <button className="square" onClick={onClick}>
          {value}
        </button>
      );
    }
    ```
    
    - Component này sẽ phục vụ mục đích render ra 1 ô vuông tức là 1 ô bàn cờ. Ở component này mình sẽ có 2 props `value` và `onClick`. `value` sẽ dùng để hiển thị số từ 0->8 còn `onClick` sẽ dùng để handle sự kiện người dùng click vào các ô khi chơi cờ.
 - Tiếp theo thì mình sẽ tạo thêm 1 component là `Board` để chưa toàn bộ bàn cờ.

    ```javascript
    // Board.js
    
    import React from "react";

    import Square from "./Square";

    export default function Board({ squares, onClick }) {
      const renderSquares = numbs => {
        return numbs.map(num => (
          <Square value={squares[num]} onClick={() => onClick(num)} />
        ));
      };

      return (
        <div>
          <div className="board-row">{renderSquares([0, 1, 2])}</div>
          <div className="board-row">{renderSquares([3, 4, 5])}</div>
          <div className="board-row">{renderSquares([6, 7, 8])}</div>
        </div>
      );
    }

    ```
    
    - Bảng này mình chia làm 3 hàng nên sẽ render như trên.
    - Như ở trên mình nói thì component này sẽ là cả bàn cờ, sự kiện onClick khi người dùng chơi cờ sẽ được tiếp tục truyền lên component chính để handle ở đó.

-  Bây giờ sẽ đến component chính, ở đây mình có sử dụng 1 tips nho nhỏ để kiểm tra người chơi nào đã win.
-  Mình đặt tên nó là checkWinner
    ```javascript
    function checkWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
    ```
    
    - `lines` ở đây sẽ là các khả năng đã có người dành chiến thắng, ví dụ trên bàn cơ mình sắp xếp các số như sau

        |  0 |  1 |  2 |
        | -------- | -------- | -------- |
        | 3     | 4     | 5    |
        | 6     | 7     | 8     |
    - Nếu như có người dành chiến thắng bằng việc nối 3 x hoặc 3 o thẳng hàng nhau nghĩa là 3 x hoặc 3 o sẽ nằm trùng với các cặp số ở trên
    - `squares` ở đây mình sẽ lưu là các giá trị người chơi click trên bàn cờ, có dạng như sau` [x, o, x, 3, x, 5, 6, 7, o]`.
    - Tương đương trên bàn cờ sẽ hiển thị như này:


        |  x |  o |  x |
        | -------- | -------- | -------- |
        | 3     | x    | 5    |
        | 6     | 7     | o     |
    - Bây giờ ta sẽ lặp qua các phần tử của squares và thấy nếu có 3 x hoặc 3 o thoả mãn các cặp số trên nghĩa là có người dành chiến thắng.
- Component chính mình sẽ lưu các state như sau

    ```javascript
    // App.js
    
    import React, { useState } from "react";

    import Board from "./Board";
    import "./index.css";

    export default function App() {
      const [squares, setSquares] = useState(Array(9).fill(null));
      const [xIsNext, setXIsNext] = useState(true);
    }

    ```
- `squares` chính là nơi mình lưu các giá trị khi người dùng chơi cờ, mình để default là 1 mảng có 9 gía trị null
- Còn `xIsNext` là để lưu text hiển thị đến lượt của ai chơi, ở đây mình để default là true để x đánh trước còn nếu muốn o đánh trc hay để default là false.
- Tiếp theo mình sẽ hiển thị bàn cờ ra

    ```javascript
    // App.js
    
    import React, { useState } from "react";

    import Board from "./Board";
    import "./index.css";

    export default function App() {
      const [squares, setSquares] = useState(Array(9).fill(null));
      const [xIsNext, setXIsNext] = useState(true);

      const status = "Next player: " + (xIsNext ? "X" : "O");

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={squares} onClick={() => {}} />
          </div>
          <div className="game-info">
            <div>{status}</div>
          </div>
        </div>
      );
    }

    ```
    
- Tiếp theo sẽ cần 1 hàm để handle việc người chơi click vào các ô cờ.

    ```javascript
    // App.js
    
    ...
    const handleClick = i => {
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setSquares(squares);
    setXIsNext(!xIsNext);
  };
  ...
    ```
- Ở đây đầu tiên mình sẽ check là nếu chưa có ai win thì mới handle còn nếu win rồi thì return luôn.
- Rất đơn giản là nếu đang lượt chơi của x thì giá trị đc thêm vào sẽ là x, mình pass param là index của ô được click nên nếu click vào ô có index là 2 thì squares sẽ trở thành `[null, null, x, null, null, null, null, null, null]`.
- Rồi còn một việc cuối cùng nữa đó là khi có người giành chiến thắng thì ô hướng dẫn sẽ không hiển thị `Next player` nữa là sẽ hiển thị `Winner`, ta sửa như sau

    ```javascript
    // App.js
    
    ...
    const winner = checkWinner(squares);

  let status;
  if (winner) {
      status = "Winner: " + winner;
  } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
  }
  ...
    ```

- Vậy là xong rồi, cuối cùng thì file component của mình sẽ trở thành như sau

    ```javascript
    // App.js
    
    import React, { useState } from "react";

    import Board from "./Board";
    import "./index.css";

    export default function App() {
      const [squares, setSquares] = useState(Array(9).fill(null));
      const [xIsNext, setXIsNext] = useState(true);

      const handleClick = i => {
        if (checkWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = xIsNext ? "X" : "O";
        setSquares(squares);
        setXIsNext(!xIsNext);
      };

      const winner = checkWinner(squares);

      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={squares} onClick={i => handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
          </div>
        </div>
      );
    }

    function checkWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }

    ```
    
- File `index.css` mình sửa như sau

    ```javascript
    // index.css

    body {
      font: 34px "Century Gothic", Futura, sans-serif;
      margin: 20px;
    }

    ol,
    ul {
      padding-left: 50px;
    }

    .board-row:after {
      clear: both;
      content: "";
      display: table;
    }

    .status {
      margin-bottom: 10px;
    }

    .square {
      background: #fff;
      border: 1px solid #999;
      float: left;
      font-size: 54px;
      font-weight: bold;
      line-height: 64px;
      height: 64px;
      margin-right: -1px;
      margin-top: -1px;
      padding: 0;
      text-align: center;
      width: 64px;
    }

    .square:focus {
      outline: none;
    }

    .kbd-navigation .square:focus {
      background: #ddd;
    }

    .game {
      display: flex;
      flex-direction: row;
    }

    .game-info {
      margin-left: 20px;
    }

    ```
                                                                                                                   
 # 3. Conclusion
   - Hi vọng với game đơn giản trên mọi người sẽ hiểu thêm về React và thấy làm game cũng dễ thôi đúng không =)))