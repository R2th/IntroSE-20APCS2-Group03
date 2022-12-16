Trong bài viết trước mình đã giới thiệu đến các bạn về JSX trong ReactJS, các bạn xem qua bài viết ở đây https://viblo.asia/p/jsx-trong-reactjs-ORNZq6Vrl0n. Trong bài viết này mình sẽ giới thiệu đến các bạn thành phần được xem như là trái tim và linh hồn của ReactJS, đó là Component. Bắt đầu thôi nào :) 
## Component là gì?
Component là các thành phần cho phép bạn tách giao diện người dùng thành các phần độc lập, có thể tái sử dụng

Sau đây mình có ví dụ về component:
<br><br>
**Example 1:**
Sau khi setup enviroment và tạo mới ứng dụng react, các bạn vào src tạo file js mới có tên là `Myname.js` với nội dung như sau:
```js
import React, {Component} from "react";

function Introduction() {
    return <h1>Hello, My name is {name}</h1>;
}

const name = 'Huynh'; //có thể thay bằng tên của bạn :v
:v: 
class Myname extends Component{
    render() {
        return (
            <div className='myname'>
                <Introduction />
                <p>Thanks</p>
            </div>
        )
    };    
}
export default Myname;

```
Ở trong file Myname.js này chúng ta có 2 Component đó chính là `Introduction` và `Myname`. Và để tìm hiểu kỹ hơn về 2 loại này chúng ta sang phần tiếp theo đó là Function và Class Components
## Function và Class Components
Có 2 loại component chính trong React là function và class component. Sự khác biệt là rất rõ ràng. Các class component là các lớp ES6 và các `function component` là các hàm. 
### Function component
Như trong Example 1 ở phần trên ta có hình dung được như thế nào function component:
```js
function Introduction() {
    return <h1>Hello, My name is {name}</h1>;
}
```
function này là một React component hợp lệ vì dữ liệu trả về là một React element. Chúng ta gọi các component này là "function component" bởi vì chúng là các hàm javascript

Và các ưu điểm của `function component` là:
- Dễ hiểu
- Dễ test
- Có hiệu suất tốt
- Dễ debug
- Có khả năng tái sử dụng nhiều hơn

Các cách tạo một function component:

C1: Khởi tạo bằng function:
```js
function Introduction() {
    return <h1>Hello, My name is {name}</h1>;
}
```

C2: Khởi tạo bằng let:
```js
let Introduction1 = () => {
    return <h1>Hello, My name is {name}</h1>;
}
```

C3: Khởi tạo bằng const:
```js
const Introduction2 = () => {
    return <h1>Hello, My name is {name}</h1>;
}
```
### Class component
Trong `Example 1`:
```js
class Myname extends Component{
    render() {
        return (
            <div className='myname'>
                <Introduction />
                <p>Thanks</p>
            </div>
        )
    };    
}
```
Đây chính là một class component. và chúng ta đã sử dụng lại function component `Introduction`

Cấu trúc cơ bản của một `class component`:
```js
import React, { Component } from ‘react’;
class componentName extends Component {
    render() {
        return (
            <div>
 
            </div>
        );
    }
}
export default componentName;
```

Để khởi tạo một class component thì chúng ta cần phải extend class đó từ Component của React

Vậy khi đã khởi tạo các component cần thiết, làm thế nào để sử dụng chúng
## Sử dụng component
Qua ví dụ sau đây chúng ta sẽ biết rõ hơn cách sử dụng các component

Sau khi setup enviroment và tạo mới ứng dụng react, chúng ta sẽ vào xem file `index.html` nào:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <title>React App</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
  </body>
</html>
```
Điều quan tâm nhất của chúng ta bây giờ chính là `<div id="root"></div>`. Và như chúng ta thấy thì ở trong boy chỉ có mỗi thẻ div này. Yếu tố chính ở đây chính là `id="root"`, bởi vì với id này, chúng ta sẽ chỉ ra nơi mà React sẽ hiển thị tất cả các component được render. Tất cả các element và component chúng ta tạo ra sẽ ở trong thẻ div này.

Bây giờ chúng ta sẽ sửa file `index.js` như sau:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Myname from './Myname';

ReactDOM.render(<Myname />, document.getElementById('root'));
```

Ở đây:
```js
import React from 'react';
```
chỉ ra rằng chúng ta cần có React library để hoạt động

```js
import ReactDOM from 'react-dom';
```
Chúng ta cần thư viện này để chỉ ra cho ứng dụng của chúng ta rằng chúng sẽ render các component của chúng ta ở nơi đâu
```js
import Myname from './Myname';
```
Dòng này sẽ nhập một componenet có tên Myname nằm trong thư mục ./Myname. Component là cấu trúc cơ bản có chứa mã HTML mà chúng ta muốn hiển thị
```js
ReactDOM.render(<Myname />, document.getElementById('root'));
```
Đây là một trong những thành phần quan trọng nhất. Trong dòng này, phương thức `ReactDOM.render()` nhận hai đối số: một React component,và một nơi nào đó trong `index.html` nơi React component mà chúng ta vừa chỉ định sẽ hiển thị. Trong ví dụ này thì component của chúng ta sẽ được hiển thị trong file `index.html` của chúng ta và có `id` là `root`

Khi chúng ta tạo mới ứng dụng react thì có duy một component là `App`. Mình đã tạo ra một class component khác có tên là `Myname` có tên file là `Myname.js`:
```js
import React, {Component} from "react";

function Introduction() {
    return <h1>Hello, My name is {name}</h1>;
}

let Introduction1 = () => {
    return <h1>Hello, My name is {name}</h1>;
}

const Introduction2 = () => {
    return <h1>Hello, My name is {name}</h1>;
}

const name = 'Huynh'; //có thể thay bằng tên của bạn

class Myname extends Component{
    render() {
        return (
            <div className='myname'>
                <Introduction />
                <Introduction1 />
                <Introduction2 />
                <p>Thanks</p>
            </div>
        )
    };    
}
export default Myname;
```
ở trong phương thức `render()`, chúng ta sẽ chie trả về chỉ duy nhất một element, thông thường chúng ta sẽ bọc mọi thứ trong một thẻ <div>. Bên trong component file, chúng ta có thể định nghĩa một lớp nào sẽ được export mặc định ở dòng cuối cùng
```js
export default Myname;
```
Bây giờ vào thư mục project và chạy thôi nào :)
    
## Kết luận
Trong bài viết này mình đã giới thiệu về component trong React. Mong rằng bài viết sẽ giúp ích được cho bạn trong quá trình tìm hiểu React. Trong bài viết tiếp theo mình sẽ giới thiệu với các bạn `props`, `state` và `Lifecycle`
## Tài liệu tham khảo
https://reactjs.org/docs/components-and-props.html