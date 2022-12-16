Chúng ta đều biết rằng React có hai loại component là Function Component và Class Component. Trong đó chỉ có Class Component là có state và lifecycle, còn về Function nó là stateless tức là không có state nó chỉ có thể hiển thị dữ liệu được nhận vào thông qua params và nó cũng chẳng có lifecycle tức là các component sẽ không có thay đổi, nên nó chỉ có thể làm UI chứ không thể tạo các thao tác UX. Tuy nhiên đấy chỉ là trước khi version React 16 được cập nhật. Từ đấy về sau Class Component ngày càng mất dần chỗ đứng và vị thế vốn có, nó đã bị Function hất vâng khỏi ngôi vương nhờ vào thanh bảo kiếm mang tên Hooks.


![Comparison](https://techdoma.in/images/blog/functional-class-components-difference.png)

Như trên hình ta thấy chỉ với hooks, function có thể bù đắp mọi khuyết điểm so với class. Vậy hooks là gì mà thần thánh thế ?

Để hiểu cách mà hooks làm với function ta buộc phải đi sâu vào từng vấn đề một. Trước hết là tìm hiểu xem nó đã giải quyết bài toán **stateless** như thế nào?

# State - useState

Như đã nói ở trên, bản thân các function không tồn tại state chúng chỉ có thể nhận dữ liệu từ params. Tức là chúng chỉ có được props từ component cha truyền vào cho, và dĩ nhiên là props không thể thay đổi ở phía component con, nên các function component sẽ gần như là cố định. Để khắc phục điều đó ta sử dụng hooks `useState`. Cú pháp của nó như sau :

```jsx
const [state, setState] = useState(initialStateValue)
```

trong đó :
- state: đây là tên state của component.
- setState: đây là hàm gán giá trị cho state đó. Một điều lưu ý là khi thay đổi state trong function ta không thay đổi một cách trực tiếp mà phải thông qua setState. Lý do cho việc này là để theo dõi các state và re-render khi có thay đổi, nếu thay đổi trực tiếp thì nó sẽ không được re-render.
- initialStateValue: đây là giá trị ban đầu cho các state. Nó có thể bằng `0`, bằng `""` hay là bằng `null`.

### Cách tạo state với useState

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(count - 1);
  };
  
  return (
    <p>{count}</p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  )
}
```

![Demo](https://media.giphy.com/media/ZErH80Do5MNXMwGM0y/giphy.gif)

Như vậy là đã xong việc với phần state giờ ta sẽ sang phần phức tạp hơn.

### Lifecycle - useEffect.

So với thay đổi state thì lifecycle là một vấn đề phức tạp hơn. Nó là cả một chu trình từ việc xuất hiện trong DOM, được re-render và cả cách xoá nó khỏi DOM. Ở class component, lifecycle có thể được mô tả đơn giản qua ảnh dưới đây :

![Lifecycle](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/ogimage.png)
*Trong ảnh trên đấy là 3 phương thức cơ bản trong lifecycle, ngoài ra còn rất nhiều phương thức hỗ trợ khác. Nhưng trước mắt ta sẽ tìm hiểu cách hooks thay thế 3 phương thức này đã*

Để có thể thay thế cả 3 phương thức, hooks sử dụng **useEffect**. Cú pháp của nó như sau :

```jsx
useEffect(() => {
    // Something
    return () => {
        // Something
    }
},[]);
```
## Luôn luôn được gọi
Nếu chúng ta sử dụng `useEffect` như một hàm thông thường, không truyền bất kỳ tham số hay mảng dependencies nào, thì mặc định các lệnh trong hàm sẽ được thực hiện mỗi khi component được re-render.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`You clicked ${count} times`);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

Kết quả là :

![useEffect1](https://ren0503.github.io/assets/img/react/useEffect1.png)

## Mounting
Đây là quá trình component được khởi tạo và render lần đầu tiên, nó có phương thức chính là `componentDidMount`. Sau khi component xuất hiện ở DOM, những câu lệnh bên trong `componentDidMount` sẽ được thực hiện, nhưng chỉ một lần duy nhất. Để làm được như vậy với useEffect, ta cần truyền một mảng dependencies rỗng vào.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('I run only on the first render: mount.');
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

Như vậy dù có click bao nhiêu lần, lệnh console cũng chỉ hiển thị một lần duy nhất :

![useEffect2](https://ren0503.github.io/assets/img/react/useEffect2.png)

## Updating

Trong trường hợp ta muốn thay đổi dữ liệu khi re-render, song chỉ giới hạn trong một vài phần tử trong component đó thì ta chỉ cần truyền vào một mảng dependencies các phần tử đấy, như thế này :

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  const [countSub, setCountSub] = useState(0);

  useEffect(() => {
    console.log(`You clicked ${count} times`);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>You clicked {countSub} times</p>
      <button onClick={() => setCountSub(countSub + 1)}>Click your</button>
    </div>
  );
};
```

Kết quả là nó chỉ hiển thị câu lệnh mỗi khi button `Click me` thay đổi, còn phía button `Click your` có thay đổi bao nhiêu lần nó cũng không ảnh hưởng.

![useEffect3](https://ren0503.github.io/assets/img/react/useEffect3.png)

## Unmounting

Như vậy ta đã hiểu về cách **useEffect** thay thế `componentDidMount()` và `componentDidUpdate()` vậy còn `componentWillUnMount()` thì sao. Đât là lúc mà ta sử dụng đầy đủ cú pháp `useEffect` với hàm *return* mà nãy giờ vẫn chưa nhắc tới.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`You clicked ${count} times`);
    return(() => console.log('cleanup'))
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

Như vậy là mỗi khi component sắp bị unmount nó sẽ báo console giống như `componentWillUnMount()`.

![useEffect4](https://ren0503.github.io/assets/img/react/useEffect4.png)

# Ref - useRef.

Trong các thao tác với DOM, có những lúc ta bắt buộc phải sử dụng thuộc tính ref như là kích hoạt bên thứ 3, hình ảnh động hay các kiểm soát các API DOM. Tuy nhiên vì các function không có render, chúng sẽ luôn trả về một jsx. Bất cứ khi nào có thay đổi về state thì tất cả các đoạn lệnh trong function component sẽ được thực thi. Đồng nghĩa với việc nếu chúng ta có một biến đối tượng bên trong function component thì với mỗi lần re-render, chúng sẽ được khởi tạo lại với giá trị mặc định. Ví dụ :

```jsx
import React, {useState} from 'react';

function Example() {
  console.log("fuction called....");
  let counter = 0;
  let [myState, setMyState] = useState("A");
  
  let updateState = () => {
    counter++;
    setMyState(myState + "-u-");
    console.log("counter: "+ counter);
  }

  return (
    <div>
      <div>MyState : {myState}</div>
      <input type="button" onClick = {() => updateState()} value="Update State"></input>
    </div>
  );
}
```

Kết quả là `counter` luôn bằng 1 sau mỗi re-render.

![useRef1](https://ren0503.github.io/assets/img/react/useRef1.png)

Để thay đổi được `counter` ta sử dụng **useRef**, cú pháp như sau :

```jsx
const refContainer = useRef(initialValue);
```

Khi đã sử dụng `useRef`, ta có thể sử dụng con trỏ `current` :

```jsx
import React, {useState} from 'react';

function Example() {
  console.log("fuction called....");
  let counter = useRef(0);
  let [myState, setMyState] = useState("A");
  
  let updateState = () => {
    counter.current++;
    setMyState(myState + "-u-");
    console.log("counter: "+ counter.current);
  }


  return (
    <div>
      <div>MyState : {myState}</div>
      <input type="button" onClick = {() => updateState()} value="Update State"></input>
    </div>
  );
}
```

Kết quả ta đã đổi được giá trị `counter` sau mỗi lần re-render.

![useRef1](https://ren0503.github.io/assets/img/react/useRef2.png)

# Tổng kết

Thực tế, trong phiên bản cập nhật mới của React còn rất nhiều hook hỗ trợ khác như cải thiện perfomance, quản lý dữ liệu,... nhưng có lẽ ta sẽ tìm hiểu nó ở các bài viết sau. Ở đây ta chỉ tìm hiểu về 3 hooks mà function có thể sử dụng để thay thế các tính năng của class component, và bài viết đến đây là hết. Hy vọng là nó có ích cho những ai đang cần một bài viết về hook hay function component.