# Before We Start the Tutorial
Hôm nay mình sẽ hướng dẫn các bạn build một app game nhỏ. Những kỹ năng mà các bạn học được qua bài tutorial này chính là những nền tảng để xây dựng bất cứ một ứng dụng React Native nào, và thành thục những kĩ năng này sẽ giúp chúng ta có được một sự thấu hiểu sâu sắc hơn về React Native.
<br>
<br>
Bài tutorial được chia ra thành các section như sau:
* `Setup for the Tutorial` sẽ cho chúng ta **điểm xuất phát** để thực hiện theo bài tutorial này.
* `Overview` sẽ dạy cho chúng ta **những điều căn bản** của React Native: components, props, và state.
* `Completing the Game` sẽ dạy cho chúng ta **những kỹ năng thường dùng nhất** trong React Native development.
* `Adding Time Travel` sẽ cho chúng ta **một cái nhìn sâu sắc hơn** về những thế mạnh đặc biệt của React Native.
<br>

Bạn không nhất thiết phải hoàn thành toàn bộ các section thì mới có thể thu được giá trị từ bài tutorial này.
<br>
<br>
Hãy cứ thử hoàn thành càng nhiều càng tốt — dù chỉ là một hoặc hai phần.

### Chúng ta sẽ build cái gì ?
Trong bài viết này, mình sẽ hướng dẫn các bạn build một app game tic-tac-toe với React Native.
<br>
<br>
Các bạn có thể xem thứ mà chúng ta sẽ build ở đây: [**`Tic-Tac-Toe Game`**](https://codepen.io/gaearon/pen/gWWZgR?editors=0010) (các bạn chỉ cần chú ý đến màn hình game thôi nhé, phần code là React nên hãy lờ nó đi).
<br>
<br>
Giờ thì hãy chơi thử game một vài lần trước khi tiếp tục. Các bạn có thể thấy một tính năng của game đó là một danh sách ở phía bên cạnh bàn cờ. Danh sách này cho chúng ta thấy được lịch sử của tất cả các nước đi đã diễn ra trong game, và nó được cập nhật liên tục khi chơi.
<br>
<br>
Bạn có thể đóng game mẫu lại khi đã nắm được các tính năng của nó. Chúng ta sẽ bắt đầu build từ một mẫu đơn giản hơn trong tutorial này. Điều tiếp theo chúng ta sẽ làm là thiết lập môi trường để có thể build game.

### Những kiến thức cần chuẩn bị trước
Mình sẽ coi như các bạn đã có chút hiểu biết cơ bản về HTML và JavaScript, ngoài ra bạn có thể dễ dàng follow theo tutorial này cho dù bạn có sử dụng một ngôn ngữ lập trình khác. Mình cũng sẽ coi như các bạn đã quen với các khái niệm lập trình như là functions, objects, arrays và classes.
<br>
<br>
Nếu như bạn cần xem lại về JavaScript thì hãy thử đọc [guide này](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Chú ý rằng trong tutorial này mình cũng sẽ dử dụng một vài tính năng từ ES6 như là [`arrow functions`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [`classes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), và [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).

<br>

-----

# Setup for the Tutorial
Mình sẽ setup trên môi trường Ubuntu và dùng Android Studio để tạo máy ảo.
Đầu tiên hay tạo một project React Native mới:
```
react-native init xoxoxo
```

Bật giả lập lên và chạy app:
```
cd xoxoxo
react-native run-android
```
<br>

-----

# Overview
Vậy là chúng ta đã setup xong, giờ thì hãy thử nhìn một cách tổng quan về React Native

### React Native là gì ?
React Native cũng tương tự như React, tuy nhiên nó sử dụng các native component thay vì các web component để build app. Vậy nên để hiểu được cấu trúc cơ bản của một React Native app, bạn cần hiểu một vài khái niệm cơ bản về React, như là JSX, components, `state`, `props`.  Nếu bạn đã biết React, bạn vẫn cần phải tìm hiểu thêm một vài thứ về React Native, ví dụ như là các native component. Tuy nhiên, bài viết này hướng tới mọi độc giả dù cho người đó đã có kinh nghiệm với React hay chưa.
<br>
<br>
Hãy xem file App.js trong app mà chúng ta vừa build phía trên:
```javascript:App.js
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

...

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

...
```

Có thể bạn sẽ thấy một vài chỗ trong đoạn code trên trông không giống JavaScript. Tuy nhiên bạn đừng lo lắng về điều đó.
<br>
<br>
Đầu tiên, ES2015 (hay còn gọi là ES6) là một loạt các cải tiến của JavaScript mà giờ đã trở thành một phần của tiêu chuẩn chính thức, tuy nhiên lại chưa được hỗ trợ bởi mọi trình duyệt nên nó ít được sử dụng trong việc phát triển web. React Native được phát hành với sự hỗ trợ ES2015 nên bạn có thể sử dụng nó mà không phải lo lắng vế vấn đề tương thích. `import`, `from`, `class`, và `extends` ở phía trên đều là các tính năng của ES2015. Nếu bạn chưa quen với ES2015 thì có thể đọc overview về các tính năng trong ES2015 tại [đây](https://babeljs.io/docs/en/learn/).
<br>
<br>
Điều khác lạ nữa ở đoạn code phía trên là `<View><Text>Welcome to React Native!</Text></View>`. Đây chính là JSX - một cú pháp dùng để nhúng XML vào trong JavaScript. Có nhiều framework sử dụng những template language đặc biệt giúp bạn có thể nhúng code vào trong ngôn ngữ markup. Trong React thì lại ngược lại, JSX cho phép bạn viết ngôn ngữ markup vào bên trong code. Nó trông giống HTML của web, ngoại trừ việc thay vì những thứ như `<div>` hay `<span>` thì bạn lại dùng các component của React Native. Trong đoạn code của chúng ta thì `<Text>` chính là một component tích hợp sẵn dùng để hiển thị văn bản và `<View>` thì giống như `<div>` hoặc `<span>`.
<br>
<br>
Vậy là đoạn code phía trên đã định nghĩa `App`, một `Component` mới. Khi phát triển một React Native app, bạn sẽ thấy mình tạo ra rất nhiều component mới. Bất kì thứ gì bạn nhìn thấy trên màn hình đều có thể coi như là một component. Một component có thể rất đơn giản - thứ duy nhất nó cần là một hàm `render` trả về JSX để render ra.

### Sơ bộ cấu trúc code ban đầu
Đầu tiên chúng ta sẽ xác định trước một vài component cần tạo để làm nên móng của app. Ban đầu chúng ta sẽ cần những component sau:
* Square
* Board
* Game

`<Square>` render một `<TouchableNativeFeedback>` và `<Board>` render 9 ô vuông (9 `<Square>`). `<Game>` render bàn cờ với các giá trị placeholder mà chúng ta sẽ thay đổi sau này. Hiện giờ sẽ chưa có component tương tác nào cả.

Tạo mới thư mục 'components' trong thư mục gốc và tạo thêm trong đó 2 file: `Square.js` và `Board.js`.
```javascript:components/Square.js
import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import styles from '../styles';

const Square = () => (
  <TouchableNativeFeedback>
    <View style={styles.square}>
      {/* TODO */}
    </View>
  </TouchableNativeFeedback>
);

export default Square;
```

```javascript:components/Board.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';
import Square from './Square';

const renderSquare = i => <Square />;

const Board = () => {
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
};

export default Board;
```

Sửa lại `App.js` ở thư mục gốc:
```javascript:App.js
import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Board from './components/Board';

export default class Game {
  render() {
    return (
      <View style={styles.game}>
        <View style={styles.gameBoard}>
          <Board />
        </View>
        <View style={styles.gameInfo}>
          <View>{/* status */}</View>
          {/* TODO */}
        </View>
      </View>
    );
  }
}
```

Tạo mới file styles.js trong thư mục gốc:
```javascript:styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  square: {
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    height: 50,
    width: 50,
  },
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  status: {
    paddingBottom: 5,
  },
  boardRow: {
    flexDirection: 'row',
    borderRightWidth: 0.5,
    height: 50,
    width: 150,
  },
  game: {},
  gameBoard: {},
  gameInfo: {},
});

export default styles;
```

Màn hình của chúng ta giờ sẽ trông như sau:
![](https://images.viblo.asia/27b9bb87-5f57-42e6-b5a2-d07ddf634061.png)

### Truyền dữ liệu thông qua Props
Để "làm nóng người", hãy thử truyền dữ liệu từ component `<Board>` tới component `<Square>`.
<br>
<br>
Các bạn nên tự tay gõ code thay vì copy/paste khi follow theo tutorial. Làm như vậy sẽ giúp các bạn nhớ tốt và hiểu sâu hơn.
<br>
<br>
Trong method `renderSquare` của `<Board>`, hãy thay đổi code như sau để truyền một prop tên là `value` vào `<Square>`
```javascript:components/Board.js
...

const renderSquare = i => <Square value={i} />;

...
```

Thay đổi `<Square>` để show giá trị truyền vào
```javascript:components/Square.js
import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native'; // modified
import styles from '../styles';

const Square = (props) => {                                         // modified
  const { value } = props;                                          // added

  return (                                                          // added
    <TouchableNativeFeedback>
      <View style={styles.square}>
        <Text style={styles.squareText}>{value}</Text>              // added
      </View>
    </TouchableNativeFeedback>
  );                                                                // added
};                                                                  // modified

export default Square;
```

Style lại một chút:
```javascript:styles.js
export default StyleSheet.create({
  square: {
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    height: 50,
    width: 50,
    justifyContent: 'center', // added
    alignItems: 'center',     // added
  },
  squareText: {               // added
    fontWeight: 'bold',       // added
    fontSize: 40,             // added
  },                          // added
  
...
```

Giờ thì bạn sẽ thấy một số trong mỗi ô của bàn cờ.
![](https://images.viblo.asia/0261a0f3-d0d3-4776-9ecd-62874749319b.png)

Congratulations! Vậy là bạn vừa mới truyền thành công một prop từ component cha `<Board>` tới component con `<Square>`. Truyền props chính là cách mà thông tin chạy từ cha đến con trong React Native app.

### Tạo ra một Component có tính tương tác
Giờ chúng ta cần khiến cho ô trên bàn cờ hiển thị một dấu "X" khi ấn vào. Đầu tiên, hãy thay đổi `<TouchableNativeFeedback>` được trả về từ component `<Square>` như sau:
```javascript:components/Square.js
import React from 'react';
import { TouchableNativeFeedback, View, Text, Alert } from 'react-native';    // modified
import styles from '../styles';

const Square = (props) => {
  const { value } = props;

  return (
    <TouchableNativeFeedback onPress={function () { Alert.alert('press'); }}> // modified
      <View style={styles.square}>
        <Text style={styles.squareText}>{value}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Square;
```

Nếu bạn ấn vào một ô bất kì bạn sẽ thấy một modal alert hiện ra.

> **Note**
> 
> Để không phải gõ nhiều và để tránh [`sự khó hiểu khi dùng this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/), chúng ta sẽ sử dụng [`cú pháp arrow function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) cho các event handler từ giờ trở đi:
> ```javascript:components/Square.js
> ...
> 
> const Square = (props) => {
>   const { value } = props;
> 
>   return (
>     <TouchableNativeFeedback onPress={() => Alert.alert('press')}> // modified
>       <View style={styles.square}>
>         <Text style={styles.squareText}>{value}</Text>
>       </View>
>     </TouchableNativeFeedback>
>   );
> };
> 
> export default Square;
> ```
> Hãy chú ý tới `onPress={() => Alert.alert('press')}`, chúng ta đã truyền prop `onPress` với *một hàm*. React Native sẽ chỉ gọi hàm này sau khi ấn vào ô. Thiếu `() =>` và viết thành `onPress={Alert.alert('press')}` là một lỗi thường gặp, khi đó alert sẽ bắn ra mỗi lần component được render lại.
<br>

Bước tiếp theo, chúng ta cần khiến cho component `<Square>` "nhớ" rằng nó đã được ấn vầ điền một dấu "X" vào đó. Để "nhớ" thứ gì đó thì component sử dụng **state**.
<br>
<br>
React Native component có state bằng cách đặt `this.state` ở trong constructor của chúng. `this.state` được coi là private với React Native component mà nó được định nghĩa trong đó. Giờ thì hãy lưu giá trị hiện tại của ô cờ trong `this.state` và thay đổi nó khi ô cờ được ấn vào.
<br>
<br>
Đầu tiên, chúng ta sẽ thêm một constructor vào class để khởi tạo state, chúng ta cũng sẽ thay đổi kiểu component từ stateless thành kiểu bình thường để có thể sử dụng state:

```javascript:components/Square.js
import React from 'react';
import { TouchableNativeFeedback, View, Text, Alert } from 'react-native';
import styles from '../styles';

class Square extends React.Component { // modified
  constructor(props) {                 // added
    super(props);                      // added
    this.state = {                     // added
      value: null,                     // added
    };                                 // added
  }                                    // added

  render() {                           // added
    const { value } = props;

    return (
      <TouchableNativeFeedback onPress={() => Alert.alert('press')}>
        <View style={styles.square}>
          <Text style={styles.squareText}>{value}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }                                    // added
}

export default Square;
```
<br>

> **Note**
> 
> Trong [`Javascript class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), bạn luôn cần phải gọi `super` khi định nghĩa constructor của một subclass. Tất cả các class của React Native component mà có `constructor` đều nên mở đầu constractor đó bằng việc gọi `super(props)`.

Tiếp theo chúng ta sẽ thay đổi method `render` của `<Square>` để hiển thị giá trị của state hiện tại khi ấn vào ô:
* Thay thế `const { value } = props;` bằng `const { value } = this.state;` trong component `<Text>`.
* Thay thế event handler `onpress={...}` bằng `onPress={() => this.setState({value: 'X'})}`.

Sau khi thay đổi, hàm `render` của `<Square>` sẽ trông như sau:

```javascript:components/Square.js
import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';           // modified
import styles from '../styles';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    const { value } = this.state;                                             // modified

    return (
      <TouchableNativeFeedback onPress={() => this.setState({ value: 'X' })}> // modified
        <View style={styles.square}>
          <Text style={styles.squareText}>{value}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default Square;
```

Bằng việc gọi `this.setState` từ handler `onPress` trong hàm `render` của `<Square>`, chúng ta sẽ khiến React Native render lại `<Square>` mỗi khi ta ấn vào `<TouchableNativeFeedback>`. Sau khi update, `{value}` của `<Square>` sẽ là `'X'`, do đó chúng ta sẽ thấy `X` hiển thị trên bàn cờ. Nếu bạn ấn vào bất kì một ô nào trên bàn cờ, một dấu `X` sẽ hiện ra ở ô đó.
<br>
<br>
Khi bạn gọi `setState` trong một component, React Native cũng sẽ tự động cập nhật các component con bên trong nó.

<br>

-----

Link to [**Part 2**](https://viblo.asia/p/react-native-tic-tac-toe-tutorial-part-23-4P8563AAKY3).

*Bài viết dựa theo Tutorial về React: https://reactjs.org/tutorial/tutorial.html*