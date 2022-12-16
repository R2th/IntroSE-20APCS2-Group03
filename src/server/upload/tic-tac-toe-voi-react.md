# Giới thiệu
Dạo gần đây mình có tự học `React`. Lên trang chủ của nó thì có một tutorial khá hay đó là code `tic-tac-toe` game bằng `React`. Nên trong bài viết này mình sẽ chia sẽ một số kiến thức mình học được khi code nó. Về cơ bản game sẽ giống với game `tic-tac-toe` thông thường nhưng có thêm lưu lịch sử các bước đi và mình có thể quay lại trạng thái của nước đi đó. Toàn bộ source code mình đã đưa lên git các bạn có thể vào để xem và dễ dàng theo dõi ở [đây](https://github.com/dangcq-1093/tic-tac-toe).

![](https://images.viblo.asia/bd0aa961-4e84-4b15-bcd5-6a9d72d411fb.png)

Game sẽ có giao diện như bên dưới.

![](https://images.viblo.asia/616658c7-ede2-44e3-9eb5-e1a4f73a6b0d.png)


# Kiến thức cơ bản
### JSX

JSX là một cú pháp mở rộng của Javascript. Trong `React` ta nên sử dụng JSX để tạo UI.
```Javascript
const jsx = <div>Hello World!!!</div>
```
Bên trên là cú pháp đơn giản của JSX nhìn nó rất giống HTML đúng không? Vì đây chỉ là một ví dụ đơn giản nên bạn sẽ không thấy được sực mạnh của nó. Bạn hoàn toàn có thể sử dụng `expression` trong JSX và JSX có thể có nhiều `children`. Bạn có thể xem ví dụ bên dưới.
```Javascript
const name = 'Simon';
const age = 23
const element = (
    <div>
        <h1>Hello {name}!</h1>
        <p>Age: {age}</p>
        <h2>Good to see you here.</h2>
    </div>
);
```
Để tìm hiểu rõ hơn về JSX bạn có thể tham khảo ở [đây](https://reactjs.org/docs/introducing-jsx.html).


### State
`State` để lưu trữ thông tin về component. Nó là thành phần của component và do component đó quản lý. Khi nào ta cần thay đổi dữ liệu của component ta sẽ sử dụng `state`. Có một lưu ý là ta không nên trực tiếp thay đổi state bằng cách trỏ vào nó mà nên sử dụng setState để cập nhật. Mỗi khi state thay đổi component và tất cả các component con sẽ được re-render.
```Javascript
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    increment() {
        this.setState((state) => ({
            count: state.count + 1
        }));
    }

    decrement() {
        this.setState((state) => ({
            count: state.count - 1
        }));
    }
    
    render() {
        return (
            <div className="flex">
                <button onClick={() => this.decrement()}>-</button>
                <div>{ this.state.count }</div>
                <button onClick={() => this.increment()}>+</button>
            </div>
        );
    }
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
```
Trên là một ví dụ đơn giản của việc sử dụng state và thay đổi state trong class component.
![](https://images.viblo.asia/41381488-657e-4236-b5ea-9afe8b68974f.gif)

### Props
`Props` là dữ liệu của component cha truyền cho component con để sử dụng dạng attribute. Bạn hãy tưởng tượng `props` là tham số truyền vào một hàm để hàm đó sử dụng.
Dưới đây là một ví dụ về việc sử dụng `props`.
```Javascript
function List({ people }) {
    console.log(people)
    return (
        <>
            {people.map((person) => {
                const { id, name, age, image } = person;
                return (
                    <article key={id} className="person">
                        <div>
                            <h4>{name}</h4>
                            <p>{age} years old</p>
                        </div>
                    </article>
                );
            })}
        </>
    );
}

function App() {
    const data = [
        {
            id: 1,
            name: "Simon",
            age: 27,
        },
        {
            id: 2,
            name: "Kim So Hyun",
            age: 23,
        },
        {
            id: 3,
            name: "Clown",
            age: 30,
        }
    ]
    const [listUser, setListUser] = useState(data);
    return (
        <div className="flex">
            <List people={listUser} />
            <button onClick={() => setListUser([])}>Clear All</button>
        </div>
        
    )
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
```
![](https://images.viblo.asia/76125925-f373-4cba-a04f-4c50713af458.gif)

Ở đây qua hai ví dụ bạn sẽ thấy sự khác biệt đó là khi demo về `state` mình sử dụng class component còn với `props` mình lại sử dụng function component. Mình sử dụng như vậy để các bạn làm quen với 2 loại component này và cách sử dung nó. Về function component khi truyền `props` cho component ta nhận nó như tham số truyền vào hàm và khi thao tác với `state` ta sẽ sử dụng [hook](https://reactjs.org/docs/hooks-intro.html). Chi tiết hơn về function và class component các bạn có thể xem ở [đây](https://reactjs.org/docs/components-and-props.html#function-and-class-components).

# Cài đặt
Ta sẽ sử dụng câu lệnh `npx create-react-app <your-app-name>` để tạo một project React một cách nhanh chóng. Bạn mở terminal lên chạy câu lệnh như bên dưới là ta đã có một project `React` rồi.
```Terminal
npx create-react-app tic-tac-toe
```
Ta sẽ có cấu trúc thư mục như hình.
![](https://images.viblo.asia/1d737b63-b0cc-4fa4-9c74-2ae0f5366a67.png)

Nhưng để đơn giản ta sẽ xóa một số file không cần thiết và làm cho nó nhỏ gọn nhất.
```
// terminal
cd src

# Nếu bạn sử dụng Mac or Linux: (xóa toàn bộ file trong thư mục)
rm -f *

# Quay trở về thư mục trước
cd ..
```

Sau khi xóa xong ta tạo 2 file là `index.css` và `index.js` vào trong thư mục src. Trong file `index.js` ta thêm các dòng sau.
```Javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

Vậy là đẽ setup xong project, bây giờ ta có thể nhập `npm start` vào terminal để chạy project.

# Tic-tac-toe!!!
### Truyền data vào props
Ở đây ta sẽ tập trung vào code React nên toàn bộ style CSS và source code các bạn có thể tham khảo ở link bên trên.
```Javascript
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
```
Đầu tiên ta tạo ra component Game để render game ra browser. Trong đó có sử dụng component `Board` sẽ được nói rõ hơn ở bên dưới. Còn dòng cuối cùng là `ReactDOM` để React có thể render component `Game` ra div có id là root ở file index.html trong thư mục public.
```Javascript
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```
Đầu tiên ta tạo 2 component trong file `index.js` là `Board`(bàn chơi) và `Square`(đại diện cho mỗi ô vuông chứa 'X' hoặc 'O'). Component `Board` ta sẽ render ra 9 `Square` để tạo ra bàn chơi bằng cách gọi hàm `renderSquare` và truyền cho nó `props` là 'X' hoặc 'O'. Trong hàm render mình có render ra 9 ô (nhìn có vẻ nông dân nhỉ ? tại sao mình gọi 9 lần renderSquare nhưng lại không cho vào vòng lặp =)) nhưng không sao bạn đừng để ý vội vì bài này ta sẽ tập trung vào code react ). Sau khi có được đoạn code như kia ta sẽ được giao diện như hình.

![](https://images.viblo.asia/8410fa04-1a2c-4ccf-a7a5-1bc0a37b9358.png)

### Tạo tương tác với component (bắt sự kiện click)
```Javascript
class Square extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value: null,
      };
    }
  
  render() {
    return (
      <button
          className="square"
          onClick={() => this.setState({value: 'X'})}
        >
        {this.props.value}
      </button>
    );
  }
}
```
Trong component `Square` mình có tạo state cho nó để quản lý giá trị của ô đó và mỗi khi người dùng click chuột ta sẽ điền dấu 'X' vào ô chơi đó. Ở đây mình có dùng setState để thay đổi giá trị cho state của component. Sau khi thêm sự kiện ta sẽ được như sau.

![](https://images.viblo.asia/4d4e4091-769c-408f-9da4-390586848f18.gif)

Vì `tic-tac-toe` là game hai người chơi nên ta không thể cứ điền X mãi thế được vì ta se không thể biết ai đi nước nào để tìm người chiến thắng nên ta cần điền cả O vào bàn chơi nữa. Và để kiểm tra người chiến thắng ta cũng cần quản lý giá trị của 9 ô chơi (`Square`) ở một nơi.
```Javascript
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }
  renderSquare(i) {
    return <Square value={i} />;
  }
  ...(more code below)
}
```
Trong component `Board` ta sẽ tạo state để quản lý giá trị của 9 ô chơi đó là 1 mảng có 9 phần tử và mặc định có giá tị null. Mảng của ta sẽ có giá trị tương tự như sau.
```Javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```
Vì state của mình phản ảnh chính bàn chơi và thay đổi sự kiện khi ta nhấn vào mỗi ô `Square` nên hàm renderSquare(i) trông sẽ như sau.
```Javascript
renderSquare(i) {
  return (
    <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
    />;
  )
}
```
Vì ta quản lý state của game ở component `Board` và ta truyền vào 2 props là giá trị của ô tương ứng với mảng state và một hàm handleClick. Hàm này có nhiệm vụ mỗi khi người dùng click ta sẽ cập nhật giao diện và cả state quản lý giá trị của 9 ô (có thể hiểu state.squares chính là vị trí 'X', 'O' trên màn chơi ta chỉ hiển thị cho người dùng đúng như state.squares). Trong component `Square` ta sửa như sau.
```Javascript
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```
Hàm handleClick trong component `Board` như sau.
```Javascript
handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }
```
Bạn để ý trong hàm ta có một bước là `const squares = this.state.squares.slice()` tức là ta sẽ tạo ra 1 `shallow copy` của mảng `squares` rồi sau đó ta thao tác trên mảng copy đó rồi tiến hành setState squares thành mảng mới đó. React khuyến khích việc làm này để hiểu rõ hơn các bạn có thể tham khảo lợi ích mà nó đem lại ở [đây](https://reactjs.org/tutorial/tutorial.html#why-immutability-is-important).

### Function component
Ta sẽ tiến hành chuyển component `Square` từ class component sang function component. Vì viết function component đơn giản hơn rất nhiều và chỉ tồn tại `render` method và không có `state` của nó. `Square` chuyển sang function component như sau.
```Javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```
Ta có thể thấy nhìn dễ hiểu hơn rất nhiều, `props` được truyền vào từ component cha là tham số truyền vào của hàm.

### Lượt đi của người chơi
Hiện tại code của mình chỉ có thể dánh dấu 'X' lên bàn chơi. Để có thể làm thành 2 người chơi ta cần điền 'O' vào.
```Javascript
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  ...(more code below)
```
Ta sẽ để lần đi đầu tiền là X (mặc định). Mỗi khi người chơi đổi lượt ta sẽ ta sẽ đổi giá trị của state `xIsNext` trong hàm handleClick().
```Javascript
handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```
Ta cũng sẽ tạo status để biết người chơi nào đang đến lượt đi bằng cách thêm vào hàm render trong `Board`.
```Javascript
render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      ...(more code below)
```
Cuối cùng ta sẽ có `Board` component như sau.
```Javascript
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```
Sau khi sửa xong game của chúng ta sẽ như sau.

![](https://images.viblo.asia/e3fafd8d-b233-43f9-aba6-3a114fc6fa5c.gif)

Như bạn có thể thấy về cơ bản game của ta đã hoạt động theo đúng nguyên lý của nó, bây giờ chỉ cần thêm logic để xác định người chiến thắng và đưa ra thông báo là xong.

### Tìm người chiến thắng
Vì bàn chơi của ta là 3x3 nên ta có thể dễ dàng liệt kê ra những trường hợp trong mảng để giành chiến thắng. Ta thêm một helper function, hàm này sẽ có trách nghiệm kiểm tra xem ai là người chiến thắng hoặc là khi `draw`.
```Javascript
function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  let checkNull = squares.some(function (item) {
        return item === null;
    });

  return checkNull ? null : 'Draw';
}
```
Ta sẽ gọi hàm này ở trong phương thức render của component `Board`.
```Javascript
render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
        status = winner === "Draw" ? winner : "Winner: " + winner;
    } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      ...(more code below)
