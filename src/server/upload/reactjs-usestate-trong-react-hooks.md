# Sơ lược về khái niệm hook
- Hook là gì? Hook là một hàm đặc biệt cho phép bạn sử dụng các tính năng của React (mà không cần phải tạo class). Ví dụ, useState là một hook cho phép bạn thêm React state vào function components.

- Khi nào tôi nên dùng hook? Nếu bạn viết một function component và nhận ra bạn cần thêm một số state vào chúng, trước đây bạn cần phải chuyển nó thành một class. Bây giờ bạn có thể sử dụng hook bên trong function component đã sẵn có. 
# Giới thiệu về useState() hook
* Là một hook cơ bản của reactjs version > 16.8.
* Giúp mình có thể dùng state trong functional component.
* Input: initialState (giá trị hoặc function)
* Output: một mảng có 2 phần tử tương ứng cho state và setState.
* Cách dùng: const [name, setName] = useState('Abc');

 Tóm lại:
 => useState cho phép chúng ta khai báo local state trong Function Component cách mà trước để chỉ dùng cho Class Component.
```
const [state, setState] = useState(initialStateValue)
```

Trong đó:
* **state**: định nghĩa tên của state nó có thể là đơn giá trị hoặc object,.. (là tham số của useState)
* **setState**: định nghĩa tên function dùng cho việc update state (là tham số của useState)
* **initialStateValue**: là giá trị ban đầu của state.

Ví dụ:
```
() => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(age + 1)

  return (
    <div>
      Current count {count}.
      <div>
        <button onClick={handleClick}>Increment Count!</button>
      </div>
    </div>
  )
}

```

### Khai báo một biến state
- Trong một class, chúng ta khởi tạo count state về 0 bằng cách cài đặt this.state về { count: 0 } bên trong constructor:
```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

Bên trong một function component, chúng ta không có this, cho nên chúng ta không thể cài đặt hoặc đọc this.state. Thay vào đó, chúng ta gọi useState Hook trực tiếp bên trong component:
```
import React, { useState } from 'react';

