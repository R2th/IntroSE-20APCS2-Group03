Sudoku game là một trong những game giải đố mà tôi rất thích. Trong bài viết nay, tôi sẽ đề cập đến các bước cơ bản để xây dựng nên sudoku.

### Luật chơi 
Đặt số vào tất cả ô 9x9 để mỗi cột, mỗi hàng và mỗi nhóm 9 ô vuông 3x3 tạo thành 1 chuỗi số chứa các số từ 1 đến 9

Ta có khái niệm: peers, là các ô cùng thuộc hàng, cột hay ô vuông 3x3 

Ta sẽ có thiết kế game dự kiến:
![](https://images.viblo.asia/aadcefa3-2c70-4008-bd46-fe99e9fcaa49.png)

Trong bài viết này, ta sẽ bỏ qua cách khởi tạo game, mà sẽ đi vào tìm hiểu các bước cơ bản để thiết kế và quản lý state trong react. Ta sẽ giả sử game bắt đầu với 1 cách khởi tạo.

### Xây dựng mảng dãy số câu đố 2D
Mảng câu đố là một mảng 2 chiều 9x9. Mỗi thành phần của mảng đại diện cho 1 cell
```javascript
const puzzle = [
  [cell, cell, cell, cell, cell, cell, cell, cell, cell],
  [cell, cell, cell, cell, cell, cell, cell, cell, cell],
  [cell, cell, cell, cell, cell, cell, cell, cell, cell],
  [cell, cell, cell, cell, cell, cell, cell, cell, cell],
  ...
]

const cell = {
  value: 9,
  notes: Set([1,2,3]),
  prefilled: false
}
```

Để game hoạt động, ta cần phải:

- Xác định tiến trình của game
- biết được khi nào game kết thúc 
- còn lại bao nhiêu số cho mỗi peers, các ô trong cùng cột, hàng, ô vuông 3x3
- theo dõi khả năng mâu thuẫn trong mỗi nhóm peers
- biết được số lần của một số được sử dụng trong mỗi nhóm peers ( 1 nhóm hoàn thành chỉ khi có chính xác một lần xuất hiện cho mỗi số )

Để xác định mâu thuẫn , ta so sánh giá trị của một cell với giá trị của 24 peers (8 peers mỗi cột, 8 peers mỗi hàng hay 8 peers mỗi ô 3x3) và xác định tiến trình của game bằng cách quét toàn bộ ô 9x9. Tuy nhiên, cách tiếp cận này là không hiệu quả, rất khó về code và cả tốc độ. Để có thể đẩm bảo hiệu năng, code đẹp và dễ dàng thao tác, trạng thái game sẽ theo dõi số lần của mỗi số được sử dụng trong một nhóm peer. Ban đầu, ta sẽ sinh ra câu đố và tạo ra các đối tượng đếm cho tất cả các nhóm peers.

```javascript
import { List, fromJS } from 'immutable';
/**
 * make size 9 array of 0s
 * @returns {Array}
 */
function makeCountObject() {
  const countObj = [];
  for (let i = 0; i < 10; i += 1) countObj.push(0);
  return countObj;
}

/**
 * given a 2D array of numbers as the initial puzzle, generate the initial game state
 * @param puzzle
 * @returns {any}
 */
function makeBoard({ puzzle }) {
  // create initial count object to keep track of conflicts per number value
  const rows = Array.from(Array(9).keys()).map(() => makeCountObject());
  const columns = Array.from(Array(9).keys()).map(() => makeCountObject());
  const squares = Array.from(Array(9).keys()).map(() => makeCountObject());
  const result = puzzle.map((row, i) => (
    row.map((cell, j) => {
      if (cell) {
        rows[i][cell] += 1;
        columns[j][cell] += 1;
        squares[((Math.floor(i / 3)) * 3) + Math.floor(j / 3)][cell] += 1;
      }
      return {
        value: puzzle[i][j] > 0 ? puzzle[i][j] : null,
        prefilled: !!puzzle[i][j],
      };
    })
  ));
  return fromJS({ puzzle: result, selected: false, choices: { rows, columns, squares } });
}

class Game extends Compoent {
  constructor(props) {
    super(props);
    this.generateGame();
  }
  
  generateGame = (finalCount = 20) => {
    // get a filled puzzle generated
    const solution = makePuzzle();
    // pluck values from cells to create the game
    const { puzzle } = pluck(solution, finalCount);
    // initialize the board with choice counts
    const board = makeBoard({ puzzle });
    this.setState({ board });
  }
  
  updateBoard = (newBoard) => {
    this.setState({ board: newBoard });
  };
...
}
```

### Tạo component Cell 
![](https://cdn-images-1.medium.com/max/800/1*gezThxucXGqdldDUhkHQxA.gif)
Cell component hiện màu khác nhau để cung cấp thông tin về giá trị hiện tại, mỗi quan hệ với cell được chọn, các mâu thuẫn và các ghi chú dựa vào trạng thái hiện tại của game 

```javascript
const Cell = (props) => {
  const {
    value, onClick, isPeer, isSelected, sameValue, prefilled, notes, conflict,
  } = props;
  const backgroundColor = getBackGroundColor({
    conflict, isPeer, sameValue, isSelected,
  });
  const fontColor = getFontColor({ conflict, prefilled, value });
  return (
    <div className="cell" onClick={onClick}>
      {
        notes ?
          range(9).map(i =>
            (
              <div key={i} className="note-number">
                {notes.has(i + 1) && (i + 1)}
              </div>
            )) :
          value && value
      }
      {/* language=CSS */}
      <style jsx>{CellStyle}</style>
      <style jsx>{`
                .cell {
                    background-color: ${backgroundColor || 'initial'};
                    color: ${fontColor || 'initial'};
                }
            `}
      </style>
    </div>
  );
};

Cell.propTypes = {
  // current number value
  value: PropTypes.number,
  // cell click handler
  onClick: PropTypes.func.isRequired,
  // if the cell is a peer of the selected cell
  isPeer: PropTypes.bool.isRequired,
  // if the cell is selected by the user
  isSelected: PropTypes.bool.isRequired,
  // current cell has the same value if the user selected cell
  sameValue: PropTypes.bool.isRequired,
  // if this was prefilled as a part of the puzzle
  prefilled: PropTypes.bool.isRequired,
  // current notes taken on the cell
  notes: PropTypes.instanceOf(Set),
  // if the current cell does not satisfy the game constraint
  conflict: PropTypes.bool.isRequired,
};

Cell.defaultProps = {
  notes: null,
  value: null,
};
```

### Tính toán đầu vào của các cell component 
Cell component cần `{ value, isPeer, isSelected, sameValue, prefilled, notes, conflict }` để render các thông tin hiển thị cần thiết cho user. ` { value, notes, prefilled }` được truy cập trực tiếp từ cell của mảng đố 2D. Tuy nhiên, với các giá trị còn lại thì cần được suy ra từ trạng thái tổng thể của game dựa vào cell được chọn. Ta lấy cell được chọn trong trạng thái của game bằng cách:

```javascript
class Game extends Compoent {
...  
  getSelectedCell() {
    const { board } = this.state;
    const selected = board.get('selected');
    return selected && board.get('puzzle').getIn([selected.x, selected.y]);
  }

  selectCell = (x, y) => {
    let { board } = this.state
    board = board.set('selected', { x, y })
    this.setState({ selected: { x, y }, board})
  }
...
}
```

Với hàm `getSelectedCell()` thuộc component `Game`, ta có thể suy ra được giá trị của `{ isSelected, sameValue, isPeer, conflict}` bằng cách so sánh cell hiện tại với cell được chọn:

```javascript
export function isPeer(a, b) {
  if (!a || !b) return false;
  const squareA = ((Math.floor(a.x / 3)) * 3) + Math.floor(a.y / 3);
  const squareB = ((Math.floor(b.x / 3)) * 3) + Math.floor(b.y / 3);
  return a.x === b.x || a.y === b.y || squareA === squareB;
}

class Game extends Compoent {
...  
  isConflict(i, j) {
    const { value } = this.state.board.getIn(['puzzle', i, j]).toJSON();
    if (!value) return false;
    const rowConflict =
      this.state.board.getIn(['choices', 'rows', i, value]) > 1;
    const columnConflict =
      this.state.board.getIn(['choices', 'columns', j, value]) > 1;
    const squareConflict =
      this.state.board.getIn(['choices', 'squares',
        ((Math.floor(i / 3)) * 3) + Math.floor(j / 3), value]) > 1;
    return rowConflict || columnConflict || squareConflict;
  }

  renderCell(cell, x, y) {
    const { board } = this.state;
    const selected = this.getSelectedCell();
    const { value, prefilled, notes } = cell.toJSON();
    const conflict = this.isConflict(x, y);
    const peer = areCoordinatePeers({ x, y }, board.get('selected'));
    const sameValue = !!(selected && selected.get('value')
      && value === selected.get('value'));

    const isSelected = cell === selected;
    return (<Cell
      prefilled={prefilled}
      notes={notes}
      sameValue={sameValue}
      isSelected={isSelected}
      isPeer={peer}
      value={value}
      onClick={() => { this.selectCell(x, y); }}
      key={y}
      x={x}
      y={y}
      conflict={conflict}
    />);
  }
  
  renderPuzzle() {
    const { board } = this.state;
    return (
      <div className="puzzle">
        {board.get('puzzle').map((row, i) => (
          <div key={i} className="row">
            {
              row.map((cell, j) => this.renderCell(cell, i, j)).toArray()
            }
          </div>
        )).toArray()}
        <style jsx>{PuzzleStyle}</style>
      </div>
    );
  }
...
}  
```

### Component Number Control 
Mỗi component `number control` cho phép user thấy các số liên quan với cell được chọn.  Và bao gồm cả thanh thông báo tiến trình của một số 
![](https://cdn-images-1.medium.com/max/800/1*0ELimIv4ydXETLUIA33oig.gif)

```javascript
const NumberControl = ({ number, onClick, completionPercentage }) => (
  <div
    key={number}
    className="number"
    onClick={onClick}
  >
    <div>{number}</div>
    <CirclularProgress percent={completionPercentage} />
    <style jsx>{NumberControlStyle}</style>
  </div>
);

NumberControl.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  completionPercentage: PropTypes.number.isRequired,
};
```

### Component NumberControl cần:
- một callback sẽ cập nhật giá trị của cell được chọn khi user click 
- giá trị đã được tính toán của tiến trình của một số 

hàm `fillNumber(number)` là một hàm của component Game để thực hiện cập nhật giá trị của cell được chọn khi user click 
```javascript
import { Set } from 'immutable';
/**
 * give the coordinate update the current board with a number choice
 * @param x
 * @param y
 * @param number
 * @param fill whether to set or unset
 * @param board the immutable board given to change
 */
function updateBoardWithNumber({
  x, y, number, fill = true, board,
}) {
  let cell = board.get('puzzle').getIn([x, y]);
  // delete its notes
  cell = cell.delete('notes');
  // set or unset its value depending on `fill`
  cell = fill ? cell.set('value', number) : cell.delete('value');
  const increment = fill ? 1 : -1;
  // update the current group choices
  const rowPath = ['choices', 'rows', x, number];
  const columnPath = ['choices', 'columns', y, number];
  const squarePath = ['choices', 'squares',
    ((Math.floor(x / 3)) * 3) + Math.floor(y / 3), number];
  return board.setIn(rowPath, board.getIn(rowPath) + increment)
    .setIn(columnPath, board.getIn(columnPath) + increment)
    .setIn(squarePath, board.getIn(squarePath) + increment)
    .setIn(['puzzle', x, y], cell);
}

class Game extends Compoent {
...  
  // fill currently selected cell with number
  fillNumber = (number) => {
    let { board } = this.state;
    const selectedCell = this.getSelectedCell();
    // no-op if nothing is selected
    if (!selectedCell) return;
    const prefilled = selectedCell.get('prefilled');
    // no-op if it is refilled
    if (prefilled) return;
    const { x, y } = board.get('selected');
    const currentValue = selectedCell.get('value');
    // remove the current value and update the game state
    if (currentValue) {
      board = updateBoardWithNumber({
        x, y, number: currentValue, fill: false, board: this.state.board,
      });
    }
    // update to new number if any
    const setNumber = currentValue !== number && number;
    if (setNumber) {
      board = updateBoardWithNumber({
        x, y, number, fill: true, board,
      });
    }
    this.setState({ board });
  };

  addNumberAsNote = (number) => {
    let { board } = this.state;
    let selectedCell = this.getSelectedCell();
    // no-op if nothing is selected
    if (!selectedCell) return;
    const prefilled = selectedCell.get('prefilled');
    // no-op if it is refilled
    if (prefilled) return;
    const { x, y } = board.get('selected');
    let notes = selectedCell.get('notes') || Set();
    if (notes.has(number)) {
      notes = notes.delete(number);
    } else {
      notes = notes.add(number);
    }
    selectedCell = selectedCell.set('notes', notes);
    selectedCell = selectedCell.delete('value');
    board = board.setIn(['puzzle', x, y], selectedCell);
    this.updateBoard(board);
  };
...
} 
```

Tiến trình của 1 số được tính toán theo 2 bước:

- Với mỗi hàng, cột hay các nhóm ô 3x3, sẽ lấy ra số các nhóm đã có số đấy được điền vào 
- Lấy ra giá trị nhỏ nhất của 3 số để coi như là tiến trình cho 1 số 

```javascript
function getNumberOfGroupsAssignedForNumber(number, groups) {
  return groups.reduce((accumulator, row) =>
    accumulator + (row.get(number) > 0 ? 1 : 0), 0);
}
class Game extends Compoent {
...  
  // get the min between its completion in rows, columns and squares.
  getNumberValueCount(number) {
    const rows = this.state.board.getIn(['choices', 'rows']);
    const columns = this.state.board.getIn(['choices', 'columns']);
    const squares = this.state.board.getIn(['choices', 'squares']);
    return Math.min(
      getNumberOfGroupsAssignedForNumber(number, squares),
      Math.min(
        getNumberOfGroupsAssignedForNumber(number, rows),
        getNumberOfGroupsAssignedForNumber(number, columns),
      ),
    );
  }
...
}
```

Bây giờ, component Game đã có những giá trị cần thiết để render các component NumberControl cho các số từ 1 đến 9

```javascript
class Game extends Compoent {
...  
  renderNumberControl() {
    const selectedCell = this.getSelectedCell();
    const prefilled = selectedCell && selectedCell.get('prefilled');
    return (
      <div className="control">
        {range(9).map((i) => {
          const number = i + 1;
          // handles binding single click and double click callbacks
          const clickHandle = getClickHandler(
            () => { this.fillNumber(number); },
            () => { this.addNumberAsNote(number); },
          );
          return (
            <NumberControl
              key={number}
              number={number}
              onClick={!prefilled ? clickHandle : undefined}
              completionPercentage={this.getNumberValueCount(number) / 9}
            />);
        })}
        <style jsx>{ControlStyle}</style>
      </div>
    );
  }
...
}
```

### Các component công cụ

![](https://cdn-images-1.medium.com/max/800/1*9Q-6XfsKHvXsqB6GOKulOQ.png)

Để có thể undo hay redo một game, ta cần dựa theo lịch sử cập nhật của nó. Một mảng object được sử dụng để lưu giữ lịch sử cập nhật game của user. 

```javascript
import { List } from 'immutable';

class Game extends Compoent {
  constructor(props) {
    super(props);
    this.generateGame();
  }
  
  generateGame = (finalCount = 20) => {
    // get a filled puzzle generated
    const solution = makePuzzle();
    // pluck values from cells to create the game
    const { puzzle } = pluck(solution, finalCount);
    // initialize the board with choice counts
    const board = makeBoard({ puzzle });
    this.setState({
      board, history: List.of(board), historyOffSet: 0, solution,
    });
  }
  
  updateBoard = (newBoard) => {
    let { history } = this.state;
    const { historyOffSet } = this.state;
    // anything before current step is still in history
    history = history.slice(0, historyOffSet + 1);
    // add itself onto the history
    history = history.push(newBoard);
    // update the game
    this.setState({ board: newBoard, history, historyOffSet: history.size - 1 });
  };
...
}
```

Với mảng lịch sử và `historyOffset` hiện tại, việc cập nhật redo và undo chỉ đơn giản là cập nhật lại tăng và giảm chỉ số cho `historyOffset` của mảng.

```javascript
class Game extends Compoent {
...  
  redo = () => {
    const { history } = this.state;
    let { historyOffSet } = this.state;
    if (history.size) {
      historyOffSet = Math.min(history.size - 1, historyOffSet + 1);
      const board = history.get(historyOffSet);
      this.setState({ board, historyOffSet });
    }
  };

  undo = () => {
    const { history } = this.state;
    let { historyOffSet, board } = this.state;
    if (history.size) {
      historyOffSet = Math.max(0, historyOffSet - 1);
      board = history.get(historyOffSet);
      this.setState({ board, historyOffSet, history });
    }
  };
...
}
```

Xoá một cell chỉ đơn giản là việc cập nhật lại giá trị hiện tại thành null. 

```javascript
class Game extends Compoent {
...  
  eraseSelected = () => {
    const selectedCell = this.getSelectedCell();
    if (!selectedCell) return;
    this.fillNumber(false);
  }

  fillSelectedWithSolution = () => {
    const { board, solution } = this.state;
    const selectedCell = this.getSelectedCell();
    if (!selectedCell) return;
    const { x, y } = board.get('selected');
    this.fillNumber(solution[x][y]);
  }
...
}
```

Giờ ta đã có mọi thứ cần thiết để thực hiện render các thành phần và chuyển chúng vào bộ xử lý cập nhật 

```javascript
class Game extends Compoent {
...  
  renderActions() {
    const { history } = this.state;
    const selectedCell = this.getSelectedCell();
    const prefilled = selectedCell && selectedCell.get('prefilled');
    return (
      <div className="actions">
        <div className="action" onClick={history.size ? this.undo : null}>
          <ReloadIcon />Undo
        </div>
        <div className="action redo" onClick={history.size ? this.redo : null}>
          <ReloadIcon />Redo
        </div>
        <div className="action" onClick={!prefilled ? this.eraseSelected : null}>
          <RemoveIcon />Erase
        </div>
        <div
          className="action"
          onClick={!prefilled ?
          this.fillSelectedWithSolution : null}
        >
          <LoupeIcon />Hint
        </div>
        <style jsx>{ActionsStyle}</style>
      </div>
    );
  }
...
}
```

### Tổng kết 

Trên đây là các bước để thực hiện và thiết kế trạng thái cho các component chính của game. Game Sudoku sẽ đạt hiệu quả nhất nếu có một thiết kế trạng thái tốt. Lập kế hoạch quản lý trạng thái là bước quan trọng nhất để xây dựng ứng dụng thành công, dễ dàng để maintain về sau. 

### Tham khảo

- [Sudoku game](https://sudoku.sitianliu.com/) Sudoku web game với các tính năng thân thiện 
- [Source code game](https://github.com/goldensunliu/react-sudoku-game)
- [Các cách giải đố Sudoku](http://norvig.com/sudoku.html)
- [Bộ tạo câu đố Sudoku](https://www.ocf.berkeley.edu/~arel/sudoku/main.html) Chương trình đơn giản để tạo ra các câu đố sudoku