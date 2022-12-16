Trong bài viết này, mình sẽ đề cập đến 5 khái niệm React, mà từ đó kỹ năng và kiến thức về ReactJs của  bạn sẽ được nâng lên một trình độ mới.

Nếu bạn mới là người mới bắt đầu tiếp cận React, thì hãy tìm hiểu các [hướng dẫn](https://reactjs.org/tutorial/tutorial.html)  sau, rồi mới tiếp tục đọc các khái niệm trong bài viết này.

### 1. Vòng đời của Component 
Điều quan trọng nhất trong React JS là hiểu biết về vòng đời của component. Vòng đời của component chính là quá trình từ lúc component bắt đầu tạo ra, thực hiên một vài hành động khi đang tòn tại và sau khi nó biến mất.  

Vòng đời của component được miêu tả thông qua hình ảnh sau:

![](https://images.viblo.asia/b3c33ece-c438-4119-9463-e7fd8859c074.png)

Trong đó, mỗi ô chữ nhật ngang có màu sắc khác nhau biểu diễn các phương thức trong một vòng đời. Các cột biểu diễn các quá trình khác nhau của một vòng đời component.

Một vòng đời đơn giản được bắt đầu bằng cách gắn vào (mounting) và chuyển qua trạng thái updating. Nó sẽ giữ trạng thái update mãi tới khi bị xoá khỏi DOM ảo. Sau đó, nó chuyển sang trạng thái tháo ra (unmounting) và bị loại bỏ khỏi DOM.

Các phương thức vòng đời cho phép chúng ta chạy các đoạn code tại các thời điểm cụ thể trong vòng đời của component hoặc liên quan tới sự thay đổi trong vòng đời.

Chúng ta hãy đi vào cụ thể mỗi quá trình trong vòng đời của component và các phương thức liên quan:

* Mounting

Bởi vì, các component React chính là các class, do đó phương thức đầu tiên được gọi là `constructor`. Constructor là nơi bạn khởi tạo state của component. 

Tiếp đến, component sẽ gọi `getDerivedStateFromProps`, thực tế hàm này cũng không có nhiều hữu dụng lắm. 

Bây giờ, chúng ta sẽ gọi hàm `render` để trả về JSX. Tại đây, React đã gán JSX vào DOM.

Cuối cùng. hàm `componentDidMount` sẽ được gọi. Đây là nơi bạn sẽ đặt các lời gọi không đồng bộ API đến database hoặc thực hiện xử lý trực tiếp đến DOM nếu cần. Đến đây, component đã được tạo thành.

* Updating

Quá trình này được gọi mỗi khi state hay props thay đổi. Giống như quá trình mounting, hàm `getDerivedStateFromProps` được gọi, nhưng constructor không được gọi vào lúc này.

Sau đó, hàm `shouldComponentUpdate` được chạy. Tại đây, bạn có thể so sánh props/state cũ với props/state mới. Bạn có thể quyết định component của bạn có nên render lại hay không bằng cách trả về kết quả true hoặc false. Điều đấy có thể làm cho ứng dụng web của bạn hiệu quả hơn bằng cách kiểm tra khi nào cần render lại. Nếu shouldComponentUpdate trả về false, quá trình update sẽ kết thúc.

Nếu không, React sẽ render lại và hàm getSnapshotBeforeUpdate sẽ chạy tiếp sau đó. Hàm này cũng bị giới hạn dùng. Sau đó, React gọi `componentDidUpdate`. Giống như `componentDidMount`, bạn có thể dùng nó để tạo ra các lời gọi không đồng bộ hay thao tác với DOM.

* Unmounting

Giai đoạn unmounting là giai đoạn cuối cùng của vòng đời component. Khi bạn xoá một component từ DOM, React sẽ chạy hàm `componentWillUnmount` trước khi component đó bị xoá. Bạn nên sử dụng hàm này để xoá các kết nối như WebSockets hay các bộ đếm giờ.

* Các hàm vòng đời khác 

Trước khi chúng ta chuyển sang chủ đề kế tiếp, chúng ta sẽ đề cập ngắn gọn qua `forceUpdate` và `getDerivedStateFromError`

`forceUpdate` là phương thức trực tiếp chạy một render lại. Mặc dù có vài trường hợp hữu dụng cho hàm này, nhưng chúng ta nên hạn chế sử dụng nó.

`getDerivedStateFromError` là một hàm vòng đời mà không thực sự là một phần của vòng đời component. Trong sự kiện của một lỗi trong một component, getDerivedStateFromError sẽ chạy và bạn có thể cập nhật state để phản ánh một lỗi đã xảy ra. Hàm này được sử dụng rất nhiều. 

Ta có VD mô tả một vòng đời của component:

![](https://images.viblo.asia/ac69a26f-3109-47cd-b0bb-6e1126143bcf.png)

Hiểu kỹ về vòng đời component và các hàm của nó cho phép bạn dễ dàng quản lý luồng dữ liệu và xử lý các sự kiện trong ứng dụng.

### 2. Higher-Order Components

Bạn đã từng sử dụng các component higher-order rồi, đó là hàm `connect` trong Redux, hàm đấy trả về một HOC. Nhưng HOC thực ra là gì?

Trong tài liệu của React:

```
Một higher-order component là một hàm nhận đầu vào là một component và trả về một component mới.
```

Quay trở lại hàm connect của Redux,

```
const hoc = connect(state => state)
const WrappedComponent = hoc(SomeComponent)
```

Khi chúng ta gọi connect, tức là chúng ta nhận lại một HOC mà chúng ta có dùng nó để đóng gói một component. Từ đó, chúng ta chỉ cần truyền component của ta vào HOC và bắt đầu sử dụng component mà HOC trả về.

Điều mà HOC mang lại cho ta là chia sẻ logic trừu tượng giữa các component vào trong một component được đóng gói.

Một VD phù hợp với HOC là chức năng xác thực. Bạn có thể viết code xác thực vào trong mọi component cần chức năng đấy. Thật nhanh chóng và loại bỏ rất nhiều code dư thừa. Đặc điểm này khá giống với module trong Ruby. 

Hãy xem cách mà chúng ta xử lý xác thực cho component mà không dùng HOC:

```
class RegularComponent extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return <p>hi</p>
    }
    return <p>You're not logged in ☹️</p>
  }
}

// code đã bị lặp lại
class OtherRegularComponent extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return <p>hi</p>
    }
    return <p>You're not logged in ☹️</p>
  }
}

const FunctionalComponent = ({ isLoggedIn }) => ( isLoggedIn ? <p>Hi There</p> : <p>You're not logged in ☹️</p> )
```

Với HOC, ta có thể viết như sau:

```
function AuthWrapper(WrappedComponent) {
  return class extends React.Component {
    render() {
      if (this.props.isLoggedIn) {
        return <WrappedComponent {...this.props} />
      }
      return <p>You're not logged in ☹️</p>
    }
  }
}

class RegularComponent extends React.Component {
  render() {
    return <p>hi</p>
  }
}
class OtherRegularComponent extends React.Component {
  render() {
    return <p>hello</p>
  }
}
const FunctionalComponent = () => (<p>Hi There</p>)

const WrappedOne = AuthWrapper(RegularComponent)
const WrappedTwo = AuthWrapper(OtherRegularComponent)
const WrappedThree = AuthWrapper(FunctionalComponent)
```

Với đoạn code trên, bạn có thể thấy chúng ta có thể giữ cho các component regular rất đơn giản trong khi vẫn cung cấp chức năng xác thực cho chúng. Component `AuthWrapper` sẽ đặt tất cả logic xác thực vào một component chung. Tất cả cùng nhận một prop là `isLoggedIn` và trả về  WrappedComponent hay một thẻ p dựa theo prop là true hay false. 

Như bạn thấy, HOC thực sự rất hữu dụng bởi vì cho phép chúng ta tận dụng code, tái sử dụng code cũ và loại bỏ các trùng lặp. 

### 3. React state và setState()

Hầu hết bạn đều dùng React state, chúng ta thậm chí dùng nó ở trong VD HOC ở trên. Nhưng điều quan trọng là khi có một sự thay đổi của state, React sẽ kích hoạt một quá trình re-render cho component. (nếu như bạn không sử dụng shouldComponentUpdate để trực tiếp tác động đến quá trình re-render)

Bây giờ, hãy đề cập về cách chúng ta thay đổi state. Cách duy nhất bạn được khuyên để thay đổi State là thông qua hàm setState. Hàm này sẽ nhận một đối tượng và gộp vào state hiện tại. Ngoài điều đó, cũng có một vài điều bên nên biết về state. 

Đầu tiên, setState là không đồng bộ. Nghĩa là state sẽ không được thực sự cập nhật sau khi bạn gọi hàm setState và điều này có thể dấn tới làm tăng một vài cách xử lý mà hi vọng rằng chúng ta sẽ tránh. 

![](https://images.viblo.asia/ac69a26f-3109-47cd-b0bb-6e1126143bcf.png)

Với bức ảnh trên, bạn thấy rằng khi chúng ta gọi setState và sau đó chạy console.log state ngay lập tức. Đáng lẽ biến counter sẽ đổi thành 1, nhưng thực ra nó vẫn là 0. Vậy khi nào chúng ta mới truy cập state mới ngay sau khi setState thực sự update state?

Để trả lời cho câu hỏi này, chúng ta cần biết về setState, nó là một hàm callback.

![](https://images.viblo.asia/b3a5160a-4063-4565-ad94-4ab73c053cad.png)

Thật tuyệt vời, nó đã hoạt động, bây giờ, chúng ta đã xong? không thực sự là vậy. Chúng ta thực sự chưa dùng setState đúng cách. Thay vì truyền một đối tượng vào setState, chúng ta sẽ đưa vào một hàm. Cách này được dùng khi bạn sử dụng state hiện tại để tạo state mới, giống như ví dụ trên. Ta sửa lại code như sau:

![](https://images.viblo.asia/b7e4675a-fe19-43d5-8aed-a41617ccc98e.png)

Tại sao ta lại cần truyền một hàm thay vì một object? Bởi vì setState là không đồng bộ, khi tạo giá trị mới, nó sẽ gây ra một vài lỗi. VD, trong khi setState đang chạy, một setState khác có thể đã làm thay đổi state. Truyền một hàm vào setState sẽ giúp chúng ta có 2 lợi ích. Thứ nhất là cho phép chúng ta tạo một bản sao tính state hiện tại mà sẽ không thể thay đổi. Thứ 2 là nó sẽ chuyển các lời gọi setState vào hàng đợi đế chúng có thể chạy theo thứ tự. 

Với VD dưới đây, khi chúng ta cố gắng tạo bộ đếm bằng cách dùng 2 lời gọi setState liên tiếp:

![](https://images.viblo.asia/a3e46427-bbc5-43d2-9419-5176ad5a84c5.png)

Nhưng khi sử dụng hàm cho setState

![](https://images.viblo.asia/6311ca24-2b99-4736-ab5d-bf059118492d.png)

Với cách xử lý đầu tiên, cả 2 hàm setState đều trực tiếp sử dụng this.state.counter và như chúng ta đã đề cập ở trên, this.state.counter vẫn sẽ là 0 sau khi setState đầu tiên được gọi. Do đó, chúng ta sẽ nhận kết quả là 1 thay vì 2 bởi vì cả 2 hàm setState đều đang gán counter là 1

Với cách xử lý thứ 2, chúng ta truyền vào setState một hàm, điều này sẽ đảm bảo cả 2 hàm setState chạy theo thứ tự. Và chúng ta sẽ nhận kết quả là 2.

Đó là tất cả những thông tin bạn cần biết về React state.

### 4. React Context 

Chúng ta có thể hiểu đơn giản React context chỉ là state toàn cục cho tất cả component.

React context API cho phép bạn tạo các đối tượng context toàn cục mà có thể được sử dụng cho bất kỳ component nào bạn tạo. Điều này cho phép bạn chia sẻ dữ liệu mà không cần phải truyền các props xuống tất cả các component trung gian trong cây DOM.

Vậy chúng ta sử dụng context như thế nào?

Đầu tiên là tạo một đối tượng context:

```
const ContextObject = React.createContext({ foo: "bar" })
```

Trong tài liệu của React mô tả việc tạo context trong một component như sau:

```
MyClass.contextType = MyContext;
```

Tuy nhiên, với React 16.4.2, điều này đã được lại bỏ. Thay vào đó chúng ta sử dụng HOC để tạo ra context.

```
function contextWrapper(WrappedComponent, Context) {
  return class extends React.Component {
    render() {
      return (
        <Context.Consumer>
          { context => <WrappedComponent context={context} { ...this.props } /> }
        </Context.Consumer>
      )
    }
  }
}
```

Điều chúng ta làm là gói component với component Context.Consumer và truyền vào context như một prop

```
class Child extends React.Component {
  render() {
    console.log(this.props.context)
    return <div>Child</div>
  }
}
const ChildWithContext = contextWrapper(Child, AppContext)
```

Và chúng ta sẽ truy cập vào foo từ đối tượng context của chúng ta trong props.

```
function contextProviderWrapper(WrappedComponent, Context, initialContext) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = { ...initialContext }
    }
    
    // define any state changers
    changeContext = () => {
      this.setState({ foo: 'baz' })
    }

    render() {
      return (
        <Context.Provider value={{
          ...this.state,
          changeContext: this.changeContext
        }} >
          <WrappedComponent />
        </Context.Provider>
      )
    }
  }
}
```

Đầu tiên chúng ta sẽ nhận state khởi tạo context, đối tượng chúng ta truyền đến React.createContext() và cài đặt nó như state của wrapper component. Kế đến, chúng ta định nghĩa một vài hàm mà sẽ sử dụng để thay đổi state. Cuối cùng, chúng ta đóng gói compoent vào compoent Context.Provider. Chúng truyền state và hàm vào biến prop. Và giờ sẽ lấy context này khi được gói với component Context.Consumer.

Đặt mọi thứ cùng nhau:

```
const initialContext = { foo: 'bar' }
const AppContext = React.createContext(initialContext);

class Child extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.context.changeContext}>Click</button>
        {this.props.context.foo}
      </div>
     )
  }
}

const ChildWithContext = contextConsumerWrapper(Child, AppContext)
const ChildWithProvide = contextProviderWrapper(ChildWithContext, AppContext, initialContext)

class App extends React.Component {
  render() {
    return (
      <ChildWithProvide />
    );
  }
}
```

Và giờ các component con có thể truy cập vào context toàn cục. Nó có thể thay đổi biến foo trong state thành baz.

### 5. Luôn cập nhật React

Lưu ý cuối cùng rất dễ hiểu. Đó là luôn theo dõi các phiên bản phát hành mới nhất của React. React đã đưa ra nhiều thay đổi lớn gần đây, và sẽ tiếp tục thay đổi và phát triển thêm.

VD, trong React 16.3, các hàm vòng đời đã bị lỗi thời, và trong React 16.6, chúng ta sử dụng các component bất đồng bộ và trong 16.7, chúng ta sẽ dùng hook để thay thế cho toàn bộ các lớp component.