Hê nhô anh em , lại là mình đây , sau khi bài trước được ủng hộ một cách nhiệt tình thì mính lại có thêm một bài nữa nha
Bắt đầu thôi :)
# 1. Đừng quên gắn các Component tương ứng mỗi khi chúng ta thay đổi Route

Bất cứ khi nào chúng ta sử dụng Route trong ứng dụng React, thì chúng ta thường khai báo chúng bên trong thằng `<Switch>`. Điều này có nghĩa là chỉ có một component có route phù hợp được hiển thị tại một thời điểm.

Do đó, bất cứ khi nào chúng ta đi đến một route mới , component được hiển thị trước đó sẽ được ngắt kết nối và component có route tương ứng được hiển thị.

Nếu muốn hiển thị dữ liệu của mỗi component trong mỗi lần thay đổi route, chúng ta cần bao dữ liệu đó bên trong component thuộc route đó :

```javascript
import { useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./styles.css";

const Header = () => (
  <div>
    <Link to="/one">Page One</Link> <Link to="/two">Page Two</Link>
  </div>
);

const ComponentOne = () => {
  useEffect(() => {
    console.log("Page one");
    return () => console.log("Page one");
  }, []);

  return <p>Page One</p>;
};

const ComponentTwo = () => {
  useEffect(() => {
    console.log("Page two");
    return () => console.log("Page two");
  }, []);

  return <p>Page two</p>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/one" component={ComponentOne} exact />
        <Route path="/two" component={ComponentTwo} />
      </Switch>
    </BrowserRouter>
  );
}

```

Như chúng ta có thể thấy trong đoạn code trên, bất cứ khi nào chúng ta thay đổi nội dung bằng cách nhấp vào các liên kết, nội dung tương ứng sẽ được hiển thị ra. Điều này chỉ ra rằng component trước đó đã được ngắt kết nối và một component mới được gắn kết.

# 2. Đừng sử dụng sai syntax của setState 
Bất cứ khi nào muốn khai báo state trong một class-based component, chúng ta luôn luôn làm như sau : 

```javascript
this.state = {
 counter: 0
}
```

Nếu muốn cập nhật trạng thái thì làm thế nào ???

```javascript
this.setState((prevState) => {
  return {
    counter: prevState.counter + 1
  };
});
```

Bởi vì state là một object, prevState cũng là một object - do đó chúng ta có thể truy cập vào thằng counter bằng cách sử dụng prevState.counter.

Nhưng khi chúng ta sử dụng các functional components, state có thể là một object hoặc một giá trị không phải object thì sao :

```javascript
const [counter, setCounter] = useState(0);
```

Đơn giản lắm , chúng ta làm như sau :

```javascript
setCounter((counter) => counter + 1);
```

# 3. Sử dụng Hooks trong Class Component ????

Bắt đầu từ phiên bản 16.8.0, React đã giới thiệu Hooks. Điều này giúp cho việc code thuận tiện hơn, cho phép chúng ta sử dụng state và các tính năng khác của React mà không phải dùng đến Class.

React cung cấp nhiều hook như :
* **useParams**:  trường hợp router của bạn nhận vào các tham số và bạn muốn sử dụng lại nó trong component thì hay sử dụng hooks này.
* **useHistory**: cho phép chúng ta truy cập vào object **history** để có thể thực hiện các thao tác liên quan đến thay đổi url, ví dụ từ documents.
* **useRef** : cố định giá trị giữa các lần render.

và nhiều hook khác nữa.

Tất cả các hook này (thường bắt đầu bằng từ khóa **use**) và chỉ hoạt động bên trong các functional components.

Nếu cố sử dụng thì nó sẽ ra như thế này nhé :

