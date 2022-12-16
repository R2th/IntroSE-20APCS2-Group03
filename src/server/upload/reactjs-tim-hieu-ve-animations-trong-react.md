![](https://images.viblo.asia/bc3a850a-9f4b-43da-8133-4cf70ea2b78f.png)


 Trong bài viết này chúng ta sẽ tìm hiểu về animation css trong React.

**Step-1: Cài đặt React CSS Transitions Group**


Đây là một React add-on phổ biến cho việc tạo CSS transitions và animations. Chúng ta sẽ cài đặt nó từ command prompt của window.

`C:\Users\username\Desktop\reactApp>npm install react-addons-css-transition-group`

**Step-2: Tạo CSS file**

Hãy tạo 1 thư mục **css** trong thư mục public và tạo 1file **style.css** trong thư mục đó. Đừng quên link nó vào head trong index.html

`<link rel = "stylesheet" type = "text/css" href = "css/style.css">`

**Step-3: Appear animation.**

Chúng ta sẽ tạo 1 React component cơ bản. Thẻ ReactCSSTransitionGroup được sử dụng để bao cái thằng component mà ta muốn nó animate. 

**App.js**

```
import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class App extends React.Component {
   render() {
      return (
         <div>
            <ReactCSSTransitionGroup transitionName = "example"
               transitionAppear = {true} transitionAppearTimeout = {500}
               >
     
               <h1>My Element...</h1>
            </ReactCSSTransitionGroup>
         </div>      
      );
   }
}
export default App;
```
.
  **transitionAppear = {true}** khởi tạo transition ngay khi component start Mount ( các bạn xem bài này để hiểu về **vòng đời của component** trong React: [Tìm hiểu về Component Life Cycle trong  React](http://5minuteshack.blogspot.com/2018/03/tim-hieu-ve-component-life-cycle-trong-reactjs.html), **transitionAppear** sẽ khởi tạo lúc *componentWillMount*).

**transitionAppearTimeout = {500}** thời gian transition appear xuất hiện.

**Index.js**

```
import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
```

**css/style.css**

```
.example-appear {
   opacity: 0.01;
}
.example-appear.example-appear-active {
   opacity: 1;
   transition: opacity 500ms ease-in;
}
```

Khi chạy project ta sẽ thấy component từ từ xuất hiện Fade in.
![](https://images.viblo.asia/0f951a47-781b-4c38-ac34-246e4a9e96c5.jpg)

Xem tiếp trên blog mình nha:
**[Step 4 - Enter and Leave Animations](https://5minuteshack.blogspot.com/2018/03/reactjs-tim-hieu-ve-animations.html)**