Trước tiên, hãy để xem lại cách chúng ta thường transform list trong JavaScript.

Như dứoi đây, sử dụng hàm `map()` để lấy một mảng các số và nhân đôi giá trị của mỗi số. Gán mảng mới được trả về các biến đã được nhân đôi bởi `map()`  và log lại nó:
```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```
Mã này log mảng [2, 4, 6, 8, 10] vào console.

Trong React, biến đổi mảng thành danh sách các phần tử gần như giống hệt nhau.

**Rendering Multiple Components**

Bạn có thể xây dựng collections của các phần tử và include chúng vào JSX bằng cách sử dụng dấu ngoặc nhọn `{}`.

Dưới đây, ta lặp qua mảng số bằng cách sử dụng hàm JavaScript `map()`. Trả về một phần tử `<li>` cho mỗi mục. Cuối cùng, gán mảng kết quả của các phần tử cho `listItems`:

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```
Include toàn bộ mảng listItems bên trong một phần tử `<ul>` và render nó thành `DOM`:
```js
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
[Try it](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Mã này hiển thị một danh sách có đánh dấu đầu dòng của các số từ 1 đến 5.

**Basic List Component**

Thông thường ta render danh sách bên trong một component. Và ta có thể cấu trúc lại ví dụ trước thành một component chấp nhận một mảng các số và đưa ra một danh sách các phần tử.
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Khi chạy mã này, ta sẽ được cảnh báo rằng một `key` nên được cung cấp cho các mục danh sách. Một `key` là một thuộc tính chuỗi đặc biệt mà bạn cần đưa vào khi tạo danh sách các phần tử. Và tại sao nó quan trọng thì ta cùng nhau theo dõi tiếp nhé.

Ta gán một `key` cho các mục danh sách của chúng ta bên trong `numbers.map()` và khắc phục vấn được đề thiếu `key`.
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
[Try it](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

**Keys**

Keys giúp React xác định mục nào đã thay đổi, được thêm hoặc xóa. Các `key` nên được cấp cho các phần tử bên trong mảng để cung cấp cho các phần tử một định nghĩa ổn định:
```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
Cách tốt nhất để chọn `key` là sử dụng một chuỗi xác định duy nhất một mục danh sách giữa các mối liên hệ liên quan nó. Thông thường, bạn sẽ sử dụng `ID` từ dữ liệu của mình làm `key`:
```js
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```
Khi bạn không có `ID` cố định cho các mục được hiển thị, bạn có thể sử dụng chỉ mục làm `key` như là phương án cuối cùng:
```js
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```
Ở đây không khuyến khích sử dụng chỉ mục cho các khóa nếu thứ tự các `items` có thể thay đổi. Điều này có thể giảm hiệu suất và có thể phát sinh vấn đề với component state. Nếu bạn chọn không gán `key` rõ ràng cho danh sách các mục thì React sẽ mặc định sử dụng các chỉ mục làm khóa.

Dưới đây là một lời giải thích sâu sắc về lý do tại sao các `key` là cần thiết.

**Extracting Components with Keys**

Các `key` chỉ có ý nghĩa trong context của các mảng xung quanh.

Ví dụ, nếu bạn extract một thành phần `ListItem`, bạn nên gán `key` trên các phần tử `<ListItem />` trong mảng chứ không phải trên phần tử `<li>` trong chính ListItem.

**Ví dụ: Sử dụng `key` không chính xác** 

```js
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
**Ví dụ: Sử dụng `key` chính xác**
```js
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
[Try it](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

A good rule of thumb is that elements inside the `map()` call need keys.

Keys Must Only Be Unique Among Siblings
Keys used within arrays should be unique among their siblings. However they don’t need to be globally unique. We can use the same keys when we produce two different arrays:

Một nguyên tắc nhỏ là các phần tử bên trong các `map()` cần gọi `keys`.

**Keys Must Only Be Unique Among Siblings**

Các khóa được sử dụng trong các mảng phải là duy nhất giữa quan hệ của chúng. Tuy nhiên, chúng không cần phải là duy nhất trên global. Chúng ta có thể sử dụng cùng một `key` khi chúng ta tạo ra hai mảng khác nhau:
```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```
[Try it](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Các `key serve` như một gợi ý cho React nhưng chúng không được chuyển đến các component của bạn. Nếu bạn cần sử dụng một giá trị trong thành phần của mình, chuyển nó một cách rõ ràng dưới dạng `prop` sử dụng với một tên khác:
```js
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

Với ví dụ trên, thành phần `Post` có thể đọc `props.id`, nhưng không đọc `props.key`.

**Embedding map() in JSX**

Trong các ví dụ ở trên, ta đã khai báo một biến `listItems` riêng biệt và đưa nó vào `JSX`:
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
`JSX` cho phép nhúng bất kỳ biểu thức nào trong dấu ngoặc nhọn để chúng ta có thể inline kết quả `map()`:
```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```
[Try it](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Đôi khi điều này giúp code rõ ràng hơn, nhưng style này cũng có thể bị lạm dụng. Giống như trong JavaScript, tùy thuộc vào bạn để quyết định xem có đáng để extract một biến để dễ đọc hay không. Hãy nhớ rằng nếu body `map()` lồng nhau quá, đây có thể là thời điểm tốt để extract một component.

Bài viết được tham khảo từ

https://www.robinwieruch.de/react-list-components/ \
https://reactjs.org/docs/lists-and-keys.html