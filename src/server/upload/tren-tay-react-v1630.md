![](https://images.viblo.asia/639e0141-3e98-4f99-8e5e-9afd79aa32cf.png)

Như tiêu đề, hôm nay chúng ta sẽ cùng review một số thay đổi đáng chú ý trong React phiên bản 16.3.0 mới được release vào hôm 30/3 vừa rồi. Phiên bản này mang đến khá nhiều tính năng mới nhưng cũng kèm theo khá là nhiều hoang mang. Không để các bạn phải chờ lâu chúng ta sẽ bắt đầu ngay với điểm nổi bật đầu tiên trong phiên bản này. 

# Official `Context` API
Ở phiên bản cũ hơn, tài liệu về context vô cùng ít ỏi. Ngay cả trên docs chính thức của React, context được giới thiệu vô cùng sơ xài và kèm theo 1 cái warning đo đỏ như thế này
![](https://images.viblo.asia/8dce2367-38fc-44a4-92a4-22691bf1708f.png)

Chúng ta có thể bỏ qua bỏ qua việc old context được sử dụng như thế nào, vì old context và new context sử dụng 2 API hoàn toàn khác nhau, đồng thời old context dự kiến sẽ bị loại bỏ trong phiên bản v17.x.  Tuy nhiên nếu bạn vẫn có hứng thú với old context thì có thể đọc thêm [tại đây](https://javascriptplayground.com/context-in-reactjs-applications/).

Quay trở lại vấn đề chính, từ phiên bản 16.3.0 context đã chính thức được đưa vào sử dụng và đóng vai trò quản lý những dữ liệu sử dụng chung giữa các Component trong ứng dụng (nghe có vẻ quen quen nhỉ 🤔)

Vậy new context mang đến cho chúng ta những gì ? 

## API
### React.createContext
```javascript
const {Provider, Consumer} = React.createContext(defaultValue);
```
`createContext()` tạo ra một object có chứa 2 thuộc tính  `Provider` và `Consumer`, `defaultValue` là giá trị mặc định mà Consumer nhận được nếu không có Provider. 

### Provider
`Provider` là một component cho phép các `Consumer` subscribe và nhận được sự thay đổi của context. Hay nói cách khác nó có nhiệm vụ truyền dữ liệu xuống tất cả các Consumer là con của nó.

Provider có thể nhận props `value`  là giá trị mà nó sẽ truyền cho các Consumer con của nó. Một Provider có thể kết nối với nhiều Consumer. Provider có thể lồng nhau (nested) để ghi đè value sâu bên trong cây. 

```javascript
class App extends React.Component {
  state: {theme: 'dark'}
  render() {
    return (
      <Provider value={this.state}>
        <Header />
        <Content />
        <Footer />
      </Provider>
    )
  }
}
```

### Consumer
`Consumer` là một component nhận các thay đổi của context.

Consumer cần 1 function làm con của nó, kĩ thuật này gọi là [ `render props`](https://reactjs.org/docs/render-props.html#using-props-other-than-render) . Function này sẽ nhận được giá trị context hiện tại, và nó phải trả về một React node. Tất cả các Consumer sẽ re-render khi Provider thay đổi value. Thay đổi được xác định bằng cách so sánh giá trị mới và cũ sử dụng cùng một thuật toán như [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description)
```javascript
const Header = () => (
 <Consumer>
   {context => <div>{context.theme}</div>}
 </Consumer>
);
```
## Ví dụ
### Dynamic Context
{@codepen: https://codepen.io/ducpv193/pen/qoYMJe}

### Multi Context
{@codepen: https://codepen.io/ducpv193/pen/qoYJWB}


Context trong phiên bản 16.3.0 là một tính năng đáng chú ý.  Mặc dù còn tồn tại những vấn đề rõ ràng như khi sử dụng nhiều context thì sẽ tạo nên những component nesting phức tạp, nhưng nó đã cung cấp cho React khả năng tự quản lý trạng thái chia sẻ giữa các Component dễ dàng hơn. Liệu Context có thể thay thế hoàn toàn Redux/MobX hay các thư viện quản lý state khác hay không chúng ta còn phải chờ xem các ứng dụng của nó vào các project thự tế.

# Thay đổi về life-cycle hooks
Sự thay đổi lớn tiếp theo trong phiên bản này đó là về life-cycle hooks. Một sự thay đổi có lẽ sẽ làm nhiều người lo ngại nhất ảnh hưởng khá nhiều đến logic code hiện tại. Các life-cycle hooks ban đầu không được thiết kế cho tính năng mới như async rendering. Với việc giới thiệu async rendering, một số life-cycle sẽ không còn an toàn nếu được sử dụng.

## Đánh dấu UNSAFE life-cycle
Những life-cycle sau sẽ sớm bị loại bỏ trong tương lai
```
componentWillMount
componentWillRecieveProps
componentWillUpdate
```
Tất nhiên là chúng sẽ không bị loại bỏ ngay lập tức mà theo từng phases. Ở phiên bản 16.3.0 các life-cycle UNSAFE sẽ được đưa vào sử dụng.
```
UNSAFE_componentWillMount
UNSAFE_componentWillRecieveProps
UNSAFE_componentWillUpdate
```

Deprecation warnings sẽ được thêm vào khi sử dụng các life-cycle cũ ở bản relaese tiếp theo. Và ở v17.0.0 chúng sẽ hoàn toàn bị loại bỏ và chỉ có thể sử dụng UNSAFE life-cycle.

Vậy thực sự thì các life-cycle không hề bị bỏ đi, chúng chỉ được đánh dấu UNSAFE. Chúng ta sẽ không sử dụng chúng hoặc sử dụng chúng 1 cách thận trọng hơn.

Async rendering sẽ khiến componentWillMount kích hoạt render nhiều lần, điều này khiến nó trở nên không an toàn. 

Nếu bạn đang tự hỏi server rendering sẽ hoạt động như thế nào trong tương lai chỉ bằng componentDidMount thì  Dan Abramov đã trả lời nó [ở đây](https://github.com/reactjs/reactjs.org/issues/727#issuecomment-376857584)

![](https://images.viblo.asia/8edf32c1-c12b-4a3e-8809-000cb76707f0.png)

## Thêm vào SAFE life-cycle
### ` getDerivedStateFromProps`
```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    // ...
}
```
Là 1 static method, được gọi sau khi component được mount lần đầu và trong mỗi lần component nhận props mới, sử dụng thay thế cho componentWillRecieveProps. 

Vì là phương thức tĩnh nên không thể sử dụng `this` hay `this.setState()` ở trong method này, chỉ có thể trả về một object chứa các thay đổi của state dựa vào props. Các thay đổi này sẽ được merge vào `this.state`. Nếu không có gì thay đổi thì trả về null. 
```javascript
class App extends React.Component {
  state = { data: 'somedata' }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data == prevState.data) {
      return null;
    }

    return { data: nextProps.data };
  }
}

// Hoặc
App.getDerivedStateFromProps = function(nextProps, prevState) {
  // code here
}
```

### `getSnapshotBeforeUpdate`
```javascript
getSnapshotBeforeUpdate(prevProps, prevState) {
  // ...
}
```

Được gọi ngay trước khi DOM update, sử dụng thay thế cho componentWillUpdate.

Kết quả mà getSnapshotBeforeUpdate trả về sẽ được truyền cho componentDidUpdate. 
```javascript
class ScrollingList extends React.Component {
  listRef = null;
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.listRef.scrollTop +=
        this.listRef.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.setListRef}>
        {/* ...contents... */}
      </div>
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}
```

Mặc dù những  life-cycle mới này không tương thích ngược với phiên bản trước, nhưng đây thực là 1 bước tiến. Life-cycle  mới định nghĩa rõ ràng chức năng hơn và tránh đc nhiều sự nhầm lẫn so với các UNSAFE life-cycle.

# References
https://reactjs.org/blog/2018/03/29/react-v-16-3.html

https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html

https://hackernoon.com/problematic-react-lifecycle-methods-are-going-away-in-react-17-4216acc7d58b