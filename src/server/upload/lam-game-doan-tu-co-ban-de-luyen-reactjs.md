Để luyện tập kỹ năng es6 và ReactJS của bản thân, mình đã làm một cái game đoán từ nho nhỏ như trong ảnh : 

![](https://images.viblo.asia/29330ce7-6ec0-4bf8-b817-edcf5f1d704c.gif)


Ý tưởng của nó dựa trên game hangman (bạn có thể tìm thấy rất nhiều sourecode của game này trên google), nhưng mình đã thêm và bớt một ít tính năng mà mình thích , và tạo thành game đoán từ này .

Ở bài viết này, mình sẽ phân tích luồng hoạt động của nó cho các bạn . Sourecode của mình đặt [ở đây](https://github.com/hoangtronghieu1812/react-guess-word) :

```
https://github.com/hoangtronghieu1812/react-guess-word
```

## I, Luật chơi 

Luật chơi của game khá đơn giản . Bạn chỉ cần nắm được các quy tắc sau :

* Bạn cần phải đoán 1 cụm từ, nó liên quan đến câu hỏi mà trò chơi đặt ra .
* Bạn đoán từ bằng cách click vào từng ký tự .
* Bạn có 5 cơ hội đoán sai ký tự . Khi số lần đoán sai bằng 5 thì bạn thua cuộc. Ngược lại thì bạn thắng


## II, Các component chính
Mình chia game thành 4 component chính :

* Word : Hiển thị cụm từ và câu hỏi . 
* AttemptsLeft : Phần hiển thị số cơ hội đoán sai còn lại
* VirtualKeyboard : Bàn phím ảo để nhập từ 
* GameFinished : Hiển thị trạng thái thua hoặc thắng cuộc khi game hoàn thành .

![](https://images.viblo.asia/b5ae10c8-48cd-479d-95e0-0bac1d1ccbc3.png)

![](https://images.viblo.asia/8258a85a-0b43-446f-b87f-dedf109cf034.png)




Trong source code của mình, bạn có thể nhìn thấy cả 4 component trên trong file [Game.js ](https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/Game.js) . Chúng tương ứng với các function `_renderWord` , `AttemptsLeft`, `VirtualKeyboard`  và `_renderGameFinished` .

```javascript
import React, { Component, PropTypes } from 'react';

import AttemptsLeft from './AttemptsLeft';
import Letter from './Letter';
import Word from './Word';
import RestartButton from './RestartButton';
import VirtualKeyboard from './VirtualKeyboard';
import { GAME_WON, GAME_OVER } from './game-states';

import './Game.css';

class Game extends Component {
  render() {
    return (
      <div className="Game-content">
        <div className="Game-SideBySide">
          {this._renderInputPanel()}
        </div>
      </div>
    );
  }

  _renderInputPanel() {
    const hasAttemptsLeft = this.props.guesses > 0;
    const gameWon = this.props.gameState === GAME_WON;
    const content = hasAttemptsLeft
        ? gameWon
          ? this._renderGameFinished('Congrats! 🤗 🏆 🤗', 'Game-GameWin')
          : (
            <div className="Game-VirtualKeyboard">
            <VirtualKeyboard
              excluded={this.props.pastGuesses}
              onClick={this.props.onLetterClick} />
          </div>
          )
        : this._renderGameFinished('GAME OVER ☠️', 'Game-GameOver');

    return (
      <div className="Game-InputPanel">
        {this._renderWord()}
        <div className="Game-AttemptsLeft">
          <AttemptsLeft attempts={this.props.guesses} />
        </div>
        {content}
      </div>
    );
  }

  _renderGameFinished(message, cssClass) {
    return (
      <div className={cssClass}>
        <span>{message}</span>
        <RestartButton
          onClick={this.props.onRestartClick}
          gameState={this.props.gameState}
        />
      </div>
    )
  }

  _renderWord() {
    return (
      <div className="Game-Word">
        <div>{this.props.question}</div>
        <Word>
          {this.props.letters.map((letter, i) => {
            const letterValue = (
              this.props.gameState === GAME_OVER || letter.guessed
            ) ? letter.value : '_';

            return (
              <Letter
                key={`word-letter-${i}`}
                value={letterValue}
              />
            );
          })}
        </Word>
      </div>
    );
  }
}

Game.propTypes = {
  guesses: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  letters: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    guessed: PropTypes.bool.isRequired,
  })).isRequired,
  gameState: PropTypes.symbol.isRequired,
  pastGuesses: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLetterClick: PropTypes.func.isRequired,
  onRestartClick: PropTypes.func.isRequired,
}

export default Game;

```

Ở phần tiếp theo, mình sẽ phân tích cách từng component hoạt động trong một màn chơi .


## III, Flow hoạt động của từng component trong một màn chơi

### 1, Khởi động game
Đầu tiên, mình tạo một tập hợp data cho trò chơi trong file [random-word.js](https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/random-word.js) như sau :

```javascript
//reference: https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/random-word.js

const wordsData = [
  {
    question: 'Úc Kiều cực kiu của BlackPink là ai ?',
    word: 'Park Chae Young'
  },
  {
    question: 'Thành viên người Thái của BlackPink là ai ?',
    word: 'Lalisa Manoban'
  },
  {
    question: 'Chồng của BlackPink Rose là ai ?',
    word: 'cauphainghiencode'
  },
  {
    question: 'Vợ 2 của cauphainghiencode là ai?',
    word: 'Shin Yuna'
  },
  {
    question: 'Vũ thần soang choảnh của ITZY là ai?',
    word: 'Chaeryeong'
  },
  {
    question: 'Chúa hề 010101 của Aespa là ai ?',
    word: 'Winter'
  },
  {
    question: 'Tên thật của Aespa Karina là giề?',
    word: 'Yoo Ji Min'
  }
]

export default () => {
  const wordIndex = Math.floor(Math.random() * wordsData.length);
  const words = wordsData.map(wordObj => {
    wordObj.word = wordObj.word.replace(/ /g,'').toLowerCase();
    return wordObj;
  })

  return words[wordIndex];
}
```

Khi bắt đầu chơi game, mình sẽ truy cập vào trang web của trò chơi. Điều này tương ứng với việc render lại component `App` và chạy hàm `newGame()` : 

```javascript
//reference: https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/App.js#L17

this.state = gameFactory.newGame();
```

Hàm `newGame()` tạo ra các `state` như sau :
```javascript
//reference: https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/game-state-factory.js

import randomWord from './random-word';
import { GAME_STARTED } from './game-states';

export default {
  newGame: () => {
    const {word:gameWord, question} = randomWord();
    return {
      word: gameWord, // cụm từ cần đoán trong trò chơi
      letters: gameWord.split('').map(letter => ({ // mảng ký tự của cụm từ cần đoán
        value: letter.toLowerCase(), 
        guessed: false, //nếu người chơi đã đoán đúng ký tự thì guessed sẽ chuyển thành true
      })),
      question: question, // câu hỏi định nghĩa cho cụm từ cần đoán
      guesses: 5, // số cơ hội đoán sai ký tự
      gameState: GAME_STARTED, // trạng thái khi bắt đầu game.
      pastGuesses: [], // Mảng lưu lại các ký tự đã đoán .
    };
  }
}
```


### 2, VirtualKeyBoard
Sau khi vào game, mình bắt đầu click vào bàn phím ảo để đoán từ . Bàn phím ảo đó được thể hiện trong file [VirtualKeyboard.js](https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/VirtualKeyboard.js) .

```javascript
//reference: https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/VirtualKeyboard.js

import React, { Component, PropTypes } from 'react';
import LettersRow from './LettersRow';
import LetterBlock from './LetterBlock';
import './VirtualKeyboard.css';

class VirtualKeyboard extends Component {
  render() {
    return (
      <div className="VirtualKeyboard">
        <div key="First" className="VirtualKeyboard-FirstRow">
          {this._renderRow(VirtualKeyboard.FIRST_ROW)}
        </div>
        <div key="Second" className="VirtualKeyboard-SecondRow">
          {this._renderRow(VirtualKeyboard.SECOND_ROW)}
        </div>
        <div key="Third" className="VirtualKeyboard-ThirdRow">
          {this._renderRow(VirtualKeyboard.THIRD_ROW)}
        </div>
      </div>
    );
  }

  _renderRow(letters) {
    const children = letters
      .filter(letter => this.props.excluded.indexOf(letter) === -1)
      .map(letter => (
        <LetterBlock
          value={letter}
          onClick={this.props.onClick.bind(null, letter)}
          key={`LetterBlock-${letter}`}
        />
      ));

    return (
      <LettersRow>
        {children}
      </LettersRow>
    );
  }
}

VirtualKeyboard.propTypes = {
  onClick: PropTypes.func.isRequired,
  excluded: PropTypes.arrayOf(PropTypes.string),
};

VirtualKeyboard.defaultProps = {
  excluded: [],
};

VirtualKeyboard.FIRST_ROW = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
VirtualKeyboard.SECOND_ROW = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
VirtualKeyboard.THIRD_ROW = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export default VirtualKeyboard;
```

Việc click vào từng ký tự tương ứng với việc gọi sự kiện `onClick()` trong Component LetterBlock . Nó tương ứng với việc gọi đến hàm [onLetterClick](https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/App.js#L34) sau. 

Flow của hàm này có thể giải thích cơ bản như sau: 
```
- Case 1: Click vào ký tự nằm trong đáp án :
+) Update lại state.letters, với letter vừa đoán đúng thì update letter.guessed về true .
+) Check xem người chơi đã chiến thắng trò chơi chưa, bằng cách kiểm tra xem tất cả các phần tử trong mảng letters có letter.guessed bằng true chưa ?
Nếu người chơi đã chiến thắng thì update state.gameState => GAME_WON

Vòng lặp click vào trò chơi tiếp tục đến khi nhận được trạng thái GAME_WON hoặc GAME_OVER.

- Case 2: Click vào ký tự không nằm trong đáp án : 
+) Update lại state.guesses = guesses - 1
+) Check xem nếu guesses === 0 thì chuyển trạng thái state.gameState về GAME_OVER.

```

Chi tiết của hàm được giải thích như sau :

```javascript
onLetterClick(letter, e) {
    e.preventDefault();

    const firstIndex = this.state.word.indexOf(letter)
    if (firstIndex !== -1) {
        // Trường hợp click vào ký tự nằm trong đáp án firstIndex sẽ khác -1
      const letters = this.state.letters.map(letterObject => {
        if (letterObject.value === letter) {
          return Object.assign({}, letterObject, {
            guessed: true, //cập nhật trạng thái đã đoán đúng letter 
          });
        }

        return letterObject;
      });

      // Check xem người chơi đã chiến thắng trò chơi chưa .
      const gameWon = letters.reduce((winState, currentObject) => {
        return winState && currentObject.guessed;
      }, true);

      // Set lại state của các ký tự và trạng thái trò chơi
      this.setState((prevState, props) => {
        return {
          letters,
          pastGuesses: [letter].concat(prevState.pastGuesses),
          gameState: gameWon ? GAME_WON : GAME_STARTED,
        };
      });
    } else {
        // Click vào ký tự không nằm trong đáp án;
      this.setState((prevState, props) => {
        // update lại số lần đoán sai qua state guesses.
        const guessesLeft = prevState.guesses - 1;
        let stateUpdate = {
          guesses: guessesLeft,
        };

        // Nếu số lần đoán sai === 0 thì chuyển trạng thái về GAME_OVER
        if (guessesLeft === 0) {
          stateUpdate.gameState = GAME_OVER;
        }

        // Update mảng các ký tự đã đoán pastGuesses
        stateUpdate.pastGuesses = [letter].concat(prevState.pastGuesses);

        return stateUpdate;
      });
    }
  }
```

###  3. Khi kết thúc game
Kết thúc game chỉ có 2 trường hợp, `state.gameState` sẽ là `GAME_WON` hoặc `GAME_OVER` .
Trong 2 trường hợp đó thì hàm `_renderGameFinished` sẽ hoạt động và hiển thị component dưới đây với 2 message khác nhau :

![](https://images.viblo.asia/1ce54975-e1d9-4c88-b839-9c3e62748f55.png)

![](https://images.viblo.asia/e24890c1-a754-492e-87f8-6f4de0a2e02e.png)

Logic đó được thể hiện trong hàm [_renderInputPanel](https://github.com/hoangtronghieu1812/react-guess-word/blob/main/src/Game.js#L23-L47)  dưới đây : 

```javascript
_renderInputPanel() {
    const hasAttemptsLeft = this.props.guesses > 0;
    const gameWon = this.props.gameState === GAME_WON;
    const content = hasAttemptsLeft
        ? gameWon
          ? this._renderGameFinished('Congrats! 🤗 🏆 🤗', 'Game-GameWin') // Khi GAME_WON
          : ( // Khi vẫn còn lượt đoán guesses > 0
            <div className="Game-VirtualKeyboard">
            <VirtualKeyboard
              excluded={this.props.pastGuesses}
              onClick={this.props.onLetterClick} />
          </div>
          )
        : this._renderGameFinished('GAME OVER ☠️', 'Game-GameOver'); // Khi GAME_OVER

    return (
      <div className="Game-InputPanel">
        {this._renderWord()}
        <div className="Game-AttemptsLeft">
          <AttemptsLeft attempts={this.props.guesses} />
        </div>
        {content}
      </div>
    );
  }
```


### 4. Nút play again 

Nó là button này , với một sự kiện onclick tên là `onRestartClick` .

![](https://images.viblo.asia/9c78090e-880c-4b25-9bbb-2327c10afe43.png)


Component này cũng ko có gì đáng nói, chỉ đơn giản là click vào nút play again thì ta set lại state bằng hàm `newGame()` . Như vậy ta sẽ có một màn chơi mới :

``` javascript
  onRestartClick(e) {
    e.preventDefault();

    this.setState(gameFactory.newGame());
  }
```


Vậy là mình đã giải thích hết những điểm chính của game . 

Bản thân mình vốn là một `Ruby developer` và cũng từng làm một phiên bản đơn giản hơn của game này bằng `ruby console`. 
Việc remake game này là một cách khá vui để học một ngôn ngữ hoặc thư viện mới. Đồng thời nó giúp mình nhận ra điểm khác biệt trong cách giải quyết vấn đề của 2 ngôn ngữ .

Hy vọng bài viết này có ích với các bạn .