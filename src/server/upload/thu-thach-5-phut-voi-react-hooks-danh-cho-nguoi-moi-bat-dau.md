Xin chào mọi người, bài viết này sẽ là một thử thách của chính mình trong việc tìm hiểu React Hooks. Hãy thử xem với 5 phút mình sẽ tìm hiểu được gì về React Hooks nhé.

Trước tiên sẽ là **useState**, một trong số các hooks phổ biến trong React Hooks.

### **1. useState**

Hãy bắt đầu bằng 1 functional component nhé

```html
import React from 'react';

function App() {
  return (
    <div>
      <h1>0</h1>
      <button>Change!</button>
    </div>
  );
}
```

Như các bạn thấy, chưa có gì mới ở đây. Mình chỉ mới hiển thị 1 đoạn text và 1 button.

Bây giờ hãy import **useState**, để tìm hiểu làm thế nào để quản lý state trong functional component.

Vì hooks này là một function, hãy thử `console.log` nó xem như thế nào nhé.

```html
import React, { useState } from 'react';

function App() {
  const value = useState();
  console.log(value);

  return (
    <div>
      <h1>0</h1>
      <button>Change!</button>
    </div>
  );
}
```

Vâng, đây là kết quả mình nhận được, một `array`

```javascript
> [null, ƒ()]
```

Thử truyền một đối số vào **useState** xem nhé

```javascript
const value = useState(true);
```

Kết quả nhận được là một `array` với phần tử đầu tiên là đối số mình truyền ở trên

```javascript
> [true, ƒ()]
```

Bây giờ, trong `component`, mình có thể truy cập `state` ở giá trị [0] và hiển thị nó trong <h1> thay vì hardcoded.
    
```html
import React, { useState } from 'react';

function App() {
  const value = useState(0);
  console.log(value); // [0, ƒ()]

  return (
    <div>
      <h1>{value[0]}</h1>
      <button>Change!</button>
    </div>
  );
}
```
    
 Thử viết ngắn gọn bằng cách sử dụng array destructuring ( nó cũng tương tự như object destructuring, hãy xem ví dụ dưới đây của mình nhé)
    
```javascript
const person = {
  name: 'Joe',
  age: 42
};

// creates 2 const values from person object
const { name, age } = person;
console.log(name); // 'Joe'
console.log(age); // 42
```

Kết quả sau khi sử dụng array destructuring trong **useState()** hooks.
    
```html
import React, { useState } from 'react';

function App() {
  // đơn giản quá đúng không nào
  const [count] = useState(0);  

  return (
    <div>
      <h1>{count}</h1>
      <button>Change!</button>
    </div>
  );
}
```
    
Vậy là mình đã khởi tạo giá trị đầu tiên `state`. Câu hỏi tiếp theo là làm cách nào để thay đổi giá trị `state` bằng hooks?
    
Hãy nhớ rằng **useState()** hook trả về một array có 2 đầu vào. Đầu vào thứ 2 là một function nó dùng để cập nhật giá trị `state`.
    
```javascript
const [count, setCount] = useState(0);
```

Tất nhiên, bạn có thể đặt tên tuỳ theo ý muốn của mình, nhưng theo quy ước, nó thường được gọi với tiền tố "set-", và sau đó bất kỳ tên biến nào mà bạn muốn cập nhật.
    
Thật đơn giản để sử dụng function này. Chỉ cần gọi nó và truyền qua giá trị mới mà bạn muốn trạng thái đó có! Hoặc, giống như `this.setState` trong một class component, bạn có thể truyền một function nhận trạng thái cũ và trả về trạng thái mới. Nguyên tắc nhỏ: làm điều này bất cứ lúc nào bạn cần dựa vào `state` trong quá khứ để xác định state mới.

Thử truyền nó thông qua sự kiên `onClick` bằng `function setCount` xem nhé.
 
```html
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Change!
      </button>
    </div>
  );
}
```
    
Viết gọn lại chút nhé:
 
 ```javascript
  function App() {
  const [count, setCount] = useState(0);

  function change() {
    setCount(prevCount => prevCount + 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={change}>Change!</button>
    </div>
  );
}
  ```
    
Thử chạy lên xem thành quả nhé mọi người.
 Okay, vậy là xong hooks đầu tiên, tiếp theo mình sẽ tìm hiểu **useEffect** nhé.
    
###  **2. useEffect**
    
 Nếu như trước đây mình cần phải biết về tất cả các lifecycle methods, với **useEffect** hooks đã đơn giản hóa tình huống này.
    
 Cách import cũng tương tự với **useState**
    
 ```javascript
  import React, { useState, useEffect } from 'react';  
  ```
    
 Để **useEffect** làm một cái gì đó, hãy truyền cho nó một anonymous function. Bất cứ khi nào React re-render component, nó sẽ chạy function mà chúng ta truyền vào **useEffect**.
    
 ```javascript
 useEffect(() => {
  /* any update can happen here */
});
  ```
    
 Đây là tất cả code cho đến hiện tại.
 {@embed: https://codepen.io/quynhtnn/pen/yLygaeP}
    

Về cơ bản, **useEffect** tương tự `componentDidMount` nếu đối số thứ 2 của **useEffect** rỗng ( tức là nó chỉ chạy 1 lần sau khi render), tương tự `componentDidUpdate` nếu chúng ta truyền biến vào đối số thứ 2 ( hàm này sẽ re-render khi mà biến ở đối số thứ 2 thay đổi).  Và nếu trong **useEffect** chúng ta return một function thì nó sẽ tương đương với `componentWillUnMount` ( hãy xem đoạn code dưới để hiểu rõ hơn nhé).

```javascript
useEffect(() => {
  // almost same as componentDidMount
  console.log('mounted!');
  return () => {
    // almost same as componentWillUnmount
    console.log('unmount!');
  };
}, []);
```
### **3. Tổng kết**

Ngoài **useState**, **useEffect** còn có nhiều hooks khác (useReducer, useContext, useMemo, useCallback, useRef...) hy vọng với bài viết của mình sẽ là tiền đề giúp cho việc tìm hiểu các hooks khác trong React Hooks trở nên đơn giản hơn.

Cảm ơn mọi người đã đọc chia sẻ của mình.