![](https://images.viblo.asia/0ec5ebc3-fc49-4359-aeec-c6c4ae8d7377.png)

# 4. Đừng quên add key khi sử dụng Map nhé 
Chắc là đoạn code này rất quen thuộc mỗi khi chúng ta nhận về một list data :

```javascript
const Items = ({ items }) => (
  <ol>
    {items.map((item) => (
      <Item item={item} />
    ))}
  </ol>
);
```

Trong React, chúng ta sẽ thường sử dụng phương thức **map** để hiển thị danh sách các mục được lưu trữ trong một mảng.

```
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const AddItemForm = (props) => (
  <form onSubmit={props.handleAddItem}>
    <input
      type="text"
      name="text"
      placeholder="Enter some value"
      autoComplete="off"
    />
    <button>Add Item</button>
  </form>
);

const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = (event) => {
    event.preventDefault();
    const value = event.target.elements.text.value;
    if (value) {
      setItems((prevItems) => [...prevItems, value]);
      event.target.elements.text.value = "";
    }
  };

  return (
    <div>
      <AddItemForm handleAddItem={handleAddItem} />
      <Items items={items} />
    </div>
  );
};

const Item = (props) => <li>{props.item}</li>;

const Items = ({ items }) => (
  <ol>
    {items.map((item, index) => (
      <Item item={item} />  // Không add key nhé 
    ))}
  </ol>
);
```
 Ngay lập tức chúng ta sẽ nhận được dòng warning :
 
![](https://images.viblo.asia/83e8e0fe-ca9c-4df7-8903-f3865e243e85.png)

Điều này là do mỗi khi chúng ta sử dụng phương thức map để lặp lại các mục, chúng ta cần cung cấp một giá trị **key** duy nhất . React sử dụng **key** để xác định những phần tử nào trên màn hình cần được render lại, do đó, việc thêm **key** sẽ giúp chúng ta tránh hiển thị lại những data không cần thiết trong ứng dụng của mình.

```javascript
 <Item item={item} key={index} />
```

# 5. Đừng sử dụng các inline function sai cách 
Cùng xem đoạn code sau nhé :

```javascript
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const AddItemForm = (props) => (
  <form onSubmit={props.handleAddItem}>
    <input
      type="text"
      name="text"
      placeholder="Enter some value"
      autoComplete="off"
    />
    <button>Add Item</button>
  </form>
);

const App = () => {
  const [items, setItems] = useState(["one", "two"]);

  const handleAddItem = (event) => {
    event.preventDefault();
    const value = event.target.elements.text.value;
    if (value) {
      console.log("adding", value);
      setItems((prevItems) => [...prevItems, value]);
      event.target.elements.text.value = "";
    }
  };

  const handleRemoveItem = (selectedItem) => {
    setItems(items.filter((item) => item !== selectedItem));
  };

  return (
    <div>
      <AddItemForm handleAddItem={handleAddItem} />
      <Items items={items} handleRemoveItem={handleRemoveItem} />
    </div>
  );
};
```
Chúng ta thêm một số thứ :

```javascript
const [items, setItems] = useState(["one", "two"]);
```
Và lặp lại để hiện thị trên màn hình :

```javascript
{items.map((item, index) => (
  <li key={index}>
    {item} <button onClick={handleRemoveItem(item)}>Remove</button>
  </li>
))}
```
Khi chạy đoạn code trên, nếu mà bạn chạy thử , chúng ta sẽ thấy không có mục nào được hiển thị trên màn hình. Thêm các mục mới cũng không hoạt động. Điều này là do thằng **onClick** :

```javascript
<button onClick={handleRemoveItem(item)}>Remove</button>
```

Ở đây, chúng ta đang gọi handleRemoveItem khi người dùng click vào nút - nhưng cách chúng ta gọi phương thức là sai.

Vì vậy, nếu không cần chuyển bất kỳ tham số nào, chúng ta sử dụng cú pháp sau:

```javascript
<button onClick={handleRemoveItem}>Remove</button>
```

Nhưng sau này nếu chúng ta quyết định truyền một số tham số cho hàm :

```javascript
<button onClick={() => handleRemoveItem(item)}>Remove</button>
```

Vậy là bài viết của mình đã kết thúc, nếu thấy hay hãy **like**, **share** và **upvote** nhaa.

Many thanksss