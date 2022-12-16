# Tại sao phải gọi super(props) trong constructor của React component ?
```
class App extends Component {
  constructor(props) {
    super(props)
      console.log(this.props)
    }
   // => undefined
   // props parameter is still avilable
  }
```

* Trong React chúng ta có 2 cách viết component. Đó là dùng function và dùng Class. Functional component dùng để tạo nên những presentational(dump) component.

### Presentational component (Functional component

* Là những component đơn giản không thay đổi props, không có state, không có lifecycle hooks.
* Nhiệm vụ chính là nhận props để render UI và bắn event khi cần thiết cho Container components.

### Container component (Class component- hay có thể dùng function với React Hooks):

* Là những components có state, có lifecycle hooks.
* Như là một trung tâm xử lý dữ liệu của một tổ chức, Class Component thường được dùng để tạo nên những Container Components, chúng có nhiệm vụ nhận event, quản lí state, logic.


**Một Class Component có thể được viết như sau:**


```

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { busy: true };
  }
  // ...
}
```


* Trở lại với **constructor** function, vậy mục đích của việc gọi **super(props)** là để làm gì? Và chúng ta có thể gọi super() không cần truyền props có được không? Super còn có những tham số khác không?


* Việc gọi super ở đây nhằm mục đích khởi tạo biến this từ **Parent,** vì Button được thừa kế từ **React.Component**. Sau khi gọi super, chúng ta sẽ truy cập được **this** một cách bình thường.

```
 
class Button extends React.Component {
  constructor(props) {
    // 🔴 Can’t use `this` yet
    super(props);
    // ✅ Now it’s okay though
    this.state = { busy true };
  }
  // ...
}
```

**Bên dưới React.Component được định nghĩa như sau:**
```
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```

* Cho nên khi chúng ta gọi super(props) ở Button, cũng đồng nghĩa là đã khởi tạo this.props cho Button.
* Nhưng nếu bạn không pass props khi gọi super cho hàm Button như thế này:

```
class Button extends React.Component {
  constructor(props) {
    **super();//no props here**
    this.state = { busy: true };
  }
  // ...
}
```

* Liệu bạn có thể truy cập được this.props bên trong component hay không? Câu trả lời là bạn có thể sử dụng this.props bình thường trong hàm render() và các method khác. Vì bên dưới React cài đặt như sau:

```
/ Inside React
  const instance = new YourComponent(props);
  instance.props = props;
```
* Cho nên sau khi chúng ta khởi tạo một instance thì React đã gán props cho nó. Và có thể như vậy sẽ làm cho chúng ta thấy khó hiểu? Tại sao không bỏ luôn props gọi super()?
* Một trong những lý do đó là để tạo nên sự thống nhất và minh bạch về code, chúng ta nên truyền props khi gọi super(props). Điều đó có nghĩa là bạn sẽ dùng props được trong cả hai trường hợp: trong constructor và trong những method khác của Button component.

```
/ Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
 
// Inside your code
class Button extends React.Component {
  constructor(props) {
    super(); // 😬 We forgot to pass props
    console.log(props);      // ✅ {}
    console.log(this.props); // 😬 undefined   }
  // ...
}
```

**Nếu bạn sử dụng super(props) thì bạn sẽ có cách sử dụng như sau:**


```
class Button extends React.Component {
  constructor(props) {
    super(props); // ✅ We passed props
    console.log(props);      // ✅ {}
    console.log(this.props); // ✅ {}
  }
  // ...
}
```

* Mọi thứ đều make sense đúng không nào!

* Và rõ ràng code của chúng ta tường minh hơn, dễ hiểu hơn.

* Cảm ơn các bạn đã theo dõi bài viết!