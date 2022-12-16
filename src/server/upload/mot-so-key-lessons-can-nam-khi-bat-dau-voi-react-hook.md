![](https://images.viblo.asia/cea6b1c6-aa98-46cd-adad-74f59e50e6f9.png)

# 1. State của React Hook thực sự được update bằng cách nào?
Khi bắt đầu với Hook, để cập nhập state và quản lý state có thể sử dụng ```useState``` hoặc ```useReducer```

Nhưng chính xác thì điều gì sẽ xảy ra khi update State của một component bằng những cách ở trên? State được update ngay lập tức hay được thực hiện sau đó? 

Hãy xem đoạn code sau, đây là một ví dụ về ứng dụng truy cập rất đơn giản. Mục tiêu là thay đổi biến đếm ```count``` tăng thêm 1 mỗi khi bấm vào button Click

```javascript
import React from 'react';

export default function App() {
  const [count, setCount] = React.useState(0)

  function addOne() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1> {/* 1 (as we expect) */}

      <button onClick={addOne}>+ 1</button>
    </div>
  );
}
```

Nhưng điều gì sẽ xảy ra nếu thêm một dòng cập nhật Count? Khi đó, click Button thì Count hiển thị sẽ tăng lên một hay hai?

```javascript
  function addOne() {
    setCount(count + 1);
    setCount(count + 1);
  }
```

Nếu chạy mã này, ta sẽ thấy nó chỉ tăng lên 1. Mặc dù ta đã có tới 2 lần update ```count```.

Lý do là React đã lên lịch thực hiện update State sau lần đầu tiên. Bởi vì nó chỉ được lập lịch và không được thực hiện ngay lập tức (**asynchronous** và **not synchronous**), ```count``` không được cập nhật trước khi dòng setCount cố gắng cập nhật lần thứ hai.

Nói cách khác, bởi vì cập nhật State được lên lịch, không được thực hiện ngay lập tức, lần thứ hai gọi ```setCount```, ```count``` vẫn chỉ là 0, không phải 1.

Cách khắc phục là sử dụng hàm ```setter``` có sẵn trong useState để cập nhật State một cách đáng tin cậy, mặc dù các cập nhật State là không đồng bộ.

Điều này cho phép lấy State trước đó và trả về giá trị mong muốn ở trong function. Code sẽ được viết như sau:

```javascript
import React from 'react';

export default function App() {
  const [count, setCount] = React.useState(0)

  function addOne() {
    setCount(prevCount => prevCount + 1); // 1
    setCount(prevCount => prevCount + 1); // 2
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne}>+ 1</button>
    </div>
  );
}
```

# 2. Sử dụng nhiều Effect thay vì chỉ dùng một lần
Khi thực hiện một ```side effect```, hầu hết các dev React sẽ  dùng ```useEffect``` chỉ một lần và cố gắng thực hiện nhiều thứ trong cùng một hàm Effect.

Chẳng hạn như ví dụ dưới đây

```javascript
import React from "react";

export default function App() {
  const [posts, setPosts] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    // fetching post data
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));

    // fetching comments data
    fetch("https://jsonplaceholder.typicode.com/comments")
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

Thay vì cố gắng nhồi nhét tất cả các ```side effect```  vào một ```useEffect``` duy nhất thì nên sử dụng nhiều useEffect với các mục đích khác nhau.

Làm như vậy cho phép tách các action khác nhau thành các effect khác nhau. Đó là một lợi ích chính mà React hooks mang lại so với việc sử dụng các Life Cycle trong các Class Component.

Ví dụ, trong các phương thức như ```componentDidMount```, sẽ thực hiện bất kỳ action nào sau khi component được render, không thể chia nhỏ các side effect thành nhiều method - mỗi method của life cycle trong các Class chỉ có thể được sử dụng 1 lần.

Lợi ích chính của React hooks là chia nhỏ code dựa trên mục đích mỗi lần side effect. Không chỉ có thể tách các action mà còn thực hiện sau khi render thành nhiều effect chẳng hạn như:

```javascript
import React from "react";

export default function App() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const [comments, setComments] = React.useState([]);
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
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

Ở đoạn mã này đã sử dụng 2 lần useEffect và nó không ảnh hưởng hiệu năng render. Thứ tự thực hiện side effect sẽ là sau lần đầu render và theo thứ tự đặt useEffect trong code.

# 3. Không tối ưu hóa các chức năng cập nhật State (useState, useReducer)
Một nhiệm vụ phổ biến bất cứ khi nào truyền một callback funtion từ parent component sang children component là ngăn nó re-render, trừ khi các đối số của nó đã thay đổi.

Một cách tối ưu là sử dụng useCallback (mình có giới thiệu qua ở 1 bài đăng liên quan đến ngăn  re-render)

useCallback được tạo đặc biệt cho các callback function chuyển cho các chil component để đảm bảo rằng chúng không được tạo lại một cách không cần thiết, điều này dẫn đến việc ảnh hưởng đến hiệu suất đối với các component bất cứ khi nào có re-render (sẽ tạo ra 1 vùng nhớ và sẽ được gọi ra mỗi khi useCallback được sử dụng)

Tuy nhiên, nếu đang sử dụng một hàm setter để cập nhật State đã tạo bằng hook useState hoặc useReducer thì không cần dùng useCallback. Chẳng hạn như sau:

```javascript
import React from "react";

export default function App() {
  const [text, setText] = React.useState("")

  // Don't wrap setText in useCallback (it won't change as is)
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


***React guarantees that setState function identity is stable and won't change on re-renders. This is why it's safe to omit from the useEffect or useCallback dependency list.***


Do đó, không những không cần tối ưu hóa nó một cách không cần thiết với useCallback mà còn không cần đưa nó vào như một phụ thuộc trong useEffect vì nó sẽ không thay đổi.

Đây là điều quan trọng cần lưu ý vì trong nhiều trường hợp nó có thể dẫn đến vấn đề về hiệu suất của code.

# 4. useRef có thể duy trì State trên các render
Khi code React, đôi khi có thể tham chiếu đến một phần tử React nhất định bằng cách sử dụng ```ref```. useRef sẽ hỗ trợ việc này rất tốt.

Tuy nhiên, điều quan trọng cần lưu ý khi dùng useRef là điều đó không chỉ hữu ích cho việc tham chiếu đến một phần tử DOM nhất định.

***The ref object that's created by useRef is a generic container with a current property that's mutable and can hold any value.***

Đại khái là đối tượng ref được tạo bởi useRef là một vùng chứa chung với thuộc tính hiện tại có thể thay đổi và có thể giữ bất kỳ giá trị nào.

Có một số lợi ích nhất định để có thể lưu trữ và cập nhật các giá trị useRef. Nó cho phép lưu trữ một giá trị sẽ không có trong bộ nhớ mà sẽ không bị xóa khi hiển thị lại.

Nếu muốn theo dõi một giá trị qua các lần hiển thị với sự trợ giúp của một biến đơn giản, nó sẽ được khởi động lại mỗi khi component hiển thị. Tuy nhiên, nếu sử dụng một tham chiếu, giá trị được lưu trữ trong đó sẽ không đổi trong các lần hiển thị component.

Điều này có thể hữu ích trong trường hợp muốn thực hiện side effect nhất định chỉ trên render lần đầu, ví dụ:

```javascript
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

Khi chạy đoạn code này sẽ thấy bất kể Button được Click bao nhiêu lần, State được cập nhật và render lại diễn ra, hành động muốn thực hiện là xem console.log chỉ được thực hiện một lần.

# 5.Cách ngăn ứng dụng React bị crashing
Một trong những bài học quan trọng nhất mà cần biết khi code React là phải làm gì với các lỗi chưa được khắc phục.

Trong ví dụ dưới đây, khi cố gắng hiển thị component Header thì có một lỗi xảy ra. Cụ thể là cố gắng lấy một thuộc tính từ giá trị null:

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

  return <h1>Hello {user.name}</h1>; // error!
}
```

Một lỗi khi run sẽ xuất hiện như sau
```
As of React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.
```

Đại khái là kể từ React 16, các lỗi không bị bắt bởi bất ```Error boundaries``` nào sẽ dẫn đến việc ngắt kết nối toàn bộ React component tree

Như vậy thì khi thấy một thông báo lỗi lớn màu đỏ với dấu vết ngăn xếp cho biết nơi có thể tìm thấy lỗi. Tuy nhiên, khi ứng dụng của hoạt động sẽ chỉ thấy một màn hình trống.

Có một cách để khắc phục nó, hoặc ít nhất là hiển thị cho người dùng biết rằng một lỗi đã xảy ra nếu ứng dụng vô tình bị treo. 

```Error boundaries``` là các component cho phép bắt lỗi và hiển thị cho người dùng một thông báo dự phòng cho họ biết rằng đã xảy ra lỗi. Điều đó có thể bao gồm hướng dẫn về cách loại bỏ lỗi (như tải lại trang).

Chúng ta có thể sử dụng một ```Error boundaries``` với packet ```react-error-boundary```.

```javascript
export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
    </ErrorBoundary>
  );
}
```

**Cảm ơn các bạn đã theo dõi đến đây, xin chào và hẹn gặp lại!!!**

Link tham khảo: https://www.freecodecamp.org/news/5-react-lessons-tutorials-dont-teach/