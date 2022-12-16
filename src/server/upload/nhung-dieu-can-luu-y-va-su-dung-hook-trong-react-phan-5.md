# V. Sử dụng useRef như thế nào cho đúng.
## 1. useRef() là gì? Cách sử dụng nó như thế nào ?

useRef hook là một function trả về một object với thuộc tính current được khởi tạo thông qua tham số truyền vào. Object được trả về này có thể mutate và sẽ tồn tại xuyên suốt vòng đời của component.


Có 2 lý do chính mà chúng ta sẽ sử dụng useRef: Truy cập DOM nodes hoặc React elements và lưu giữ một biến có thể mutate.

```
const refContainer = useRef(initialValue);
```

### Nhưng trước tiên tìm hiể useRef thì chúng ta nên tìm hiểu ref là cái gì.
Trong React, ref là một thuộc tính của một tag hay một element đại diện cho chính nó. ref cho phép chúng ta truy cập đến DOM node hoặc React element đã được mount. Trong vanila Javascript, chúng ta làm việc với DOM elements bằng cách gọi document.getElementById(). Với ref trong React chúng ta không cần phải làm vậy. Thuộc tính ref sẽ tham chiếu đến chính xác element cần dùng.

Ví dụ:
```
<input type="text" ref={textInput} />
```
ref nhận vào một biến hoặc một function. Nếu là function thì function này sẽ được chạy khi element được mount.
```
<button ref={(element) => console.log(element)}>Send</button>
```

Đây là kết quả element 
```
<button>Send</button>
```

### Truy cập DOM nodes hoặc React elements
Refs cung cấp một cách để truy cập các nút DOM hoặc các phần tử React được tạo trong phương thức kết xuất.


Nếu bạn làm việc với React được một khoảng thời gian rồi thì bạn có thể đã từng sử dụng ref cho việc này. Dưới đây là ví dụ về việc sử dụng ref trong class component:

```
import React, { useRef } from "react";
const CustomTextInput = () => {
  const textInput = useRef();
  focusTextInput = () => textInput.current.focus();
  return (
    <>
      <input type="text" ref={textInput} />
      <button onClick={focusTextInput}>Focus the text input</button>
    </>
  );
}
```

Lưu ý là trong functional component thì chúng ta sử dụng useRef thay vì sử dụng createRef. Nếu chúng ta tạo một ref bằng cách sử dụng createRef trong một functional component, React sẽ tạo mới một instance ref mỗi lần re-render thay vì giữ nguyên instance xuyên suốt các quá trình render.

### Giải thích 1 chút nhé

Nếu useState vẫn thường được nghe: thêm state vào trong function component.
```
const [value, setValue] = React.useState("init value");
```

Giả dụ tình huống là thế này, bạn làm gì đó mà nó ko liên quan đến UI, không cần **re-render** , nhưng vẫn muốn giá trị này cố định giữa các lần render? useState có thể cố định giá trị, nhưng ngặt nỗi nó sẽ trigger re-render nếu bị thay đổi

```
function usePersistentValue(initValue) {
  return React.useState({
    current: initialValue,
  })[0];
}
```
Vì chúng ta không muốn trigger re-render, nên chỉ trả về giá trị của state (phần tử đầu tiên trong mảng), không trả về hàm để cập nhập nó.

Vẫn còn chưa rõ ràng lắm nhỉ, thí dụ trong trong ứng dụng chúng ta muốn có một giá trị counter tăng lên 1 từng giây, một button đế stop việc đó.

```
function Counter() {
  const [count, setCount] = React.useState(0);

  let id;

  const clear = () => {
    window.clearInterval(id);
  };

  React.useEffect(() => {
    id = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return clear;
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={clear}>Stop</button>
    </div>
  );
}
```


Code này chạy không? Không, lý do? bạn có để ý biến id giữa các lần chạy (render) là khác nhau, nói cách khác bạn không clear được cái interval đã setup.

Bạn sẽ phải viết lại sử dụng cách usePersistentValue ở trên

```
function usePersistentValue(initialValue) {
  return React.useState({
    current: initialValue,
  })[0];
}

function Counter() {
  const [count, setCount] = React.useState(0);
  const id = usePersistentValue(null);

  const clearInterval = () => {
    window.clearInterval(id.current);
  };

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return clearInterval;
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={clearInterval}>Stop</button>
    </div>
  );
}

```

Nói có cảm giác hơi sai trái khi hack như vậy, nhưng nó chạy được.

Tuy nhiên không khuyến khích bạn tự viết như vậy, vì việc cố định giá trị giữa các lần render là nhu cầu khá bình thường nên bạn sẽ được team React làm sẵn cho một API mà xài: useRef

Vẫn là đoạn ứng dụng trên nhưng giờ chúng ta viết lại nó bằng useRef



```
function Counter() {
  const [count, setCount] = React.useState(0);
  const id = React.useRef(null);

  const clearInterval = () => {
    window.clearInterval(id.current);
  };

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return clearInterval;
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={clearInterval}>Stop</button>
    </div>
  );
}

```

Công dụng của useRef như đã đề cập, cố định dữ liệu giữa các lần re-render, truy xuất giá trị đó qua thuộc tính current

Một ứng dụng rất phổ biến của useRef là truy xuất đến DOM node. Thí dụ để set focus của input

```
function Form() {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log(name, email, password);
  };

  return (
    <React.Fragment>
      <label>
        Name:
        <input placeholder="name" type="text" ref={nameRef} />
      </label>
      <label>
        Email:
        <input placeholder="email" type="text" ref={emailRef} />
      </label>
      <label>
        Password:
        <input placeholder="password" type="text" ref={passwordRef} />
      </label>

      <hr />

      <button onClick={() => nameRef.current.focus()}>Focus Name Input</button>
      <button onClick={() => emailRef.current.focus()}>
        Focus Email Input
      </button>
      <button onClick={() => passwordRef.current.focus()}>
        Focus Password Input
      </button>

      <hr />

      <button onClick={handleSubmit}>Submit</button>
    </React.Fragment>
  );
}
```

### 2. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍
Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc . Một số nguồn :

Một bài blog rất hay về useRef: 

https://medium.com/javascript-in-plain-english/implementing-useref-in-react-732908aa1998

https://medium.com/trabe/react-useref-hook-b6c9d39e2022

https://dev.to/renatobentorocha/how-to-use-react-forwardref-1h2l