function Example() {
  // Khai báo một biến state mới, gọi nó là "count"
  const [count, setCount] = useState(0);

```
- Ví dụ trên khai báo một biến state gọi là count và set nó về 0. React sẽ nhớ giá trị hiện tại của nó và cung cấp cho hàm của chúng ta giá trị mới nhất giữa những lần re-render. Nếu chúng ta muốn cập nhật giá trị count hiện tại, có thể gọi hàm setCount.

- Hàm **useState** làm gì khi được gọi? Nó khai báo một “state variable” (biến state). Biến này gọi là count nhưng ta có thể gọi nó với bất kì tên nào, ví dụ gọi là banana. Đây là cách để “lưu giữ” các giá trị giữa các lần gọi hàm — useState là một cách mới để sử dụng như là cách this.state được dùng trong class. Thông thường, các biến này “biến mất” khi hàm kết thúc nhưng các biến state này được React giữ lại.

- Hàm **useState** nhận tham số gì? Tham số duy nhất được truyền vào hook useState() là state ban đầu. Không giống như khai báo với Class, state không cần thiết phải là object mà có thể là số hoặc chuỗi. Với ví dụ trên, ta chỉ cần biết người dùng click bao nhiêu lần, vì vậy ta truyền vào giá trị khởi tạo là 0. (Nếu ta muốn lưu hai giá trị khác nhau, ta sẽ gọi useState() hai lần.)

- **useState** trả về gì? Nó trả về một cặp giá trị dưới dạng mảng: state hiện tại và một hàm để update nó. Đây là lý do chúng ta viết const [count, setCount] = useState(). Cặp này tương tự như this.state.count và this.setState trong class, khác là ta dùng chúng theo cặp.


# Array destructoring syntax
- Có thể bạn để ý chúng ta dùng cặp ngoặc vuông khi khai báo biến state:
```
const [count, setCount] = useState(0);
```

Tên của các biến bên trái = không phải là một phần của React API. Bạn có thể đặt tên biến state bất kì:
```
const [fruit, setFruit] = useState('banana');
```
=> Cú pháp Javascript này được gọi là “array destructuring”. Nó nghĩa là bạn đang tạo hai biến mới fruit và setFruit. Trong đó, fruit là giá trị đầu tiên trả về bởi useState, và setFruit là giá trị thứ hai.

*Ví dụ để bạn hiểu cụ thể hơn:

```
// Cách dùng trước đây
const array = ['Học', 'Chăm ngoan'];
const a = array[0]; // Học
const b = array[1]; // Chăm ngoan
// Cách dùng array destructoring
const [a, b] = ['Học', 'Chăm ngoan'];
// a = 'Học'
// b = 'Chăm ngoan'
```

# So sánh State giữa class và functional component
### CLASS COMPONENT

```
class ColorBox extends PureComponent {
 constructor(props) {
 super(props);

     this.state = {
         shape: 'square',
         color: 'deeppink',
     };
 }
 handleBoxClick() {
     this.setState({ color: 'green' });
 };
 render() {
     const {color} = this.state;
     return (
         <div
             className="color-box"
             style={{ backgroundColor: color }}
             onClick={this.handleBoxClick}
         ></div>
     )
 }
}
```

### FUNCTIONAL COMPONENT

```
function ColorBox() {
     const [share, setShape] = useState('square');
     const [color, setColor] = useState('deeppink');
     function handleBoxClick() {
         setColor('green');
     }

     return (
         <div
         className="color-box"
         style={{ backgroundColor: color }}
         onClick={handleBoxClick}
         ></div>
     );
}
```

# Những điều lưu ý khi dùng useState()
### * useState() use REPLACING instead of MERGING.
```
// setState() in class component: MERGING
this.state = { name: 'Bạn gì đó ơi', color: 'red' };
this.setState({ color: 'green' });
// --> { name: 'Bạn gì đó ơi', color: 'green' }
```
```
// useState() in functional component: REPLACING
const [person, setPerson] = useState({ name: 'Bạn gì đó ơi', color: 'red' });
setPerson({ color: 'green' });
// --> { color: 'green' }
```
 => SOLUTION =>
 
```
// useState() in functional component: REPLACING
const [person, setPerson] = useState({ name: 'Bạn gì đó ơi', color: 'red' });
setPerson({ ...person, color: 'green' });
// --> { name: 'Bạn gì đó ơi', color: 'green' }
```

### * Initial state chỉ dùng cho lần đầu, những lần sau nó không dùng nữa.

```
function ColorBox() {
     // redundant code for sub-sequent re-render
     const initColor = getComplicatedColor();
     const [color, setColor] = useState(initColor);
     function handleBoxClick() {
     setColor('green');
 }

 return (
     <div
     className="color-box"
     style={{ backgroundColor: color }}
     onClick={handleBoxClick}
     ></div>
 );
}
```

### * Initial state callback chỉ chạy một lần.

```
function ColorBox() {
     const [color, setColor] = useState(() => {
         // You're safe here
         // This function will be called once
         const initColor = getComplicatedColor();
         return initColor;
     }));
     function handleBoxClick() {
         setColor('green');
     }
     
 return (
         <div
         className="color-box"
         style={{ backgroundColor: color }}
         onClick={handleBoxClick}
         ></div>
     );
}
```

### Các bạn nhớ nè
* useState() giúp functional component có thể dùng state.
* useState() trả về một mảng 2 phần tử [name, setName].
* useState() áp dụng **replacing** thay vì **merging** như bên class component.
* Initial state callback chỉ thực thi 1 lần đầu.

Các bạn có thể tham khảo thêm tại:

Introduction to react hooks: https://reactjs.org/docs/hooks-intro.html

React hooks APIreference: https://reactjs.org/docs/hooks-reference.html

React hooks FAQ: https://reactjs.org/docs/hooks-faq.html