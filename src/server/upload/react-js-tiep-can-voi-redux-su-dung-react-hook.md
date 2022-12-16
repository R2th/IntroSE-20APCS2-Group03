Trong react, việc quản lý các state qua lại giữa các component luôn là 1 vấn đề cần phải suy nghĩ khi thiết kế component. Việc sử dụng redux sẽ giúp quản lý global state của ứng dụng react, đây cũng là 1 kỹ thuật mà bất cứ lập trình viên nào muốn đi sâu vào react cần phải biết.

Mình sử dụng redux trong react hook khá nhiều, hôm nay mình sẽ chia sẻ cách tiếp cận redux trong react hook (Mình sẽ không đề cập tới class component).

## Redux là gì, tại sao phải dùng redux ?
![](https://images.viblo.asia/f652a02d-3eb0-4bd5-be38-f3ef458e1601.jpg)
### Redux là gì ?
> A Predictable State Container for JS Apps

Redux là 1 thư viện dùng quản lý các state được dùng chung cho các component trong một ứng dụng react. Khi 1 global state được tạo ra từ redux, tất cả các component trong ứng dụng đều có thể lấy và sử dụng.
### Tại sao phải dùng redux?
- Nếu chúng ta có 1 state ở parent component cần phải truyền qua > 2 lớp component, mỗi lần muốn truyền thì ta lại pass data đó dưới dạng prop, nếu truyền qua nhiều cấp thì đó là việc không ổn chút nào.

- Nếu chúng ta có các dữ liệu sẽ gây ảnh hưởng chung đến nhiều các component, mỗi lần render component lại phải thao tác lại lấy dữ liệu.

Với 1 số trường hợp tương tự như trên thì lúc này chúng ta nên suy nghĩ về việc lưu các dữ liệu đó vào redux.
![](https://images.viblo.asia/295216ab-be46-410c-9c9e-33030fc25d86.jpg)

Nó sẽ giảm thao tác truyền hay thay đổi các state qua lại giữa các component từ đó khiến đọc code dễ hiểu cũng dễ bảo trì, nâng cấp hơn.
## Các thành phần của redux
Mình sẽ giới thiệu kèm ví dụ về 1 luồng redux xử lý thay đổi dữ liệu màu sắc của 1 component ^^

Về cơ bản, redux bao gồm các thành phần: 
### Action 
Một object định nghĩa type - thứ mà reducer sẽ dựa vào để xác nhận sẽ phải làm gì với state, payload - dữ liệu mà reducer cần dùng để làm các thao tác cập nhật state (nếu có).

Để đồng nhất việc tạo ra 1 action thường sẽ không tạo trực tiếp 1 object mà sẽ tạo ra action dựa vào action creator. Đây đơn giản chỉ là 1 function nhận vào tham số và trả ra action tương ứng.


-----


Ở ví dụ này mình sẽ có 1 action là lưu color vào redux, mình truyền cho nó 1 type là SET_COLOR và payload sẽ là thông tin màu mà muốn thay đổi.

```
/**
 * Action creator tạo ra action thay đổi màu cho global state color
 * @param {*} newColor màu mới
 */
export const setColor = function (newColor) {
    return {
        type: 'SET_COLOR',
        payload: { newColor },
    };
};
```
### Reducer
Là nơi sẽ xử lý các thay đổi state như thế nào dựa vào action truyền đến với type và payload.


-----
Ở ví dụ này:

ColorReducer sẽ nhận type và newColor từ payload của action để thực hiện thay đổi color
```
const initialState = { currentColor: '#ffffff' };

/**
 * Reducer xử lý thay đổi màu
 * @param {*} state
 * @param {*} action
 * @returns
 */
export default function colorReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_COLOR':
            return { ...state, currentColor: action.payload };
        default:
            return state;
    }
}
```

Bản chất mỗii reducer là 1 function, và store nhận vào 1 reducer nhưng trong app chúng ta sẽ chia ra nhiều reducer, để gộp nhiều reducer thành dạng redux hiểu được ta sử dụng hàm combineReducers. Các reducer sẽ được gộp thành 1 trong file index trở thành rootReducer, muốn lấy state của reducer nào chỉ cần trỏ vào subReducer được khai báo trong object ở đây để lấy.  
```
import { combineReducers } from 'redux';
import colorReducer from './colorReducer';

/**
 * Gộp các reducer thành một
 */
export default combineReducers({
    color: colorReducer,
});

```

### Store
Nơi lưu giữ các state của ứng dụng mà reducer xử lý.

Redux cung cấp cho chúng ta function createStore. Chúng ta chỉ cần function này với những combined reducer chúng ta đã tạo trước đó để tạo store.

React-redux cung cấp cho ta thẻ Provider, sử dụng nó ở cao nhất của app và nó sẽ đẩy các state trong store ở tầng cao nhất của app.

-----
Ở ví dụ này mình xử lý tạo store và xử lý nó trong index.js của app
```
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./redux/reducers/index";

import { icons } from "./assets/icons";

import { Provider } from "react-redux";
import { createStore } from "redux";
const store = createStore(rootReducer);

React.icons = icons;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
export { store };
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```
### View
Là phần giao diện người dùng hay có thể hiểu nôm na là các component mà chúng ta thiết kế ra.

Với hook:
- Để nhận state từ redux ta sử dụng useSelector, tham số sẽ là 1 hàm callback được chạy mỗi khi có thay đổi state từ store và trả về giá trị được trỏ và từ store.
- Để dispatch 1 action ta sử dụng useDispatch để tạo ra 1 đối tượng dùng để dispatch 1 đối tượng action lên redux.

-----
Ở ví dụ này:
Mình tạo 1 component ColorBox nhận màu từ redux và render tương ứng.
```
import React from 'react';
import { useSelector } from 'react-redux';
import './colorBox.css';

function ColorBox(props) {
    const color = useSelector((state) => state.color.currentColor);
    console.log(color);
    return <div style={{ backgroundColor: color }} className="color-box"></div>;
}

export default ColorBox;
```

Trong app.js có 1 nút bấm thực hiện tạo màu mới và dispatch lên redux
```
import './App.css';
import ColorBox from './components/colorBox/ColorBox';
import { useDispatch } from 'react-redux';
import { setColor } from './redux/actions/colorAction';

function App() {
    const dispatch = useDispatch();

    /**
     * Xử lý thay đổi color
     */
    const handeChangeColor = function () {
        let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        dispatch(setColor(randomColor));
    };

    return (
        <div className="App">
            <button onClick={handeChangeColor}>Random color</button>
            <ColorBox />
        </div>
    );
}

export default App;
```

Thành quả của luồng redux này
![](https://images.viblo.asia/bfd5c161-86f7-4396-aa07-6e7e917b23ec.gif)

Trên đây là những chia sẻ cơ bản nhất của mình về redux trong react cũng như thao tác với redux trong react-hook. Rất mong những đóng góp của các bạn để bài viết của mình được hoàn thiện hơn.
![](https://images.viblo.asia/f666ce6f-3159-42f8-90d2-783468d93198.jpg)