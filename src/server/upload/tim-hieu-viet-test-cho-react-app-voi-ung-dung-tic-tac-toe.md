> Bài viết gốc: https://itnext.io/learning-to-write-react-tests-on-example-of-react-tic-tac-toe-app-acf7ae2b94b8

Viết test cho ứng dụng của bạn cũng được xem quan trọng như viết code cho nó vậy. Nó giúp bạn bắt được các lỗi gây phiền nhiễu, và làm cho code của bạn dễ maintain hơn, và dễ hiểu hơn.

Chúng ta chuẩn bị viết test cho ứng dụng React Tic Tac Toe sử dụng [Jest package](https://facebook.github.io/jest/docs/en/tutorial-react.html) được phát triển bởi Facebook, là framework được cho là tốt như [Enzyme testing utility](https://www.npmjs.com/package/enzyme) của AirBnB. Bạn có thể follow tài liệu hướng dẫn trên  [React document](https://reactjs.org/tutorial/tutorial.html)  để xây dựng ứng dụng đơn giản: trò chơi Tic Tac Toe, hoặc chỉ cần sử dụng code sẵn ở phía dưới bài viết. 

Trước khi bắt đầu, trong trường hợp bạn chưa có **yarn package** - quản lý các package đã cài đặt, tôi khuyên bạn cài đặt bởi command dưới đây trên Terminal:
```
npm install -g yarn
```

Bước tiếp theo, để test riêng các component, chúng ta phải chỉnh sửa cấu trúc của ứng dụng và di chuyển mỗi component vào folder riêng và đặt tên thích hợp.

Tạo folder cho component ở trong thư mục **/src** theo cấu trúc này:

![](https://images.viblo.asia/9315239b-591e-4f62-a16d-ac2d7416ec90.png)

Đừng quên là thêm export default vào các component, và các include import React và các component con được sử dụng lại ở mỗi component cha.

File index.js nên chỉ đơn giản render ra main container Game tới React DOM:

```
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Components/Game/game'
import './index.css';
// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));
```

Đảm bảo bạn đã làm theo các hướng dẫn trong tài liệu và sử dụng package **create-react-app** để tạo ứng dụng mới, bạn nên biết rằng môi trường testing với **Jest** đã bao gồm trong package này. Cài đặt **Jest** riêng sẽ không test được và xuất hiện lỗi dưới đây:

```
TypeError: environment.setup is not a function
```

Tuy nhiên Enzyme thì bạn có thể cài riêng, chạy lệnh:
```
yarn add enzyme enzyme-adapter-react-16 react-test-renderer
```

Adapter cũng sẽ cần được config, bằng việc tạo file mới tên là setUpTests.js với nội dung:

```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
```

Bước cuối cùng trước khi chúng ta bắt đầu viết các test. Với mỗi folder của component, chúng ta sẽ tạo ra các file với dựa vào tên của component và thêm `.test.` vào. Ví dụ: board.test.js, game.test.js và square.test.js. Bạn có thể tìm hiểu thêm vào quy chuẩn đặt tên file ở [đây](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#filename-conventions).

Cấu trúc folder /src sẽ như này:
![](https://images.viblo.asia/7233984e-ddae-4e9d-8a6c-92bb1a07d9bf.png)

Nào, hãy viết một test đơn giản nhất cho mỗi component để thấy nếu tất cả đều render mà không có lỗi:

```
// Game/game.test.js
import React from 'react'
import Game from './game'
import {shallow} from 'enzyme'
it('renders without crashing', () => {
  shallow(<Game />);
});
// Board/board.test.js
import React from 'react'
import Board from './board'
import {shallow} from 'enzyme'
it('renders without crashing', () => {
  shallow(<Board />);
});
// Square/square.test.js
import React from 'react'
import Square from './square'
import {shallow} from 'enzyme'
it('renders without crashing', () => {
  shallow(<Square/>);
});
```

Nhớ rằng **shallow** rendering được sử dụng để cô lập các unit test, tuy nhiên nếu bạn muốn render ra đầy đủ các test để đảm bảo các component tương thích đúng với nhau thì cần Enzyme package cung cấp [amount](http://airbnb.io/enzyme/docs/api/mount.html) sẽ làm tốt việc đó.

Chạy test: **npm test** ở Terminal. Chúng ta sẽ thấy 2 unit test cho Game và Square pass hết nhưng Board đã fail:
```
TypeError: Cannot read property '0' of undefined
```

Như phần đề cập phía trên, chúng ta đã sử dụng unit  test cô lập và Board component thì yêu cầu squares prop để pass và render chính xác. Vì vậy để componennt Board render chính xác thì cần thêm squares prop trong test:

```
import React from 'react'
import Board from './board'
import {shallow} from 'enzyme'
it('renders without crashing', () => {
  let squares = Array(9).fill(null)
  shallow(<Board squares={squares}/>);
});
```

Bây giờ thì cả 3 test sẽ pass! Nhớ rằng chúng ta sẽ cần chạy lại test mỗi lần thay đổi được tạo ra. Luôn cần chạy test **npm test**, vì thế môi trường testing jesst sẽ có thể tự động chạy với `--watch` prefix, nó sẽ lắng nghe các thay đổi và chạy các test liên quan với mỗi file thay đổi.

Bước tiếp theo cần test cho board square với mỗi lần sự kiện onCick được tạo. Khi Board render Square component và pass onClick event là prop, chúng ta sẽ cần render Board ra Square mới, vì vậy chúng ta cần sử dụng hàm **mount()** để được cung cấp bởi Enzyme thay vì dùng **shallow()**. Chúng ta sẽ phải tạo ra một "fake" sự kiện onClick từ Game đến Board bằng cách sử dụng hàm mock `jest.fn()`. Chúng ta sẽ cần **Enzyme find()** để tìm ra component để mô phỏng sự kiện click. Và, cuối cùng, chúng ta sẽ thấy onClick đã được gọi tự động và với tham số truyền vào **toBeCalledWith()** Jest.

```
import React from 'react'
import Board from './board'
import {shallow, mount} from 'enzyme'
it('renders without crashing', () => {
  let squares = Array(9).fill(null)
  shallow(<Board squares={squares}/>);
});
it('calls onClick event on click of a board square', () =>{
  let squares = Array(9).fill(null)
  const onClick = jest.fn();
  let wrapper = mount(<Board squares={squares} onClick={onClick}/>);
  wrapper.find('button.square').first().simulate('click');
  expect(onClick).toBeCalledWith(0)
})
```

Nhớ rằng chúng ta sẽ cần import hàm mount ở đầu file. Và expect 0 với mỗi lần sự kiện onClick được gọi, khi đó để mô phỏng việc click vào square đầu tiên trong board, 0 là index của mảng squares.

Kiểm tra xem Terminal đã pass hết các test chưa!

Bước tiếp theo, chúng ta sẽ cần kiểm tra xem trạng thái game đã được render chính xác chưa. Chúng ta sẽ bắt đầu với kiểm tra đơn giản với "Next Player" và sẽ chắc chắn trước khi game bắt đầu và người chơi tiếp theo là X sau khi di chuyển đầu tiên là O. Chúng ta sẽ phải mount tất cả các component lại, sau đó theom mount vào Enzyme import.

```
import React from 'react'
import Game from './game'
import {shallow, mount} from 'enzyme'
it('renders without crashing', () => {
  shallow(<Game />);
});
it('renders game status correctly', () => {
  const wrapper = mount(<Game/>)
  const firstPlayer = wrapper.find('div.game-info').children().first().text()
  expect(firstPlayer).toEqual('Next player: X')
const button = wrapper.find('button.square').first()
  button.simulate('click')
  const secondPlayer = wrapper.find('div.game-info').children().first().text()
  expect(secondPlayer).toEqual('Next player: O')
})
```

Trường hợp này, chúng ta sử dụng toEqual() được cung cấp bởi Jest để tìm ra nội dung text ở phần tử (div.game-info) là cái mà chúng ta mong đợi.

Điều cuối cùng, chúng ta phải thêm vào trang thái thắng cuộc khi game kết thúc. Chúng ta phải mô phỏng click vào các square, với square được chỉ định với Enzyme's.at(index), sẽ return ở wrapper, hiện tại là <Game/>. Khi đó chúng ta đã click lần đầu tiên vào square đầu tiên, chúng ta sẽ cần tiếp tục bước đi tiếp theo. Update test:



```
it('renders game status correctly', () => {
  const wrapper = mount(<Game/>)
  const firstPlayer = wrapper.find('div.game-info').children().first().text()
  expect(firstPlayer).toEqual('Next player: X')
const button = wrapper.find('button.square').first()
  button.simulate('click')
  const secondPlayer = wrapper.find('div.game-info').children().first().text()
  expect(secondPlayer).toEqual('Next player: O')
//player 2
  const turn2 = wrapper.find('button.square').at(1)
  turn2.simulate('click')
  //player 1
  const turn3 = wrapper.find('button.square').at(4)
  turn3.simulate('click')
  //player 2
  const turn4 = wrapper.find('button.square').at(5)
  turn4.simulate('click')
  //player 1
  const turn5 = wrapper.find('button.square').at(8)
  turn5.simulate('click')
  
  const winner = wrapper.find('div.game-info').children().first().text()
  expect(winner).toEqual('Winner: X')
})
```


Nếu bạn follow chính xác các bước thì tất cả các test của bạn sẽ pass! Hoặc có thể sai ở bước nào đó, đây là link đến [Github repo](https://github.com/nothingisfunny/tic-tac-toe-react-writing-tests), bạn có thể kiểm tra lại code cuối cùng.

Bài viết này cung cấp khái quát về làm thế nào môi trường testing Jest và Enzyme với React, và cũng khá đủ để bạn bắt đầu. Follow các tài liệu dưới đây để tìm hiểu nhiều hơn:
[Jest](https://facebook.github.io/jest/docs/en/api.html)
[Enzyme](http://airbnb.io/enzyme/docs/api/)