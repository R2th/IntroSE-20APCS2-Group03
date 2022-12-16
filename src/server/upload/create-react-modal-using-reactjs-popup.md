Bài viết được dịch từ nguồn: https://hackernoon.com/create-react-modal-using-reactjs-popup-m24m231v1

![](https://images.viblo.asia/3c58221f-d863-457a-8fb0-de7403ccbbe8.png)

Ngày nay, `Modals` là một trong những thành phần được sử dụng nhiều nhất trong Ứng dụng `React`, có một cách dễ dàng để tạo `React Modals`, sẽ giúp bạn nhanh chóng sử dụng các tính năng liên quan đến `Modals` trong Ứng dụng `React` sắp tới của bạn.

Trong hướng dẫn này, chúng tôi sẽ xây dựng một `React Modal` đơn giản chỉ sử dụng 22 dòng `code`.

Ảnh gif dưới đây sẽ giúp bạn hiểu những gì chúng tôi đang cố gắng xây dựng

![](https://images.viblo.asia/ebb66c66-7c55-4b55-8255-c965c6ec7340.gif)

## Create React Project

Đầu tiên, tạo một `app react` đơn giản bằng cách sử dụng `create-react-app CLI`.

```
$ npx Create-react-app SimpleModal
```

```
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Create React Modal in X line of code </h1>
      <button>Click Me</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Trong hướng dẫn này, chúng tôi sẽ sử dụng `React-popup package`, một thành phần `react-component` đơn giản và mạnh mẽ với rất nhiều lợi ích:

* Modal, Tooltip, Menu: All in one 🏋️
* Full style customization 👌
* Function as children pattern to take control over your #popup anywhere in your code. 💪
* IE Support. 🚀
* TypeScript Support 👌

`Package` này có sẵn trong kho `npm` dưới dạng `Reacjs-popup`. Nó sẽ hoạt động chính xác với tất cả `bundlers` phổ biến.

## Create React Modal

Nhập `Popup Component` từ `Reacjs-popup` và bắt đầu sử dụng nó như sau.

Thêm thuộc tính `React Button` đơn giản và đặt `modal property` thành `true`.

```
import React from "react";
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Create React Modal with 22 line of code </h1>
      <Popup modal trigger={<button>Click Me</button>}>
        Modal Content
      </Popup>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

![](https://images.viblo.asia/e40242f3-d669-4271-8cde-c132e7b506fd.gif)

## Customizing and Styling React Modal

chúng ta cần tạo tệp `Content.js` cho `Modal Content component` và thêm một số `style`

```
//content.js
import React from "react";

export default ({ close }) => (
  <div className="modal">
    <a className="close" onClick={close}>
      &times;
    </a>
    <div className="header"> Modal Title </div>
    <div className="content">
      {" "}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
      Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
      delectus doloremque, explicabo tempore dicta adipisci fugit amet
      dignissimos?
      <br />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
      commodi beatae optio voluptatum sed eius cumque, delectus saepe
      repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias.
      Vitae?
    </div>
  </div>
);
```

```
/* index.css */ 
.modal {
  font-size: 12px;
}
.modal > .header {
  width: 100%;
  border-bottom: 1px solid gray;
  font-size: 18px;
  text-align: center;
  padding: 5px;
}
.modal > .content {
  width: 100%;
  padding: 10px 5px;
}
.modal > .actions {
  margin: auto;
}
.modal > .actions {
  width: 100%;
  padding: 10px 5px;
  text-align: center;
}
.modal > .close {
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #cfcece;
}
```

Vì `Reacjs-popup` cung cấp mẫu `child` dưới dạng hàm, nên bạn có toàn quyền kiểm soát trên `Popup state`

chúng tôi thêm ví dụ của mình để sử dụng hàm dưới dạng `child` thay vì `react element` để thực hiện nút `close`.

```
//index.js
import React from "react";
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";

import Content from "./Content.js";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Create React Modal with 22 line of code </h1>
      <Popup modal trigger={<button>Click Me</button>}>
        {close => <Content close={close} />}
      </Popup>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Final Result

reactjs-popup : https://react-popup.elazizi.com/

Repo : https://github.com/yjose/create-react-modal-with-22-line-of-code

Codesandbox :https://codesandbox.io/s/create-react-modal-with-22-lines-of-code-v2u7t

![](https://images.viblo.asia/38c38b39-8964-440e-b371-82ab6f8ce586.gif)

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn