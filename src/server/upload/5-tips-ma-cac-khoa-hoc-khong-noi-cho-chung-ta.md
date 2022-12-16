Có rất nhiều khái niệm về React mà chúng ta cần biết  nhưng mà chúng lại không được đề cập trong hầu hết các khoá học mà chúng ta được xem.

Vậy thì hôm nay, mình sẽ chọn lọc các chủ đề mà mình tin là sẽ cần thiết và quan trọng với một số bạn, mong là nó sẽ giúp ích cho các bạn trong việc phát triển ứng dụng của mình. 

 Cùng bắt đầu nào :laughing::laughing::laughing:
 
#  1. State trong React được cập nhật như thế nào ???
 Như hầu hết trong các video đã được học thì state của chúng tạo có thể được tạo và cập nhật khi sử dụng 2 thằng hook **useState** và **useReducer**.

Vậy thì hãy cùng đoán xem khi cập nhật state của một component bằng một trong hai hook này thì state sẽ được cập nhật ngay lập tức hay là được cập nhật sau đó.

 Cùng xem đoạn code mà ai cũng dùng nhé, khi chúng ta click vào nút thì thực hiện tăng biến đếm lên 1.

```javascript
import React from 'react';

export default function App() {
  const [count, setCount] = React.useState(0)

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1> // kết quả ra là 1 rồi :v

      <button onClick={handleClick}>+ 1</button>
    </div>
  );
}
```
Điều gì sẽ xảy ra nếu mình thêm một lần gọi **setCount** nữa,  kết quả hiển thị ra sẽ là 1 hay 2 ????:v: 

```javascript
import React from 'react';

export default function App() {
  const [count, setCount] = React.useState(0)

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1> // Ủa vẫn ra 1 nè

      <button onClick={handleClick}>+ 1</button>
    </div>
  );
}
```

 Sau khi chạy thì đoạn code của chúng ta vẫn chỉ cho kết quả là 1. Mà rõ ràng chúng ta đã gọi hai lần **setCount**

 Ồ là do React đã lên lịch thực hiện cập nhật state khi chúng ta  thực hiện cập nhật state lần đầu tiên.  Do không được thực hiện ngay lập tức ( Các bạn tìm hiểu thêm về **đồng bộ (asynchronous)** và **bất đồng bộ (not synchronous)** nhé ), biến count đã không được cập nhật trước khi chúng ta cố gắng cập nhật nó lần thứ hai.

Nói cách khác, bởi vì việc cập nhât state đã được lên lịch, không được thực hiện ngay lập tức, cho nên lần thứ hai gọi setCount, biến count vẫn chỉ là 0, không phải 1.

Vậy làm sao để fix lỗi này , chúng ta có thể sử dụng hàm có sẵn trong **useState** là thằng **setter**, nó cho phép chúng ta lấy state trước đó và trả về giá trị mà chúng ta muốn :

```javascript
import React from 'react';

export default function App() {
  const [count, setCount] = React.useState(0)

  function handleClick() {
    setCount(prevCount => prevCount + 1); // 1
    setCount(prevCount => prevCount + 1); // 2
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>+ 1</button>
    </div>
  );
}
```

# 2.  Nên sử dụng nhiều useEffect hơn là sử dụng chỉ một cái.
Khi thực hiện call API khi bắt đầu vào trang, hầu hết chúng ta đều chỉ sử dụng useEffect một lần và cố gắng gọi thật nhiều lần các hàm call API trong đó :

```javascript
import React from "react";

export default function App() {
  const [posts, setPosts] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    // fetching post data
    fetch("api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));

    // fetching comments data
    fetch("api/posts/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div>
      <PostsList posts={posts} />
      <CommentsList comments={comments} />
    </div>
  );
}

```

Thay vì cố gắng nhồi nhét tất cả các hàm call API ,  chúng ta có thể sử dụng useEffect nhiều lần.Làm như vậy cho phép chúng ta tách các hàm khác nhau của mình thành các hàm khác nhau để dễ dàng quản lý hơn.

Ví dụ như thằng **componentDidMount**, chúng ta cần phải thực hiện tất cả các hành động mà chúng ta muốn sau khi mounted. Chúng ta không thể chia nhỏ các lần gọi các API của mình thành các methods - mỗi một lifecycle method chỉ có thể được sử dụng một lần.

Lợi ích  việc sử dụng React hooks là chúng ta có thể chia nhỏ code của mình dựa trên những gì nó đang làm :

```javascript
import React from "react";

export default function App() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    fetch("api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const [comments, setComments] = React.useState([]);
  React.useEffect(() => {
    fetch("api/posts/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div>
      <PostsList posts={posts} />
      <CommentsList comments={comments} />
    </div>
  );
}
```

# 3. Không tối ưu hóa các khi cập nhật state(useState, useReducer).

 Một common phổ biến mà bất cứ khi nào chúng ta truyền một call back function từ component cha sang component con là để ngăn nó được tạo lại, trừ khi đối số truyền vào của nó đã được thay đổi.

Chúng ta có thể thực hiện tối ưu hóa này với sự trợ giúp của **useCallback**.

**useCallback** được tạo ra cho các callback function nhằm đảm bảo các component con không được tạo lại một cách không cần thiết, điều này dẫn đến việc ảnh hưởng đến hiệu suất đối với các components của chúng ta bất cứ khi nào re-render lại.

Điều này là do bất cứ khi nào component cha của chúng ta render lại, nó sẽ khiến tất cả các component con cũng hiển thị lại. Đây là nguyên nhân khiến các callback function của chúng ta được tạo lại mỗi lần hiển thị lại.

Tuy nhiên, nếu chúng ta đang sử dụng một hàm setter để cập nhật trạng thái mà chúng ta đã tạo bằng  useState hoặc useReducer, chúng ta không cần dùng useCallback.

```javascript
import React from "react";

export default function App() {
  const [text, setText] = React.useState("")

  const handleSetText = React.useCallback((event) => {
    setText(event.target.value);
  }, [])

  return (
    <form>
      <Input text={text} handleSetText={handleSetText} />
      <button type="submit">Submit</button>
    </form>
  );
}

function Input({ text, handleSetText }) {
  return(
    <input type="text" value={text} onChange={handleSetText}  />
  )
}
```
 Trong doc của React đã giải thích điều này :
 
 `React guarantees that setState function identity is stable and won't change on re-renders. This is why it's safe to omit from the useEffect or useCallback dependency list.`
 
#  4.useRef có thể duy trì state qua các lần render.

Đôi khi rất hữu ích khi chúng ta  có thể tham chiếu trực tiếp đến một element React với sự trợ giúp của **ref**. Chúng ta tạo các **ref** trong React với sự trợ giúp của **useRef**.

Tuy nhiên cần lưu y là useRef không thể tham chiếu đến một DOM nhất định.

Có một số lợi ích nhất định để có thể lưu trữ và cập nhật các value useRef. Nó cho phép chúng ta lưu trữ một giá trị sẽ không có trong bộ nhớ mà sẽ không bị xóa khi render lại.

Nếu chúng ta muốn theo dõi một giá trị qua các lần render với sự trợ giúp của một variable , nó sẽ được khởi động lại mỗi khi component hiển thị. Tuy nhiên, nếu bạn sử dụng một tham chiếu, giá trị được lưu trữ trong đó sẽ không đổi trong các lần hiển thị component của chúng ta.

```
import React from "react";

export default function App() {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef({ hasRendered: false });

  React.useEffect(() => {
    if (!ref.current.hasRendered) {
      ref.current.hasRendered = true;
      console.log("perform action only once!");
    }
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
```

Như chúng ta thấy, bất kể click button bao nhiêu lần, state được cập nhật và render lại, hành động chúng ta muốn thực hiện chỉ được thực hiện một lần.

# 5. Cách ngăn React app của chúng ta gặp sự cố.

Trong ví dụ dưới đây, chúng ta đang cố gắng hiển thị component Header trong ứng dụng của mình, nhưng đang thực hiện một hành động dẫn đến lỗi. Cụ thể, cố gắng lấy một property có giá trị null:

```javascript
import React from "react";

export default function App() {
  return (
    <>
      <Header />
    </>
  );
}

function Header() {
  const user = null;

  return <h1>Hello {user.name}</h1>; 
}
```
 Tại sao lại lỗi, chúng ta có thể thấy điều này trong doc React :
 
 
 `As of React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.
`
 Cách khắc phục là chúng ta nên bọc component này lại bằng cách sử dụng **error boundary**.
 
 Error boundary là các components cho phép chúng ta bắt lỗi và hiển thị cho người dùng một thông báo cho họ biết rằng đã xảy ra lỗi. 

Chúng ta có thể sử dụng một **error boundary** với sự trợ giúp của gói **react-error-boundary**. Chúng ta có thể bọc nó xung quanh component mà chúng ta tin rằng dễ xảy ra lỗi :

```
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
    </ErrorBoundary>
  );
}

function Header() {
  const user = null;

  return <h1>Hello {user.name}</h1>;
}

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Oops, there was an error:</p>
      <p style={{ color: "red" }}>{error.message}</p>
    </div>
  );
}

```

Kết quả sẽ được :
![](https://images.viblo.asia/308ec296-fe91-438e-9e71-5f52d55322df.png)

# Kết bài :
 Vậy là bài viết đã kết thúc nếu thấy hay hãy **like** và **upvote** cho mình để mình có thể viết được nhiều bài hơn nha .
 
 Many thanks :heart_eyes::heart_eyes::heart_eyes: