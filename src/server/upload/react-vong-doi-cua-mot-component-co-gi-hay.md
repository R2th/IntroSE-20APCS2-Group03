# Sơ bộ về component lifecycle
Trong cuộc sống thường thường, mọi thứ đều sẽ hoạt động theo một chu kì nào đó ví dụ như con người lúc thức dậy thì cần mở mắt sau đó mới làm đến những việc khác. Thì tương tự trong **React Component** cũng sẽ hoạt động theo một chu kì nào đó mà nhờ đó chúng ta có thể theo dõi và thao tác, xử lý dữ liệu trên các chu kì đó.

Mà cụ thể ở đây các chu kì sẽ là :
* **initialization**
* **mounting**
* **updating**
* **unmounting**

![](https://images.viblo.asia/0e7e47b9-43f7-4e64-ba3a-bedf2ade4245.png)
# Component lifecycle
Trước tiên để có cái nhìn tổng quát nhất về `component lifecycle` thì những người anh em hãy nhìn ảnh này để thấy được thứ tự các phương thức sẽ được gọi trong một chu kì.
## Các giai đoạn ở các phiên bản trước
![](https://images.viblo.asia/9dfe3019-ea57-4a08-8f73-9e8ad637c2a7.png)
## Các giai đoạn ở phiên bản bây giờ (v17)
![](https://images.viblo.asia/5e495346-050e-4b74-9eeb-fa25bf749346.png)
## Sự khác biệt giữa ngày ấy và bây giờ
Nhìn vào hai ảnh trên thì các bạn cũng thấy rõ sự thay đổi.

Đã có 3 method lifecycle bị loại bỏ 
* **componentWillMount**
* **componentWillReceiveProps**
* **componentWillUpdate**

Những method này trong phiên bản hiện tại được đánh dấu là **unsafe** rồi, tên gọi của chúng được thay thế bằng 
```javascript
    UNSAFE_methodName
    // Ví dụ 
    UNSAFE_componentWillMount
```

Thêm vào đó là sự xuất hiện của 2 method mới là
* **static getDerivedStateFromProps**
* **getSnapshotBeforeUpdate**

> **Note**: Ở bài này mình sẽ giới thiệu cả những method cũ luôn để các bạn thấy được sự khác biệt.

### Why
Muốn biết tại sao người ta lại có những thay đổi những method này thì các bạn hãy đọc bài viết này, uy tín luôn [https://viblo.asia/p/react-lifecycle-methods-are-changing-in-v170-bJzKmMokK9N](https://viblo.asia/p/react-lifecycle-methods-are-changing-in-v170-bJzKmMokK9N).


> **Chú ý**: Component Lifecycle này chỉ áp dụng đối với các **class component**. Nếu sử dụng **functional component** chúng ta sẽ không thể truy cập tới từ khóa **this** cũng như các method lifecycle.
> 
> Theo như mình được biết thì ở phiên bản hiện tại thì nếu muốn sử dụng các method lifecycle này thì sẽ dùng đến method **useEffect()** trong **React hook**. Cái này  khi nào mình tìm hiểu mình sẽ viết bài chia sẻ sau. :rofl::rofl::rofl:

## Common React Lifecycle Methods
### render()
Trước tiên phải nói đến một method được sử dụng nhiều nhất trong **class component** đơn giản vì đây là method bắt buộc ở trong **class component**, được dùng để `render` component. 

Như ảnh trên thì **render()** sẽ được gọi lại ở các chu kì là **mouting** và **updating**.

> **Lưu ý**: Không được gọi setState() trong hàm này, bởi khi gọi setState() thì hàm render sẽ được gọi => gây ra lặp vô hạn.
> 
```javascript:App.js
class App extends Component{
   render(){
      return <div>Hello world</div>
   }
}
```
Không linh tinh luyên thuyên nữa, đi vào tìm hiểu từng quá trình xảy ra trong một **component** thôi.
## 1. Initialization
### constructor
Phương thức **constructor()** là phương thức được gọi đầu tiên trong **class component** của bạn. Nhớ là cái này không áp dụng đối với **function component**.

Thường thường **React** sẽ khởi tạo các **state**, **props** ở trong **constructor()**.
```javascript:App.js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Quang Phú'
    };
  }
}
```

## 2. Mouting
Đây là quá trình sẽ được gọi sau khi **initialization** hoàn thành. Nó sẽ thực hiện việc chuyển **virtual DOM** trong React thành **DOM** và hiển thị trên trình duyệt. Component sẽ **mount** trong lần **render** đầu tiên. 

Sẽ có 3 methods sẽ lần lượt được gọi ở quá trình này là:
* **UNSAFE_componentWillMount**
* **getDerivedStateFromProps**
* **render**
* **componentDidMount**

### UNSAFE_componentWillMount

> **Chú ý**: Đây là method ở các phiên bản cũ

Phương thức này sẽ được gọi tới trước khi một **component** chuẩn bị được `mount`, trước khi phương thức render() được gọi. Sau phương thức này thì **component** sẽ được `mounted`.

Ở trong phương thức này thì chúng ta có thể gọi tới API cũng như truy cập đến **state** hay **props** rồi, nhưng có một lưu ý là khi gọi API response ở đây rồi dùng **setState** để cập nhật dữ liệu, vì thời gian chuẩn bị mount -> mount rất ngắn nên đôi khi kết quả lúc `render component` có thể không như mong muốn.
```javascript:App.js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Quang Phu',
    }
  };

  UNSAFE_componentWillMount() {
    console.log('component will mount');
    console.log(this.state.name);
  };
  
  ...
}
```
Bạn thử reload lại trình duyệt xem, sẽ thấy hàm `componentWillMount` được gọi. 

### getDerivedStateFromProps
```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    // code
}
```
Phương thức `getDerivedStateFromProps()` được gọi ngay trước khi render component.
Đây là static method nên do đó chúng ta không thể thao tác với **this** trong method này. Phương thức này được dùng để thiết lập lại state dựa trên props ban đầu.
```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data == prevState.data) {
      return null;
    }

    return { data: nextProps.data };
  }
```
Method này sẽ nhận 2 tham số truyền vào là giá trị mới của props và giá trị cũ của state trước khi được update. Nếu không có cập nhật state mới chúng ta chỉ cần return null. Nếu có cập nhật thì trả về 1 object chứa giá trị thay đổi cho state là được.

### componentDidMount
Sau khi 2 phương thức **componentWillMount** và **render** thì **componentDidMount** là method được gọi cuối cuối trong quá trình này. 

Nghĩa là sau khi render component xong. Nếu ứng dụng của bạn cần gọi đến các web API khác, sử dụng AJAX để fetch dữ liệu, hay cập nhật dữ liệu thì đây là nơi hợp lý nhất để gọi tới các API khác.

Đến tới hàm này thì các phần tử đã được sinh ra, và chúng ta có thể tương tác với DOM bằng JS trong hàm này.
```javascript:App.js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Quang Phu',
    }
  };

  UNSAFE_componentWillMount() {
    console.log('component will mount');
  };

  componentDidMount() {
    console.log('component did mount');
  }

  render() {
    console.log('render call');
    return (
      <div className="container">
        <p>{this.state.name}</p>
      </div>
    )
  }
}
```
![](https://images.viblo.asia/fb48f20b-c0d6-4c52-b61c-262f3e23135c.png)
Thử chạy chương trình lên chúng ta sẽ thấy lần lượt các phương thức được gọi.

## 3. Updating
Đây là quá trình thứ 3 được gọi quá trình `initialization` và `render đầu tiên`(mount). Quá trình này sẽ được gọi khi chúng ta **render component lần thứ 2 trở lên**. 

Trong giai đoạn này **props** và **state** sẽ được cập nhật khi bạn tác một một sự kiện để cập nhật trạng thái của **props** và **state**, điều này dẫn đến việc re-render lại **component**. 

Khi một instance trong component được cập nhật nó sẽ lần lượt gọi đến các methods.
* **componentWillReceiveProps** (đối với props)
* **getDerivedStateFromProps**
* **shouldComponentUpdate**
* **UNSAFE_componentWillUpdate**
* **render**
* **getSnapshotBeforeUpdate**
* **componentDidUpdate**

### UNSAFE_componentWillReceiveProps
> **Chú ý**: Đây là method ở các phiên bản cũ
Phương thức này sẽ được gọi khi **props** được truyền đi được cập nhật. Mình có 1 ví dụ này khá dễ hiểu.
```javascript:App.js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
    }
  };

  UNSAFE_componentWillMount() {
    console.log('component will mount');
  };

  componentDidMount() {
    console.log('component did mount');
  };

  increament() {
    this.setState({data: this.state.data +1});
  }

  render() {
    console.log('render call')
    return (
      <div className="container">
        <button onClick={() =>this.increament()}>Increament</button>
        <Result myNumber={this.state.data} />
      </div>
    )
  }
}

class Result extends React.Component {
  UNSAFE_componentWillReceiveProps(newProps) {
    console.log('new props called');
    console.log(newProps);
  };

  render() {
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    )
  }
}
```
Kết quả
![](https://images.viblo.asia/bc4dd026-4448-4e80-af7f-30f895a427d6.gif)
> Lưu ý : **componentWillReceiveProps** nhận tham số truyền vào là giá trị mới của props sau khi được thay đổi.

### getDerivedStateFromProps
Cái này dùng cho quả quá trình `mouting` lẫn `updating`, mình đã nói ở trên rồi.

### shouldComponentUpdate
Phương thức này sẽ chạy trước khi hàm **render()** được gọi. Phương thức này sẽ kiểm tra xem component có được `render` lại hay không.

Giá trị trả về của hàm này là `true` hoặc `false`. Mặc định sẽ là `true`, nếu trả về `false` component của bạn sẽ không được `render` lại.

Hàm này sẽ nhận hai tham số truyền vào là `nextProps` và `nextState` tương ứng với giá trị mới của `props` và `state`.

### UNSAFE_componentWillUpdate
> **Chú ý**: Đây là method ở các phiên bản cũ


Hàm này được gọi ngay sau phương thức **shouldComponentUpdate**(nếu trả về `true`), ngay trước khi giá trị mới của **props** và **state** được nhận. Hàm này cũng sẽ nhận 2 tham số truyền vào là `nextProps` và `nextState`.

 **Chú ý** : Nếu muốn lấy giá trị **props** và **state** cũ ở trong hai phương thức **componentWillUpdate** và **shouldComponentUpdate** thì chỉ cần sử dụng **this.props** hoặc **this.state** để lấy giá trị cũ.

Chúng ta không thể gọi **this.setState()** trong hàm này được, vì việc gọi **this.setState()** cũng `trigger` tới  **componentWillUpdate** khiến xảy ra một vòng lặp vô hạn.

### getSnapshotBeforeUpdate
```javascript
getSnapshotBeforeUpdate(prevProps, prevState) {
    // code
}
```
Hàm này được sử dụng để thay thế choa **componentWillUpdate**, được gọi ngay trước khi DOM update.

Có một đặc biệt là hàm này sẽ trả về một giá trị,  mà gía trị này sẽ được sử dụng trong **componentDidUpdate** nên trong **componentDidUpdate** sẽ có thêm 1 tham số thứ 3 tương ứng với giá trị mà hàm này trả về.

```javascript
getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log(prevProps);
      console.log(prevState);
      return 999;
  }

componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot); // 999
 }
```

### componentDidUpdate
Phương thức này được gọi khi component đã re-render xong. Khác với **componentWillUpdate** và **shouldComponentUpdate** thì **componentDidUpdate** nhận tham số truyền vào là `prevProps` và `prevState` tương ứng với gía trị cũ của `props` và `state`.

Trong phương thức này chúng ta cũng có thể thao tác với DOM trong JS rùi.

```javascript:App.js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
    }
  };

  UNSAFE_componentWillMount() {
    console.log('component will mount');
  };

  componentDidMount() {
    console.log('component did mount');
  };

  increament() {
    this.setState({data: this.state.data +1});
  }

  render() {
    console.log('render call')
    return (
      <div className="container">
        <button onClick={() =>this.increament()}>Increament</button>
        <Result myNumber={this.state.data} />
      </div>
    )
  }
}

class Result extends React.Component {
  UNSAFE_componentWillReceiveProps(newProps) {
    console.log('new props called');
    console.log(newProps);
  };
  
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps called');
    if (nextProps.data == prevState.data) {
      return null;
    }

    return { data: nextProps.data };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate called');
    return true;
  };

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate called');
  };
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log("getSnapshotBeforeUpdate called");
      return 999;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate called');
  }

  render() {
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    )
  }
}

export default App
```

## 4. Unmounting
Đây là giai đoạn cuối cùng trong **component**, quá trình này xảy ra khi **component** bị loại bỏ ra khỏi DOM.

Trong giai đoạn này chỉ có mỗi một phương thức là **componentWillUnmount()**. Trong hàm này người ta thường sẽ dùng để hủy các timer, cancel các request...

```javascript
class App extends React.Component {
  ...
  componentWillUnmount() {
    console.log('component will unmount')
  }
  ...
}
```
> **Lưu ý**: Không thể gọi **setState** trong này vì **component** sẽ không thể `render` lại.

# setState() trong lifecycle method
Qua những giới thiệu trên mình sẽ tổng kết lại một chút để xem chúng ta nên sử dụng **setState** và không được sử dụng trong các phương thức nào trong các giai đoạn diễn ra tại một component.

| **Phương thức** | **Yes/No** |
| ----------------------------------- | ---------------------- |
|**constructor()**|Không, vì đây là nơi chúng ta khởi tạo giá trị của **state**|
|**UNSAFE_componentWillMount()**|Không, vì đây là quá trình diễn ra trước khi `render` component, nên việc dùng **setState** trong này không làm thay đổi giá trị|
|**getDerivedStateFromProps**|Không|
|**componentDidMount()**|Có, nhưng sẽ gây ra việc `re-render` ngay sau `render` được thực thi  |
|**render()**|Không, sẽ dẫn tới vòng lặp vô hạn đơn vì **setState** gọi tới **render()**|
|**UNSAFE_componentWillReceiveProps**|Có|
|**shouldComponentUpdate**|Không|
|**UNSAFE_componentWillUpdate**|Không, vì sẽ dẫn tới `infinite loop`|
|**getSnapshotBeforeUpdate**|Không|
|**componentDidUpdate**|Có, nhưng phải bọc trong câu lệnh điều kiện nếu không sẽ xảy ra `infinite loop`|
|**componentWillUnmount**|Không|

# Kết luận
Trên đây là những tìm hiểu được của mình về vòng đời trong một **component** trong một ứng dụng React.

Bài viết nếu có sai xót các bạn hãy comment ở dưới, nếu không hãy tặng mình 1 upvote cho hứng khởi. :rofl::rofl::rofl: