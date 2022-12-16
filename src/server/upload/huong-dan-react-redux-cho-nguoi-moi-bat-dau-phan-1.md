## Lời mởi đầu
Chào các bạn, ở thời điểm thực hiện bài viết này mình cũng là một người đang bắt đầu tìm hiểu và học với ReactJs và Redux, trong quá trình tìm hiểu đọc các tài liệu về thư viện này mình có tìm được một bài hướng dẫn khá hay nên đã quyết định chia sẻ với mọi người :D. Để xem bài viết gốc các bạn có thể click vào [đây](https://www.valentinog.com/blog/redux/#react-redux-tutorial-getting-to-know-redux-reducers).

Thông qua bài chia sẻ này ngoài mục đích chia sẻ kiến thức cho các bạn mới bắt đầu với Redux mình cũng mong muốn tự nâng cao kiến thức của bản thân, vậy nên rất mong nhận được các ý kiến đóng góp từ mọi người !! Thôi không lan man nữa, chúng ta bắt đầu nhé :D

## Hướng dẫn này dành cho ai
Hướng dẫn **React Redux** sau đây dành cho các nhà phát triển **JavaScript** có kiến thức về **ES6** và **React** . Có rất nhiều hướng dẫn về **React** trực tuyến để bạn có thể tìm hiểu, nhưng nếu bạn mới bắt đầu, tôi khuyên bạn nên đọc **[Getting Started with React](https://www.taniarascia.com/getting-started-with-react/)** của  **Tania Rascia**.

## Những điều bạn sẽ học

Hướng dẫn này chủ yếu bao gồm **Redux** với **React** vì sự kết hợp này được áp dụng rộng rãi nhưng **Redux** cũng có thể được sử dụng như một thư viện độc lập mà không cần dùng chung với một frontend framework/library nào.

Vì vậy, trong hướng dẫn sau, bạn sẽ học:
* Redux là gì
* Các blocks xây dựng của Redux
* Cách sử dụng Redux stand-alone(độc lập)
* Cách sử dụng Redux với React

## Một môi trường để phát triển React
Trước khi bắt đầu, hãy đảm bảo có sẵn một môi trường phát triển **React** .

Để tạo một ứng dụng, bạn có thể làm theo **[How to set up React, webpack, and Babel](https://www.valentinog.com/blog/webpack/#how-to-set-up-react-webpack-5-and-babel-from-scratch)**,  hoặc tốt hơn nữa, hãy sử dụng create-react-app :

```
npx create-react-app react-redux-tutorial
```
Như vậy là môi trường phát triển của bạn đã sẵn sàng.

## State là gì?
**Redux** là gì? Để trả lời câu hỏi đó, trước tiên chúng ta phải nói về **state** (trạng thái) trong các ứng dụng web **JavaScript** . Hãy xem xét một luồng người dùng đơn giản:

> với tư cách là người dùng, tôi có thể nhấp vào một nút có tên **Click** và một phương thức sẽ xuất hiện ngay sau đó.

Như vậy, ngay cả với tương tác bình thường này, cũng có một trạng thái mà chúng ta phải xử lý.

Ví dụ: chúng ta có thể mô tả trạng thái ban đầu của ứng dụng dưới dạng một đối tượng JavaScript thuần túy:

```
const state = {
  buttonClicked: 'no',
  modalOpen: 'no'
}
```
Khi người dùng thao tác click, trạng thái thay đổi và chúng ta có:
```
const state = {
  buttonClicked: 'yes',
  modalOpen: 'yes'
}
```
Vậy làm thế nào để bạn theo dõi được những thay đổi trạng thái này ? Điều gì sẽ xảy ra nếu trạng thái bị thay đổi bởi một số đoạn logic không liên quan? Có thư viện nào có thể giúp chúng tôi không?

Ngoài ra, với các bạn đã làm quen với **React** từ trước thì có lẽ thuật ngữ **state** là một khái niệm quen thuộc. Và tôi đoán có thể các bạn đã viết một component React như thế này:
```
import React, { Component } from "react";

class ExampleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [
        { title: "React Redux Tutorial for Beginners", id: 1 },
        { title: "TypeScript tutorial for beginners", id: 2 }
      ]
    };
  }

  render() {
    const { articles } = this.state;
    return <ul>{articles.map(el => <li key={el.id}>{el.title}</li>)}</ul>;
  }
}
```


Một **stateful React component** là một class trong JavaScript.

Trong một React component **state** sẽ là yếu tố quyết định việc dữ liệu sẽ được hiển thị như thế nào. Các state trong React cũng có thể thay đổi để đáp ứng với những action và event, trên thực tế các bạn có thể update state của các component với phương thức **this.setState()**

Sau khi xem những điều cơ bản, bây giờ hãy nói về **vấn đề mà Redux cố gắng giải quyết .**

## Vậy Redux giải quyết vấn đề gì?

Như các bạn đã biết trong ứng dụng React thì sate có mặt ở khắp mọi nơi. Việc một ứng dụng React có quá nhiều state dẫn đến khó khăn trong việc quản lý state, và khi ứng dụng trở lên lớn hơn thì việc này là bất khả thi.

Một giải pháp được đưa ra để giải quyết được bài toán này đó là **Redux**. **Redux** có thể giải quyết chính xác những vấn đề đó. Nó có thể không rõ ràng ngay từ đầu, nhưng **Redux** giúp cung cấp cho mỗi thành phần frontend chính xác phần state (trạng thái) mà nó cần .

Nói như vậy có lẽ đủ để các bạn hiểu tại sao nên dùng Redux rồi đúng không?  Trong phần tiếp theo, tôi sẽ bắt đầu giới thiệu các khái niệm cơ bản trong Redux.

Một lần nữa, hãy đảm bảo rằng bạn đã có sẵn một môi trường phát triển React để sử dụng .

## Làm quen với Redux store

Khi tôi bắt đầu với Redux lần đầu tiên, tôi đã gặp khá nhiều bỡ ngỡ. Có khá nhiều các thuật ngữ **action, reducer, middleware,...**. Nhưng điều khó hiểu hơn là chúng sẽ kết hợp với nhau như thế nào??? :( 

Để trả lời cho câu hỏi trên thì trong Redux bắt đầu xuất hiện một khái niệm là **store**, hiểu một cách đơn giản thì **store** trong Redux là nới quản lý và chứa tất cả các **state** của toàn bộ ứng dụng web của bạn.

Bây giờ chúng ta bắt đầu với một ví dụ minh họa đơn giản để hiểu hơn về **store** nhé. Đầu tiên hãy di chuyển tới môi trường mà chúng ta đã chuẩn bị từ trước và cài đặt Redux.

```
cd react-redux-tutorial

npm i redux --save-dev
```
Tạo một thư mục cho cửa hàng:
```
mkdir -p src/js/store
```
Tiếp theo, tạo một tệp mới, **src/js/store/ index.js** và khởi tạo store:
```
// src/js/store/index.js

import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

export default store;
```
Như bạn thấy, s**tore** là kết quả của việc gọi **createStore**  một hàm từ thư viện có sẵn trong **Redux**. **createStore** lại lấy một **reducer**  làm đối số và trong trường hợp này, tôi đã truyền vào **rootReducer** (thực tế thì nó chưa được khai báo).

Đến đây chúng ta lại thấy có một khái niệm mới xuất hiện là: **reducers**. Trong phần tiếp theo chúng ta sẽ đi tìm hiểu về **reducers**.

## Làm quen với Redux reducers

**Reducer**  là gì? **Reducer Redux** là một hàm JavaScript. Nó có 2 tham số là **state** và **action**(tôi sẽ giới thiệu về action ở phần sau)

**Reducer** là nơi tiếp nhận **action** và thay đổi **state**, làm re-render lại giao diện.Gồm 2 loại:

* Root Reducer: là Boss, quản lý tất cả reducer con
* Child Reducer: như đã biết về state, state là một object có nhiều thuộc tính, mỗi child reducer chịu trách nhiệm thay đổi 1 thuộc tính trong state.

Để dễ hiểu hơn chúng ta đi vào một ví dụ với **Reducer**

Tạo thư mục cho các Reducer
```
mkdir -p src/js/reducers
```
Sau đó, tạo một tệp mới, **src/js/Reducers/index.js** :

```
const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  return state;
};

export default rootReducer;
```

Với việc gán **state** với trạng thái được khởi tạo ban đầu, thì **Reducer** chỉ trả lại giá trị của initialState đã được khởi tạo.

Trong phần tiếp theo, chúng tôi sẽ thêm một **action** vào ví dụ và mọi thứ sẽ trở nên thú vị hơn. :D

## Làm quen với Redux actions và named constants
Redux reducers chắc chắn là một khái niệm quan trọng trong Redux, nó giống như một nơi để điều phối thay đổi các **state** của một ứng dụng, Tuy nhiên làm thế nào để một **reducers** có thể biết được khi nào sẽ generate ra state tiếp theo?

Trong **Redux** có 1 nguyên tắc là: cách duy nhất để thay đổi **state** của một component là phải gửi một thông tin đến **store**. Thông tin này được gọi là **action**, nó là 1 object gồm type mô tả những gì đã xảy ra và dữ liệu được gửi lên. Nói dễ hiểu, từ 1 component, ta muốn thay đổi **state** trên **store**, ta phải gửi **action** , là một object để miêu tả muốn làm gì.

Một ví dụ đơn giản về **action**
```
{
  type: 'ADD_ARTICLE',
  payload: { title: 'React Redux Tutorial', id: 1 }
}
```
Như bạn có thể thấy, đó là một đối tượng JavaScript có hai thuộc tính: **type** và **payload** .

Thuộc tính **type** điều khiển cách một **state** thay đổi và nó là thuộc tính bắt buộc trong 1 Redux action. Thuộc tính **payload** mô tả những gì sẽ thay đổi và có thể không bắt buộc khi bạn có dữ liệu mới để lưu trong **store**.

Tiếp tục vi dụ của chúng ta với việc thêm một **action** nhé. Tạo một thư mục cho các **action**.

```
mkdir -p src/js/actions
```
Sau đó, tạo một tệp mới, **src/js/action/index.js** :
```
// src/js/actions/index.js

export function addArticle(payload) {
  return { type: "ADD_ARTICLE", payload }
};
```
Bạn có thể nhận thấy rằng thuộc tính **type** là một string. Các chuỗi như vậy chúng ta nên khai báo dưới dạng hằng số và tạo một thư mục mới cho chúng:

```
mkdir -p src/js/constants
```

Sau đó, tạo một tệp mới, **src/js/contants/action-type.js** :
```
// src/js/constants/action-types.js

export const ADD_ARTICLE = "ADD_ARTICLE";
```
Bây giờ hãy quay lại **src/js/action/index.js** và update lại **action** của bạn:

```
// src/js/actions/index.js

import { ADD_ARTICLE } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
```

Như các bạn thấy chúng ta bắt đầu là việc với nhiều file hơn, đây chính là một trong nhưng điểm thú vị của Redux đối với nhiều lập trình viên. Bạn có thể tìm hiểu các convention  với Redux tại đây **[Redux duck](https://github.com/erikras/ducks-modular-redux)** .

## Kết luận
Như vậy trong bài viết này mình đã giới thiệu đến các khái niệm cơ bản của **Redux** cũng như các ưu điểm mà thư viện này có. Trong phần tiếp theo mình sẽ cùng các bạn tiếp tục thực hiện ví dụ đã làm ở trển để hiểu hơn về các hoạt động của **Redux**. Còn bây giờ xin chào và hẹn gặp lại :D 
Cảm ơn đã theo dõi bài viết của mình!!!!

## Nguồn tham khảo

* https://www.valentinog.com/blog/redux/#react-redux-tutorial-getting-to-know-redux-reducers
* https://medium.com/@vmnguyen1204/redux-v%C3%A0-redux-trong-reactjs-56bec2810eb3