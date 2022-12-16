# 1. Giới thiệu
Bài toán `n-puzzle`, hay với các tên gọi khác như "Gem puzzle", "Mystic Square" nằm trong nhóm các bài toán puzzle (xếp hình, đẩy hộp đại loại). Trò chơi này gồm một bảng có n - 1 ô vuông (phổ biến n = 8, 15, 24, ...) tức là sẽ có một ô trống trong bảng. Các ô liền kề có để di chuyển đến ô trống này.
![n-puzzle](https://viblo.asia/uploads/ba840c7f-b3b2-4540-8f35-d3330c7de2e5.png)
Từ một trạng thái bất kì, người chơi cần di chuyển các ô của bảng về một trạng thái đích nào đó với số lần di chuyển càng ít càng tốt.
Về thuật toán giản bài toán này, có khá là nhiều cách:

- Breadth-first Search (BFS)
- Depth-first Search (DFS)
- Iterative Deepening DFS (ID-DFS)
- Greedy Search
- A* Search

Nếu sử dụng `Greedy Search` hoặc `A* Search` để giải bài toán này chúng ta cần phải sử dụng thêm 3 hàm `heuristic`:
- Euclidean distance heuristic
- Manhattan distance heuristic
- Tiles-out heuristic

> **Heuristic**: Là phương pháp tiếp cận bằng cảm tính, mang tính kinh nghiệm, dùng trong phương pháp "thử và sai" để giải quyết tương đối các bài toán khó. (đối lập phương pháp tiếp cận bằng thuật toán - algorithmic).


Tuy nhiên trong bài viết này, mình sẽ chỉ đề cập tới việc xây dựng game này 1 cách đơn giản bằng React :)

# 2. Coding....

Ý tưởng của mình khá là đơn giản, tất cả những gì cần xây dựng gồm:
- Cell: các `ô` hiển thị số (các bạn có thể sử dụng ảnh và cắt nó ra bằng `canvas`)
- Board: là bảng chứa các `Cell`
- Timer: hiển thị các thông tin về thời gian và số lần di chuyển
- Buttons:  là các nút bấm để thay đổi kích thước của `Board`
- Puzzle: chứa tất cả những `components` trên và `state`

### 2.1. Puzzle
Cấu trúc code cũng khá đơn giản:
- 1 `header` để thông báo đã `solved` xong hay chưa
- 1 `board` chứa các mảnh ghép
- 1 `footer` chứa các thông tin về thời gian và các `buttons` để thay đổi kích thước của `borad`

```js
class Puzzle extends React.Component {
    // ...
    render() {
        const { board, size, move, start, done } = this.state;
        return (
            <div className='puzzle'>
                <div className="puzzle-header">
                    {done ? <h3>You won!</h3> : ''}
                </div>
                <div className="puzzle-body">
                    {board ?
                        <Board
                            size={size}
                            board={board}
                            updateBoard={this.updateBoard}
                        />
                        : null
                    }
                </div>
                <Footer
                    move={move}
                    start={start}
                    done={done}
                    newGame={this.newGame}
                />
            </div>
        );
    }
}

export default Puzzle;
```

### 2.2. Board
Các logic về xử lý hầu hết được đặt trong đây:
- Kiểm tra xem mảnh ghép nào có thể di chuyển, và hướng di chuyển của nó
- Xử lý sự kiện khi click vào các mảnh ghép
- Xử lý sự kiện của bàn phím - `keydown` (các phím mũi tên: lên, xuống, trái, phải)

```js
import React from 'react';
import Cell from '../Cell';

class Board extends React.Component {
    // .....
    render() {
        const { board, size } = this.props;
        let squares = [];

        // Handle size of board
        let docWidth = document.body.clientWidth,
            docHeight = document.body.clientHeight;
        const maxWidth = parseInt(docWidth / size) - 10,
            maxHeight = parseInt((docHeight - 200) / size),
            unit = maxHeight > maxWidth ? maxWidth : maxHeight;

        // Generate board with cells
        this.props.board.map((val, index) => {
            squares.push(
                <Cell
                    key={index}
                    value={val}
                    size={size}
                    clickHandler={this.cellClickHandler}
                    right={index+1 === val}
                    unit={unit}
                />
            );

            if ((index + 1) % size === 0) {
                squares.push(<br key={`br_${index}`} />)
            }
        });

        return (
            <div className='board'>
                {squares}
            </div>
        );
    }
}

export default Board;
```

### 2.3. Cell, Footer & Timer
`Cell` nhận giá trị được truyền vào từ `Board` và hiển thị

```js
// Cell/index.js
import React from 'react';
const Cell = (value, clickHandler) => <span onClick={clickHandler}>{value}<span>;
export default Cell;
```

Nếu các bạn sử dụng ảnh và `canvas` thì thay thẻ `span` bằng thẻ `image` với `src` là canvas được cắt từ ảnh

**Footer**
`Footer` của mình chứa các nút để thay đổi kích thước của `board` và 1 `timer` để tính giờ

```js
import React from 'react';
import Timer from './Timer';
import './footer.scss';

const Footer = (move, newGame, start, done) => {
    return (
        <div className="puzzle-footer">
            <div className="move">
                <span>Move: {move}</span>
                <Timer start={start} done={done} />
            </div>
            <span className="button" onClick={() => newGame(3)}>3x3</span>
            <span className="button" onClick={() => newGame(4)}>4x4</span>
            <span className="button" onClick={() => newGame(5)}>5x5</span>
            <span className="button" onClick={() => newGame(6)}>6x6</span>
            <span className="button" onClick={() => newGame(7)}>7x7</span>
            <span className="button" onClick={() => newGame(8)}>8x8</span>
            <span className="button" onClick={() => newGame(9)}>9x9</span>
            <span className="button" onClick={() => newGame(10)}>10x10</span>
        </div>
    );
}

export default Footer;
```

**Timer**
Tạo 1 `timer` khá là đơn giản, chúng ta sẽ bắt đầu chạy nó khi game được tạo mới, dừng lại khi hoàn thành và reset khi thay đổi kích thước `board` hoặc bắt đầu game mới.


# 3. Mở rộng
Code mình đã đẩy lên github tại địa chỉ: https://github.com/doanhpv-0200/n-puzzle (Note: code của mình code từ khá lâu rồi, nên khi chạy sẽ gặp 1 số warning nhé :3)
Các bạn có thể chơi thử tại đây: https://doanhpv-0200.github.io/n-puzzle/

Như đã nói ở trên, việc sử dụng số khá là đơn giản và nhàm chán.
Chúng ta có thể sử dụng các hình ảnh bất kì mà người dùng có thể upload lên, cắt nó ra và `shuffle` các mảnh ghép.
Các bạn có thể tham khảo ở đây: hình của đấng được cắt làm 9 mảnh và trộn lên
{@codepen: https://codepen.io/doanh/pen/PoqBOJM}