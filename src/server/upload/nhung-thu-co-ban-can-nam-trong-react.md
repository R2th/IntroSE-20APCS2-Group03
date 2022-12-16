Sau khi học hoặc đang học React thì những thứ sau đây chúng ta cần nắm, trong bài viết này tôi sẽ nêu ra 5 điều cần nắm trong React.

#  1. Vòng đời của Component

Trong cuộc sống “Sinh - Lão - Bệnh - Tử” được xem như là quy luật, vòng đời thì trong ứng dụng React cũng vậy, nó cũng có vòng đời (life-cycle).

Quan sát hình dưới:
![](https://images.viblo.asia/b147a27f-55f9-4702-8f7d-501afbb97327.png)

Mỗi hình chữ nhật trong hình đại diện cho một phương thức của lifecycle (trừ React updates DOM and refs). Mỗi cột (mounting, updateing, Unmounting) sẽ là các giai đoạn của component (kiểu như con người..ăn xong thì … rồi dọn :v )

Một component có thể chỉ ở một giai đoạn trong một thời điểm nào đó. Bắt đầu với mounting tiếp sẽ tơi updating. Updating cho tới khi component đó bị xóa khỏi DOM ảo thì sẽ tới unmounting rồi bị xóa khỏi DOM. 

Các phương thức lifecycle cho phép chúng ta thực thi code trong các thời điểm nhất định hay có những thay đổi (cập nhật) trong component.

**Cụ thể về mỗi giai đoạn sẽ được trình bày sau đây:**

**Mounting**

Bởi vì component là class, cho nên phương thức sẽ chạy đầu tiên sẽ là constructor - thường là nơi mà bạn khởi tạo state.

Tiếp theo component sẽ chạy phương thức getDerivedStateFromProps 
Sau đó thì phương thức render chạy và trả về JSX. Bây giờ thì React đã được “mount” vào DOM.

Cuối cùng, phương thức componentDidMount chạy. Ở phương thức này ta sẽ thực hiện các lệnh gọi bất đồng bộ tới database hoặc thao tác trực tiếp với DOM.

Đó là quá trình component được sinh ra.

**Updating**

Ở giai đoạn này, React sẽ triggered mọi thay đổi của state và props. Như mounting thì getDerivedStateFromProps sẽ được gọi.

Tiếp shouldComponentUpdate chạy, ở đây ta có thể so sánh state, props cũ với bộ state, props mới. Ta có thể quyết định xem render lại hay không bằng cách trả về true hoặc false. Nếu trả về false thì giai đoạn updating sẽ kết thúc.

Ngược lại, React sẽ render lại component và phương thức getSnapshotBeforeUpdate chạy. Sau đó componentDidUpdate chạy - có thể thực hiện các lệnh gọi bất đồng bộ hay thao tác với DOM ở đây như componentDidMount làm.

**Unmounting**

Ở trên là các giai đoạn mà một component đã sinh và và tồn tại.Đã đến lúc đó mất đi … :(
Đây là giai đoạn mà component bị xóa khỏi DOM. React sẽ chạy phương thức componentWillUnmount ngay sau khi nó bị xóa bỏ. Ở đây ta có thể thực hiện các công việc như clean các kết nối, biến ..




**Các phương thức lifecycle khác**
*Có hai phương thức cần lưu ý là: **forceUpdate** và **getDerivedStateFromError**.*

**forceUpdate** là phương thức trực tiếp làm cho component được render lại. Ta sẽ sử dụng nó trong một số trường hợp cần thiết.

**getDerivedStateFromError** không được đề cập ở hình trên - nó được dùng cho việc cập nhật các lỗi trong lifecycle của một component.

# 2. Higher-Order Components (HOC)

HOC là một hàm nhận component làm tham số và trả về một component mới.

Cú pháp: 
`const WrappedComponent = HOC(someComponent)`

Nếu đã từng dùng react-router-dom hay redux thì có thể bạn đã bắt gặp một số HOC như withRouter(), connect() …

Khi gọi connect(), ta sẽ dùng nó để “bọc” các component truyền vào và sử dụng component mới được trả về.

Những gì HOC component cho phép chúng ta làm là trừu tượng hóa logic giữa các component thành một component thống nhất.

Ví dụ cho việc sử dụng HOC component là dùng để xác thực. Ta có thể viết code xác thực trong các component cần thiết.

**Ví dụ sau không sử dụng HOC component:**

```
class RegularComponent extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return <p>hi</p>
    }
    return <p>You're not logged in</p>
  }
}
```

```
// Lặp code
class OtherRegularComponent extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return <p>hi</p>
    }
    return <p>You're not logged in</p>
  }
}
```

`const FunctionalComponent = ({ isLoggedIn }) => ( isLoggedIn ? <p>Hi There</p> : <p>You're not logged in</p> )`

=> Lặp code càng nhiều nếu có thêm càng nhiều component như vậy.

**Ví dụ sau đây sử dụng HOC component:**

```
function AuthWrapper(WrappedComponent) {
  return class extends React.Component {
    render() {
      if (this.props.isLoggedIn) {
        return <WrappedComponent {...this.props} />
      }
      return <p>You're not logged in</p>
    }
  }
}
```

```
class RegularComponent extends React.Component {
  render() {
    return <p>hi</p>
  }
}
```

```
class OtherRegularComponent extends React.Component {
  render() {
    return <p>hello</p>
  }
}
```

`const FunctionalComponent = () => (<p>Hi There</p>)`

```
const WrappedOne = AuthWrapper(RegularComponent)
const WrappedTwo = AuthWrapper(OtherRegularComponent)
const WrappedThree = AuthWrapper(FunctionalComponent)
```

Có thể thấy việc sử dụng HOC component mang lại lợi ích thực sự: tái sử dụng code , code không bị phình to.

## 3. React state và setState()

State là thành phần cực kì quan trọng React, khi có bất cứ thay đổi nào về state, React sẽ render lại component. (trừ khi dùng shoudComponentUpdate return false)

Cách duy nhất để thay đổi state là sử dụng hàm setState. Phương thức này sẽ nhận một object và thay đổi nó với state hiện tại.

setState là một phương thức bất đồng bộ, nghĩa là nó sẽ không cập nhật lại state ngay sau khi gọi setState.

Vì state không được cập nhật ngay sau khi setState nên nó sẽ có vấn đề. Nên ta nên truyền vào nó một hàm thay vì object.

```
this.setState((prevState, props) => {
	// set it
})
```

Hàm này sẽ nhận state trước đó và props.

*Việc truyền hàm vào setState mang lại 2 lợi ích:*
* Cho phép ta lấy một bản sao state hiện tại, không thay đổi.
* Nó được đặt trong hàng đợi để thực hiện có thứ tự.

## 4. React Context
React Context API tạo ra object context toàn cục mà các component có thể sử dụng. Cho phép ta truyền dữ liệu mà không phải truyền props xuống các component thông qua DOM tree.

**Cách sử dụng:**
* Tạo ra context object:
`const ContextObject = React.createContext({ foo: "bar" })`
	
// Tạo ra HOC để sử dụng context.

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

Những gì cần làm là bọc component cần sử dụng context với <Context.Consumer> và truyền vào context như là props

*** Sử dụng**

```
class Child extends React.Component {
  render() {
    console.log(this.props.context)
    return <div>Child</div>
  }
}
const ChildWithContext = contextWrapper(Child, AppContext)
```

Ta sẽ dùng **contextWrapper** truyền vào component cần sử dụng context.


**Thay đổi context ?**

Ta vẫn dùng HOC component

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

Đầu tiên ta lấy context state khởi tạo mà đã truyền vào React.createContext() trên và khởi tạo nó trong HOC component. Tiếp theo là định nghĩa phương thức để thay đổi state. Cuối cùng, bọc component với Context.Provider component, truyền state và phương thức đã tạo vào value props. Bây giờ bất cứ component con trong Context.Provider sẽ nhận được context.

**Mã nguồn đầy đủ :**

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

Bây giờ các component con đã có thể truy cập *context* và thay đổi thuộc tính *foo* thành *baz*.

# 5. Cập nhật React
Công nghệ luôn thay đổi hằng ngày, và React cũng vậy. Bài viết này có thể mới bây giờ nhưng sau ít phút có thể lỗi thời :v. Vậy nên hãy cập nhật nhanh chóng để có thể nắm bắt cái mới. 
Ta có thể cập nhật những thay đổi React tại https://reactjs.org/blog.

Cảm ơn bạn đã dành thời gian đọc bài viết! :clap: