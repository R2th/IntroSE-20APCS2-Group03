*Hooks* được bổ sung trong React 16.8

Trước khi đi tìm hiểu xem *React Hooks* có gì, chúng ta hãy đi đến ví dụ về Counter:

**Với Class Component nó được viết như sau:**
```js
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
Và khi *Function* component ra đời, ... Êiii, ae chờ tí *Function* thì làm sao lưu State? Và làm sao React lại biết sự thay đổi của State? Để trả lời cho câu hỏi này thì nhiều bạn sẽ suy nghĩ đến Redux, Flux, RxJS, bla bla bla…

**Tuy nhiên với sự ra đời của React Hooks, Function component có thể tự quản lý State và các chức năng khác mà không cần đến state managment khác:**
```js
import React, { useState } from 'react';

function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

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

Nhìn vậy chắc anh em cũng đã nhận ra dần mục đích của *Hooks* rồi nhỉ?

Bây giờ chúng ta sẽ đi tìm hiểu cụ thể các hàm mà Hooks cung cấp nhé!

### 1. Basic Hooks

#### useState

Thằng này chính là ở ví dụ mình nêu trên:

Hàm useState sẽ nhận vào giá trị ban đầu và trả lại mảng gồm state và hàm để thay đổi state đó:
```js
const [state, setState] = useState(initialState);
```

#### useEffect

Nói đến ReactJs ta sẽ nghĩ ngay đến một loạt *lifecycle* method như *componentDidMount*, *componentDidUpdate*, và *componentWillUnmount*. **useEffect** sinh ra chính là để thay thế chúng.
```js
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

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

Trong một số trường hợp, **việc apply effect mỗi khi render sẽ gây ra các vấn đề về hiệu năng.** Trong Class Component chúng ta giải quyết vấn đề này bằng cách viết một so sánh bổ sung với *prevProps* hoặc *prevStatebên* trong *componentDidUpdate*:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
useEffect có thể thực hiện được điều này bằng cách truyền vào một mảng là đối số thứ 2 cho hàm:
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

**Effect hook có thể trả về một hàm, và hàm này hoạt động như *componentWillUnmount*:**
```js
useEffect(() => {
  const id = setInteval(() => setCount(count + 1), 100)

  // Specify how to clean up after this effect:
  return () => clearInteval(id)
})
```

### 2. Custom Hooks

*Custom Hook* là một hàm Javascript có tên bắt đầu bằng "***use***" và nó có thể gọi ở các hooks khác.

Điều này giúp bạn có thể chia sẻ logic giữa các React component.

Hãy đi đến với ví dụ sau:

*Chúng ta có một ứng dụng chat và nó sẽ hiển thị bạn bè của bạn đang online hay offline*

Với Hooks nó có thể được viết như sau:

```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

Tuy nhiên, bây giờ bạn có một danh sách trò chuyện chứ không phải chỉ mỗi một người bạn, và bạn cần hiển thị tên người đang online bằng màu green, chúng ta sẽ phải viết lại như sau:

```js
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Có thể nhận thấy, logic của 2 component trên khá giống nhau, và làm thế nào để có thể chia sẻ logic này giữa chúng? 

**Hooks sẽ giải quyết vấn đề này như sau:**

Đầu tiên chúng ta sẽ có một custom hooks:
```js
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```
Logic của nó gần như được sao chép từ trên, và bây giờ 2 components của chúng ta sẽ được viết lại rất ngắn gọn thế này:
```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
```js
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Hãy yên tâm rằng, state ở trong 2 components này là hoàn toàn độc lập với nhau. Các bạn không phải dùng [Render Props](https://reactjs.org/docs/render-props.html) hay [Higher-order component](https://reactjs.org/docs/higher-order-components.html) đồng nghĩa với việc bạn không cần thêm các Components vào cây để chia sẻ logic, tránh đụng phải “wrapper hell” như thế này:

![](https://images.viblo.asia/3deb4599-c993-443e-9360-7be7cbca1f4e.jpg)

### 3. Rule của Hooks

#### Chỉ gọi Hooks ở cấp cao nhất:

Trong cùng một component, bạn có thể sử dụng bao nhiêu *useState* và *useEffect* tùy ý. Nhưng bắt buộc các hooks này phải được đặt ở phía đầu hàm, và không nằm trong *if*, *switch*, vòng lặp *for*, *while*, hay trong các hàm lồng nhau.

#### Chỉ gọi Hooks từ React Functions:

Đừng gọi Hooks ở các hàm Js thông thường. Thay vào đó bạn hãy:

* Gọi Hooks từ React function components.
* Gọi Hooks từ *custom hooks*

### 4. Additional Hooks

Phía trên mình mới chỉ giới thiệu về *Basic Hooks*. Tuy nhiên React Hooks còn có các *Additional Hooks*. Chúng là các biến thể của Basic Hooks, hoặc chỉ được sử dụng trong một số trường hợp cụ thể.

* [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
* [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
* [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
* [useRef](https://reactjs.org/docs/hooks-reference.html#useref)
* [useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)
* [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)
* [useDebugValue](https://reactjs.org/docs/hooks-reference.html#usedebugvalue)

### 5. Tại sao nên dùng hooks?

#### Code ngắn gọn hơn:

So sánh giữa các *class components* và *function components*, số lượng code phải viết chênh lệch nhau khá nhiều. Theo tuyên bố của những lập trình viên xây dựng React, 90% code trở nên sạch sẽ hơn. Ứng dụng sau khi build cũng gọn nhẹ hơn hẳn.

#### Hoàn toàn tự nguyện, 100% tương thích ngược:

Việc sử dụng Hooks khi tạo components là hoàn toàn tự nguyện. Nếu không muốn bạn vẫn có thể sử dụng ES6 class như bình thường và React cũng chưa có ý định hoàn toàn loại bỏ class. 

Ngoài ra các dự án cũ khi được cập nhật lên phiên bản React có hỗ trợ Hooks vẫn có thể hoạt động trơn tru. Bạn cũng không phải bỏ hết những khái niệm đã biết khi dùng Hooks. Thay vào đó, Hooks cung cấp API giúp bạn có thể thao tác sâu hơn vào props, state, context, refs, và các lifecycle.

Và như vậy, còn ngại ngần gì mà chúng ta không thử dùng hooks ngay và luôn? :laughing::laughing: