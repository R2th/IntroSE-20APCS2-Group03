## Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;Chào các bạn :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: trong bài viết lần này chúng ta sẽ cùng nhau tim hiểu về redux trong reactjs và thử làm một ứng dụng nho nhỏ để mô tả luồng của nó nhé.
## Nội dung 
Chúng ta sẽ đi qua mấy mục cơ bản

**1. Khái niệm**

**2. Thực hành trên một ứng dụng nho nhỏ**

### 1. Khái niệm

&nbsp;&nbsp;&nbsp;&nbsp;Như các bạn biết khi chúng ta học một ngôn ngữ hay học một kiến thức mới chúng ta nên học từ cái cơ bản, cái sơ khai nhất. Vậy đối với khi chúng ta học `Reactjs` cũng vậy chúng ta cũng học từ cơ bản đến nâng cao. Chúng ta học các khái niệm, cấu trúc trong nó và sau đó để hình thành nên ứng dụng được tạo bằng `Reactjs`.

&nbsp;&nbsp;&nbsp;&nbsp;Trong khi ta học ắt hắn các bạn sẽ quen với khái niệm `Component`  hoặc `state`. Ở đây mình sẽ không nhắc lại mấy thứ đó là cái gì nữa mà mình sẽ nói thẳng vấn đề đây.

&nbsp;&nbsp;&nbsp;&nbsp;Khi học `Reactjs` chúng ta muốn truyền `tham số` hoặc `function` giữa các `Compoment` chúng ta phải có 1 thằng làm cha và truyền xuống dưới các `Componert` con

![Không sử dụng redux](https://images.viblo.asia/bd3cb86a-aa25-4b97-b631-404f7c3a71b2.png)

Mô hình không sử dụng redux

-----
&nbsp;&nbsp;&nbsp;&nbsp;Như mô hình bên trên ta có thể thấy nếu data của chúng ta từ component cha (chấm xanh) mà các component khác muốn dùng thì chúng ta phải truyền tuần tự. Ví du có 3 component theo thứ tự gọi `Component A -> B -> C ` hiện tại data của chúng ta không thể giao tiếp `A -> C` nếu không qua `B` được.

&nbsp;&nbsp;&nbsp;&nbsp;Vậy vấn đề ở đây của ta là gì,  nếu là dự án nhỏ thì số lượng component là it thì việc phát triển và bảo trì chúng ta có thể làm được và việc kiểm soát sẽ làm được. Vậy với dự án vừa và lớn khi số lượng component lớn thì việc kiểm soát dữ liệu giữa các component là việc vô cùng khó khăn..Do vậy chúng ta sẽ có giải pháp là dùng redux.

![](https://images.viblo.asia/59233673-39f6-45d3-a4fc-b9f935d4dfac.png)

Mô hình sử dụng redux


-----
&nbsp;&nbsp;&nbsp;&nbsp;Như trên ta có thể thấy dữ liệu một component có thể đẩy vào một kho chứa trung gian gọi là `store` và khi dụng ta chỉ cần gọi từ `store` ra.

&nbsp;&nbsp;&nbsp;&nbsp;Qua đó ta có thể kiểm soát và sử dụng dữ liệu các component dễ dàng phải không nào.

### 2. Thực hành trên một ứng dụng nho nhỏ
Thực hành thôi nào
đầu tiên ta sẽ chạy hàng loạt lệnh để tạo project nhé
> npx create-react-app learn-redux


thêm thư viện 
> yarn add redux

> yarn add react-redux

giờ chúng ta chạy lên nhé
> yarn start

bắt đầu code thôi...chúng ta mở code ra và tạo trong thư mục một file có tên là `redux.js`

trong đó ta sẽ code thế này 
```javascript
const INITIAL_STATE = {
    name: 'Luat',
    age: 18
};
 
export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'getData':
            return {...state,oke: 'oke'}
        default:
            return state
    }
}
```

ở trên có function `reducer`

Reducers là nơi nhận những thay đổi và trả về giá trị mới

tiếp đến ta quan tâm tới một chỗ nữa đó là `index.js`
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore} from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux";

let store = createStore(reducer);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
serviceWorker.unregister();
```

&nbsp;&nbsp;&nbsp;&nbsp;Ở trên này như bạn thấy, mình có bao `app` bằng component `Provider` component này rất quan trong vì là nơi cung cấp tài nguyên cho toàn bộ ứng dụng của chúng ta.

&nbsp;&nbsp;&nbsp;&nbsp;Ở đây mình cũng khởi tạo `store` và gọi `reducer` vào để sử dụng

giờ chúng ta sẽ dùng chúng cho các component thế nào

```javascript
import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
class App extends Component {
  componentWillMount () {
    console.log(this.props.name);
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch({type:'getData'})
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    name: state.name
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
```

&nbsp;&nbsp;&nbsp;&nbsp;Đây rồi ở đây mình cần quan tâm 3 thứ đó là `connect` để kết nối component này với `store`

`mapDispatchToProps` : cứ hiểu là gọi theo dang function thực hiện các hành động theo case mình đã đặt

`mapStateToProps`: gọi state trong `store` 

tất cả các function hay state đều được gọi bằng `this.props` nhé

như ở trên mình có gọi `this.props.name` và kết quả sẽ trả về cho mình là `Luat`

## Kết Luận
&nbsp;&nbsp;&nbsp;&nbsp;Mình cũng mới học reactjs nên nhiều chỗ chưa rõ ràng, các bạn có ý kiến đóng góp hãy cmt dưới nhé..chúng ta cùng phát triển.

Qua bài này hi vọng giúp các bạn có nhìn khái quát về redux trong reactjs