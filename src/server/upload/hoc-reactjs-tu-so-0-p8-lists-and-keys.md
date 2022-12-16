Trước khi bắt đầu chúng ta sẽ cùng tìm hiểu một function sử dụng khá là phổ biến, đó chính là function map().
> The map() method creates a new array with the results of calling a provided function on every element in the calling array.
> 
map() là function cho phép chúng ta thao tác với một array và trả về 1 array theo mong muốn của chúng ta.

Ví dụ như sau:

``` Javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);

// expected output: [2, 4, 6, 8, 10]
```

Và trong React chúng ta có thể sử dụng map() để render từ một array data trở thành một list element.

# Rendering Multiple Components

Trong react chúng ta có thể render một array trong jsx bằng cách sử dụng dấu {}.

Ví dụ chúng ta sử dụng function map() để render array number để trả về một list `<li>`

```Javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);


ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[Ví dụ](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

# Basic List Component

Chúng ta có thể refactor lại ví dụ trên và thiết kế một component cho phép chúng ta truyền vào 1 array và trả về một list các element.

```Javascript
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
Với đoạn code này thì chúng ta đã có thể hiển thị một array, nhưng chúng ta sẽ nhận được một cảnh báo vì thiếu "key"

```
Each child in an array should have a unique "key" prop.
```

Và vì sao lại thiếu thì chúng ta sẽ tìm hiểu ở phần tiếp theo nha, và để fix warning này thì chúng ta sẽ làm như sau:

```Javascript
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

[Ví dụ](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

# Keys
Keys là một khái niệm quan trọng trong React bởi keys có thể giúp React có thể nhận biết một element thay đổi, thêm mới hay là bị xóa bỏ, nó giúp React cải thiện tốc độ render và qua đó làm cho app mượt mà hơn.

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Và một trong những khuyến cáo của React là chúng ta nên sử dụng "Id" để làm key, bởi vì Id thường là duy nhất và ít khi bị trùng.

```
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Nhưng đôi khi trong một số trường hợp thì chúng ta ko có Id để thao tác thì có thể sử dụng "index" của array để thay thế. Nhưng không khuyến cáo các bạn sử dụng "index" thay "id" để làm key, bởi index sẽ không thay đổi nhưng item trong array sẽ thay đổi khi chúng ta sort array và điều này làm cho key trở nên vô dụng.

### Example: Incorrect Key Usage

```
function ListItem(props) {
  const value = props.value;
  return (
    //Sai vì ở đây ko cần phải key, vì nó chỉ render một element duy nhất:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Sai. Vì ở đây nếu render thì sẽ có nhiều element giống nhau và cần có key để phân biệt:
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

### Example: Correct Key Usage

```
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

Và đơn giản chúng ta hãy nhớ, nếu sử dụng map() để render thì phải thêm key vào các element.

### Keys Must Only Be Unique
Key thì nên là duy nhất. Nhưng không nhất thiết là duy nhất trong cả app, trong một màn hình vẫn có thể có 2 key giống nhau nhưng với một điều kiện 2 key đó được render ở 2 lần khác nhau hoặc thuộc 2 array khác nhau.
Hiểu nôm na là trong mỗi lần sử dụng map() thì kết quả trả về không có key nào trùng nhau là được.

Ví dụ như sau

```
function Blog(props) {
  const sidebar = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
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

với đoạn code trên thì chúng ta sẽ không bị warning tuy rằng nhìn code thì có vẻ giống nhau :D

Có một lưu ý là key sẽ không thể truy cập được từ props, nếu bạn muốn sử dụng thì nên đưa vào props với một tên khác.

```
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

với ví dụ trên thì chúng ta có thể sử dụng `this.props.id` nhưng ko thể sử dụng `this.props.key`

# Embedding map() in JSX

Như đã nói ở đoạn đầu thì chúng ta có thể sử dụng map() trong jsx bằng cách bọc trong cặp dấu {}

```
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

hoặc sử dụng trực tiếp trong jsx luôn

```
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