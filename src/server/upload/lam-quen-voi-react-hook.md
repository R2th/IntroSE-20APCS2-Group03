Xin chào tất cả các bạn, bài viết này mình xin trình bày một chút kiến thức kiến thức cơ bản React Hook mà mình tìm hiểu được, rất mong được sự theo dõi của mọi người.
### 1) React hook là gì?

- Hooks là một bổ sung mới trong React 16.8.

- Hooks là những hàm cho phép bạn “kết nối” React state và lifecycle vào các components sử dụng hàm.

- Với Hooks bạn có thể sử dụng state và lifecycles mà không cần dùng ES6 Class.

### 2) Tại sao chúng ta cần React Hooks?

- Sau một thời gian làm việc với React thì có lẽ chúng ta sẽ bắt gặp một trong số các vấn đề sau:

    - “Wrapper hell” các component được lồng (nested) vào nhau nhiều tạo ra một DOM tree phức tạp.
    
    - Component quá lớn.
 
    - Sự rắc rối của Lifecycles trong class

- React Hooks được sinh ra với mong muốn giải quyết những vấn đề này.

### 3) Lợi ích của hook

- Khiến các component trở nên gọn nhẹ hơn

- Giảm đáng kể số lượng code, dễ tiếp cận

- Cho phép chúng ta sử dụng state ngay trong function component

### 4) Sử dụng hook

- Ví dụ

```js
import { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0);
  // Ta có useState là một Hook. Hàm useState nhận tham số initial state
  // sau đó sẽ trả về một mảng 2 phần tử:
  // phần tử đầu tiên là state hiện tại
  // thứ 2 là hàm để update state - (hàm thứ hai này giống với setState khi chúng sử dụng dạng Class)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

- useEffect - hook này có tác dụng tương tự như componentDidMount, componentDidUpdate, và componentWillUnmount trong React Class nhưng điều thú vị nó chỉ có một hàm duy nhất

- Ví dụ

```js
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [title]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- Effect này được khai báo ngay bên trong component và có quyền truy cập được các state và props. Mặc định, effect sẽ được gọi sau mỗi lần render DOM bao gồm cả lần đầu tiên.

- useEffect nhận 2 parameter, đầu tiên là một function nơi chúng ta xử lý các side effect, thứ hai là một array [title]. Chúng ta có thể hiểu array này là nơi chứa những variable(biến) (không nhất thiết là state), mà khi những variable này thay đổi thì hook useEffect này sẽ được kích hoạt.

- Khi chúng ta không bỏ array này vào hook useEffect thì nó sẽ chạy cùng với mọi lần component chạy function render

```js
useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

- Còn nếu như chúng ta chỉ muốn nó chạy 1 lần sau lần render đầu tiên thì chúng ta chỉ cần truyền vào tham số thứ hai của useEffect là một mảng rỗng:

```js
useEffect(() => {
    document.title = `You clicked ${count} times`;
}, [])
```

- Effect hook có thể trả về một hàm, và hàm này sẽ được gọi để thực hiện các tác vụ dọn dẹp, tương tự như componentWillUnmount()

```js
useEffect(() => {
  const id = setInteval(() => setCount(count + 1), 100)

  // Trả về một hàm để xóa inteval
  return () => clearInteval(id)
})
```

- Ngoài ra còn vài cái Hooks khác như:
    - useContext
    - useReducer
    - useCallback
    - useMemo
    - useRef
    ...
    
- Bạn có thể tìm chúng ở trang chủ của ReactJS [tại đây](https://reactjs.org/docs/hooks-reference.html)

### 5) Rules of Hooks

- Một số lưu ý khi làm việc với hook

    - Trong cùng một component, bạn có thể sử dụng bao nhiêu useState và useEffect tùy ý nhưng các hook này phải gọi ở trên cùng của function, không được nằm trong vòng lặp, khu vực điều kiện, hay các function con
    
    - Nó chỉ sử dụng trong functional component
    
    - Khi sử dụng useEffect để lấy dữ liệu, cần kiểm tra dữ liệu đã tồn tại hay chưa. Nếu không thì hàm sẽ gửi request liên tục

**Tổng kết**

- Hi vọng bài viết này đã đem lại cho bạn cái nhìn tổng quan về React Hooks
- Cám ơn mọi người dã theo dõi.

**Tài liệu tham khảo**
- https://reactjs.org/docs/hooks-intro.html
- https://ehkoo.com/