```
Nhưng đến đây là chưa đủ khi bạn test thì có thể thấy khi có thông báo người chiến thắng rồi ta vẫn có thể chơi được tiếp hoặc ta có thể đi đè lên nước đi của nhau. Để có thể dừng game lại ta sẽ sửa hàm `handleClick()` như sau.
```Javascript
// Board component
handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```
Cùng test thử thôi.

![](https://images.viblo.asia/90027162-e858-43ae-a1bf-8c7b310d3378.gif)

Vậy là mọi thứ khá là ổn như những gì ta mong muốn rồi. Nhưng bây giờ mình muốn làm `Doctor Strange có viên time stone để quay lại thời gian những nước đi trước thì sao?`. Đơn giản giờ ta chỉ cần một biến để lưu trạng thái của bàn cờ cho từng nước đi vào khi ta muốn quay trở lại bước nào chỉ cần cập nhật lại state `squares`.
### Time Travel!!!
Để làm được tính năng này nếu ta cần một biến lưu toàn bộ lịch sử trạng thái của bàn cờ mỗi lần người chơi đi. Ta sẽ có thêm một state là `history` lưu tất cả trạng thái của `Board`. Nó sẽ trông như sau.
```Javascript
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // Move 1
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // Move 2
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
Để dễ dàng quản lý ta sẽ để `history` là state của `Game` component vì trong `Game` có render ra thằng component con là `Board`. Khởi tạo state cho `Game`.
```Javascript
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{/* status */}</div>
          <Board />
        </div>
        <div className="game-info">
          <div>Time Travel</div>
          <li>{/* TODO */}</li>
        </div>
      </div>
    );
  }
}
```
Ta có thể thấy `history` sẽ là một mảng chứa các trạng thái của `Board`. Vì ta thay đổi `Game` component nên `Board` component ta cũng sẽ thay đổi như sau.
```Javascript
class Board extends React.Component {
// Xóa constructor vì ta đã quản lý state của bước đi ở Game component
 renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
```
Trong hàm `renderSquare(i)` ta sẽ truyền hàm `onClick(i)` từ props vì khai ta chuyển state của sang component `Game` nên mọi thay đổi state sẽ được định nghĩa trong component `Game` và `Game` sẽ truyền hàm cho thằng con mình sử dụng.
Ta sẽ sửa lại hàm render của component `Game`
```Javascript
// Game component
render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = winner === "Draw" ? winner : "Winner: " + winner;
    } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{/* status */}</div>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>Time Travel</div>
          <li>{/* TODO */}</li>
        </div>
      </div>
    );
  }
```
Giải thích một chút ở đây bạn có thể thấy vì ta đã quản lý các trạng thái của game ở state `history` nên vị trí của 'X' và 'O' hiện tại của người chơi sẽ là phần tử cuối cùng của mảng và mọi tính toán về người thắng cuộc sẽ dựa trên phần tử cuống cùng của mảng đó. Vì ta đã tính toán và quản lý status game trong hàm render() của component `Game` nên hàm render() của component `Board` sẽ như sau.
```Javascript
// Board component
render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```
Ta cũng cần chuyển hàm handleClick(i) trong `Board` lên component `Game` vì (mọi trạng thái của game bây giờ đều do `Game` quản lý). Hàm handleClick(i) component `Game` sẽ như sau.
```Javascript
// Xóa hàm handleClick(i) trong component Board
// Game component
handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```
Như đã giải thích ở trên thì trạng thái hiện tại của game sẽ là phần tử cuối cùng của mảng nên trong hàm này ta cũng lấy ra nó để thao tác. Sau khi đã sửa xong thì đã đến lúc ta hiển thị lịch sử các bước đi cho người chơi và tiến hành `time travel` mỗi khi người chơi nhấn vào lịch sử đó. Trong hàm render của component `Game` ta thêm như sau.
```Javascript
render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
        status = winner === "Draw" ? winner : "Winner: " + winner;
    } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
          <div className="game-board">
          <div className="status">{ status }</div>
              <Board
                 squares={current.squares}
                 onClick={(i) => this.handleClick(i)}
             />
          </div>
          <div className="game-info">
              <div>Time Travel</div>
              <ul>{moves}</ul>
          </div>
      </div>
    );
  }
```
Ta thêm biến `moves` để trả về 1 list các state của `Game`. Bạn để ý sẽ thấy có một hàm chưa định nghĩa là `jumpTo(move)` hàm này sẽ chịu trách nghiệm cập nhật lại trạng thái mà người chơi muốn quay lại. Và khi render 1 list trong React ta cần gán 1 key cho nó. Để biết người chơi muốn quay lại bước nào ta cần 1 biến để lưu lại bước đó là `stepNumber` sẽ là state của `Game` component. Và hàm `jumpTo(move)` sẽ thao tác với nó.
```Javascript
jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
```
Trong hàm `jumpTo(step)` ngoài cập nhật `stepNumber` ta còn phải xác định xem người chơi tiếp theo sẽ là ai là 'X' hay 'O'?. Vì người chơi đầu tiên mặc định là X nên ta sẽ dựa theo số chẵn lẻ. Bây giờ khi người chơi nhấn vào các trạng thái muốn quay lại ta phải cập nhật lại view và người chơi tiếp theo cũng được cập nhật nên ta sẽ sửa lại một chút hàm `handleClick()` và hàm `render()` như sau.
```Javascript
handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);    // Dòng thay đổi
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,      // Dòng thay đổi
      xIsNext: !this.state.xIsNext,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];         // Dòng thay đổi
    const winner = calculateWinner(current.squares);

    // more code bellow
```
Vậy là đã xong phần **Time Travel!!** nên bây giờ ta sẽ tiến hành chạy thử xem kết quả như thế nào.

![](https://images.viblo.asia/db3cb0d3-203d-413e-8aa5-9df03d2d0365.gif)

# Tổng kết
Vậy ta đã hoàn thành trò chơi `tic-tac-toe` với React. Trò chơi này giúp chúng ta làm quen và thực hành thao tác với React, học một số kiến thức trong React như `state`, `props`, `function compoent`, `class compoent`, một chút về `hook`, và lợi ích của việc `Immutability`. Hy vọng qua bài viết này các bạn sẽ có những kiến thức cơ bản của React và xây dựng một game `tic-tac-toe` của riêng mình. Cảm ơn các bạn đã theo dỗi hết bài viết <3.

Thêm một chút là nếu bạn nào đã có kiến thức về `module` của ES6 rồi thì các bạn có thể refactor lại nó. Tách các compoent ra thành từng file và tiến hình import thay vì viết tất cả component vào một file như mình. Vì bài viết cũng khá dài rồi nên mình không đề cập đến nó ở đây.

# Tham khảo
https://reactjs.org/tutorial/tutorial.html