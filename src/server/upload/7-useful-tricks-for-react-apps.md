**React** đã trải qua nhiều sự thay đổi theo từng giai đoạn khiến các nhà phát triển không khỏi kinh ngạc.

Lúc đầu, chúng tôi sử dụng [**mixin**](https://www.reddit.com/r/reactjs/comments/alc005/what_exactly_is_a_mixin/) để tạo và quản lý giao diện của mình, sau đó các khái niệm về **class components**, và bây giờ là **react hooks** đã thay đổi cách chúng tôi xây dựng ứng dụng react của mình. :scream:

Biết một số tricks bạn có thể làm trong ứng dụng **react** sẽ giúp bạn xây dựng ứng dụng của mình tốt hơn. :+1::+1::+1:

Bài viết này sẽ giới thiệu cho các bạn **7 thủ thuật** trong react mà mọi nhà phát triển react nên biết. Bây giờ tôi không mong đợi mọi thứ trong danh sách này đều là kiến thức mới đối với bạn, nhưng tôi hy vọng rằng bạn tìm thấy ít nhất một mục trong danh sách này hữu ích cho bạn mà bạn không có thể áp dụng ngay cho đến bây giờ.

**Dưới đây là 7 thủ thuật trong react mà bạn nên biết:**

### 1. Tạo react elements bằng chuỗi

Mục đầu tiên trong danh sách này sẽ tạo phần tử react DOM thông thường với các chuỗi đơn giản đại diện cho thẻ phần tử DOM HTML. Chính xác hơn, một chuỗi đại diện cho một phần tử DOM.

Ví dụ: bạn có thể tạo các react elements bằng cách gán chuỗi 'div' vào một biến như sau:

```
import React from 'react'

const MyComponent = 'div'

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <hr />
      <MyComponent>
        <h3>I am inside a {'<div />'} element</h3>
      </MyComponent>
    </div>
  )
}
```

React sẽ chỉ gọi **React.createElement** và sử dụng chuỗi đó để tạo phần tử bên trong. Đó không phải là cách gọn gàng?

Được sử dụng phổ biến trong các thư viện thành phần như **Material-UI** , bạn có thể khai báo một component mà người gọi có thể quyết định nút gốc của component trở thành giá trị props.component như sau:

```
function MyComponent({ component: Component = 'div', name, age, email }) {
  return (
    <Component>
      <h1>Hi {name}</h1>
      <div>
        <h6>You are {age} years old</h6>
        <small>Your email is {email}</small>
      </div>
    </Component>
  )
}
```

Đây là cách bạn có thể sử dụng nó:

```
function App() {
  return (
    <div>
      <MyComponent component="div" name="George" age={16} email="george@gmail.com">
    </div>
  )
}
```

Bạn cũng có thể tự custom lại componnent tại mơi mvaf bạn muốn sử dụng giống như root node.

```
function Dashboard({ children }) {
  return (
    <div style={{ padding: '25px 12px' }}>
      {children}
    </div>
  )
}

function App() {
  return (
    <div>
      <MyComponent component={Dashboard} name="George" age={16} email="george@gmail.com">
    </div>
  )
}
```

### 2. Sử dụng Error Boundaries

Trong JavaScript, chúng ta đã quen với việc xử lý hầu hết các lỗi bên trong quá trình thực thi mã với try/catch. Khi những lỗi này được bắt trong catch, bạn có thể làm cho ứng dụng của mình khỏi bị treo.

Một ví dụ về như sau:

```
function getFromLocalStorage(key, value) {
  try {
    const data = window.localStorage.get(key)
    return JSON.parse(data)
  } catch (error) {
    console.error
  }
}
```

**React** cuối cùng chỉ là **JavaScript** nên chúng tôi có thể cho rằng chúng tôi có thể **bắt và xử lý lỗi**  cùng **một cách**. Tuy nhiên, do bản chất của react, các lỗi JavaScript bên trong các component **làm hỏng trạng thái** bên trong của react và khiến nó tạo ra các **lỗi khó hiểu** khi hiển thị trong tương lai. :cold_sweat:

Vì lý do này, đội phát triển react đã đưa ra các **ranh giới lỗi** và mọi nhà phát triển react nên biết về chúng để họ có thể sử dụng chúng trong ứng dụng react của họ. :heart_eyes:

**Ranh giới lỗi** là các react component bắt lỗi ở bất kỳ đâu trong cây component, **ghi log** chúng và có thể hiển thị giao diện người dùng dự phòng thay vì cây thành phần bị lỗi. Chúng bắt lỗi trong quá trình hiển thị, bên trong các phương thức vòng đời và bên trong các hàm tạo của toàn bộ cây bên dưới chúng.

Đây là một ví dụ từ tài liệu react team :

```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

Sau đó, bạn có thể sử dụng nó như một thành phần thông thường:

```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

### 3. Giữ lại các giá trị trước đó
Trong khi cập nhật các props hoặc state, bạn có thể giữ lại các giá trị trước đó của chúng chỉ bằng cách sử dụng **React.useRef** :grinning:

Ví dụ: để **theo dõi các thay đổi** hiện tại và trước đó của một mảng các mục, bạn có thể tạo một mảng React.useRef được gán **giá trị trước** đó và a React.useState cho **giá trị hiện tại**:

```
function MyComponent() {
  const [names, setNames] = React.useState(['bob'])
  const prevNamesRef = React.useRef([])

  React.useEffect(() => {
    prevNamesRef.current = names
  })

  const prevNames = prevNamesRef.current

  return (
    <div>
      <h4>Current names:</h4>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <h4>Previous names:</h4>
      <ul>
        {prevNames.map((prevName) => (
          <li key={prevName}>{prevName}</li>
        ))}
      </ul>
    </div>
  )
}
```

Điều này hoạt động vì **React.useEffect** được chạy **sau khi các thành phần render xong** .

Khi **setNames** được gọi, component load lại giá trị hiển thị và **prefNamesRef** sẽ giữ các tên trước đó vì **React.useEffect** là mã cuối cùng được thực thi từ lần hiển thị trước đó . Và kể từ khi chúng tôi gán lại **prevNamesRef.current** trong **useEffect**, nó sẽ trở thành các tên trước đó trong giai đoạn render tiếp theo. 

### 4. Sử dụng React.useRef trong react
Trước khi các react hook được giới thiệu trong react, chúng ta đã có componentDidMount phương thức tĩnh của các thành phần lớp nếu chúng ta muốn đảm bảo các hoạt động như tìm nạp dữ liệu xảy ra sau khi thành phần được gắn trên DOM.

Khi phản ứng hook ra đời, nó nhanh chóng trở thành cách phổ biến nhất để viết các component của chúng ta thay vì sử dụng các class component. Khi chúng tôi muốn theo dõi xem một component đã được gắn kết để ngăn việc thiết lập trạng thái sau khi thành phần đó ngắt kết nối hay chưa, chúng tôi sẽ làm như vậy:

```
import React from 'react'
import axios from 'axios'

class MyComponent extends React.Component {
  mounted = false

  state = {
    frogs: [],
    error: null,
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  async fetchFrogs = (params) => {
    try {
      const response = await axios.get('https://some-frogs-api.com/v1/', { params })
      if (this.mounted) {
        this.setState({ frogs: response.data.items })
      }
    } catch (error) {
      if (this.mounted) {
        this.setState({ error })
      }
    }
  }

  render() {
    return (
      <div>
        <h4>Frogs:</h4>
        <ul>
        {this.state.frogs.map((frog) => <li key={frog.name}>{frog.name}</li>
        )}
        </ul>
    </div>
    )
  }
}
```

Một cách tương tự để **componentDidMount** sử dụng react hook là sử dụng **React.useEffect** vì nó được thực thi **sau khi các thành phần render xong**. Nếu bạn sử dụng **React.useRef** để gán giá trị của giá trị được gắn kết ở đây, bạn có thể đạt được hiệu quả tương tự như ví dụ sử dụng **class component**:

```
import React from 'react'
import axios from 'axios'

function MyComponent() {
  const [frogs, setFrogs] = React.useState([])
  const [error, setError] = React.useState(null)
  const mounted = React.useRef(false)

  async function fetchFrogs(params) {
    try {
      const response = await axios.get('https://some-frogs-api.com/v1/', {
        params,
      })
      if (mounted.current) {
        setFrogs(response.data.items)
      }
    } catch (error) {
      if (mounted.current) {
        setError(error)
      }
    }
  }

  React.useEffect(() => {
    mounted.current = true

    return function cleanup() {
      mounted.current = false
    }
  }, [])

  return (
    <div>
      <h4>Frogs:</h4>
      <ul>
        {this.state.frogs.map((frog) => (
          <li key={frog.name}>{frog.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

Một ví dụ khác về trường hợp sử dụng tốt để theo dõi các thay đổi mới nhất mà không gây ra kết xuất là sử dụng nó kết hợp với **React.useMemo** mà bạn có thể **tham khảo** như sau: :smiley:
 
```
function setRef(ref, value) {
  // Using function callback version
  if (typeof ref === 'function') {
    ref(value)
    // Using the React.useRef() version
  } else if (ref) {
    ref.current = value
  }
}

function useForkRef(refA, refB) {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null
    }
    return (refValue) => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}
```

### 5. Sử dụng React.useRef để tùy chỉnh các phần tử phụ thuộc vào các phần tử khác

**React.useRef** có một số trường hợp sử dụng hữu ích bao gồm việc gán chính nó cho các button react tham chiếu:

```
function MyComponent() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const nodeRef = React.useRef()

  React.useEffect(() => {
    const pos = nodeRef.current.getBoundingClientRect()
    setPosition({
      x: pos.x,
      y: pos.y,
    })
  }, [])

  return (
    <div ref={nodeRef}>
      <h2>Hello</h2>
    </div>
  )
}
```
Nếu chúng ta muốn lấy vị trí tọa độ của phần tử, ví dụ này là đủ.
Tuy nhiên, nếu một phần tử khác ở đâu đó trong ứng dụng muốn cập nhật vị trí của chính chúng đồng thời vị trí thay đổi sẽ áp dụng một số logic điều kiện cho phù hợp, thì cách tốt nhất để làm điều đó là sử dụng ref callback function pattern. Khi sử dụng mẫu hàm gọi lại, bạn sẽ nhận được react component hoặc phần tử DOM HTML làm đối số đầu tiên.

Ví dụ bên dưới chỉ cho thấy một ví dụ đơn giản mà ở đó **setRef** hàm gọi lại được áp dụng cho một chỗ dựa **ref**. Bạn có thể thấy rằng bên trong **setRef** bạn có khả năng làm bất cứ điều gì bạn cần thay vì áp dụng trực tiếp **React.useRef** phiên bản cho phần tử DOM:

```
const SomeComponent = function({ nodeRef }) {
  const ownRef = React.useRef()

  function setRef(e) {
    if (e && nodeRef.current) {
      const codeElementBounds = nodeRef.current.getBoundingClientRect()
      // Log the <pre> element's position + size
      console.log(`Code element's bounds: ${JSON.stringify(codeElementBounds)}`)
      ownRef.current = e
    }
  }

  return (
    <div
      ref={setRef}
      style={{ width: '100%', height: 100, background: 'green' }}
    />
  )
}

function App() {
  const [items, setItems] = React.useState([])
  const nodeRef = React.useRef()

  const addItems = React.useCallback(() => {
    const itemNum = items.length
    setItems((prevItems) => [
      ...prevItems,
      {
        [`item${itemNum}`]: `I am item # ${itemNum}'`,
      },
    ])
  }, [items, setItems])

  return (
    <div style={{ border: '1px solid teal', width: 500, margin: 'auto' }}>
      <button type="button" onClick={addItems}>
        Add Item
      </button>
      <SomeComponent nodeRef={nodeRef} />
      <div ref={nodeRef}>
        <pre>
          <code>{JSON.stringify(items, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}
```

### 6. Các thành phần thứ tự cao hơn

Một **pattern** chung phổ biến trong JavaScript đơn giản để tạo các hàm có thể sử dụng lại mạnh mẽ là hàm bậc cao hơn . Vì react cuối cùng là JavaScript, bạn cũng có thể **sử dụng các hàm bậc cao** hơn bên trong react.

Đối với các component có thể **tái sử dụng** , mẹo là sử dụng các thành phần bậc cao hơn. :innocent:

Một **component bậc cao** là khi bạn có một function mà có tham số là một **component** và trả về một **component**. Cũng giống như cách các hàm bậc cao hơn có thể được **sử dụng để trừu tượng hóa logic** và được chia sẻ giữa các hàm khác trong ứng dụng, các thành phần bậc cao cho phép chúng ta trừu tượng hóa logic khỏi các thành phần và chia sẻ chúng giữa các thành phần khác. Điều này có nghĩa là bạn có thể sử dụng một loạt các thành phần có thể **tái sử dụng để sử dụng** trên ứng dụng của mình.

Ví dụ dưới dây: 

```
import React from 'react'

// Higher order component
const withBorder = (Component, customStyle) => {
  class WithBorder extends React.Component {
    render() {
      const style = {
        border: this.props.customStyle
          ? this.props.customStyle.border
          : '3px solid teal',
      }
      return <Component style={style} {...this.props} />
    }
  }

  return WithBorder
}

function MyComponent({ style, ...rest }) {
  return (
    <div style={style} {...rest}>
      <h2>This is my component and I am expecting some styles.</h2>
    </div>
  )
}

export default withBorder(MyComponent, {
  border: '4px solid teal',
})
```

### 7. Render Props
Một trong những thủ thuật yêu thích của tôi để sử dụng trong thư viện react là mô hình render prop . Nó tương tự như các thành phần bậc cao theo cách giải quyết một vấn đề tương tự: Chia sẻ mã giữa nhiều component. render props cho thấy một chức năng có mục đích là truyền lại mọi thứ mà thế giới bên ngoài cần để hiển thị con của nó.

Cách cơ bản nhất để hiển thị các component trong react là render chúng như sau:

```
function MyComponent() {
  return <p>My component</p>
}

function App() {
  const [fetching, setFetching] = React.useState(false)
  const [fetched, setFetched] = React.useState(false)
  const [fetchError, setFetchError] = React.useState(null)
  const [frogs, setFrogs] = React.useState([])

  React.useEffect(() => {
    setFetching(true)
    api
      .fetchFrogs({ limit: 1000 })
      .then((result) => {
        setFrogs(result.data.items)
        setFetched(true)
        setFetching(false)
      })
      .catch((error) => {
        setError(error)
        setFetching(false)
      })
  }, [])

  return (
    <MyComponent
      fetching={fetching}
      fetched={fetched}
      fetchError={fetchError}
      frogs={frogs}
    />
  )
}
```
Với các render props, các thành phần con có thể sử dụng như sau:

```
function MyComponent({ render }) {
  const [fetching, setFetching] = React.useState(false)
  const [fetched, setFetched] = React.useState(false)
  const [fetchError, setFetchError] = React.useState(null)
  const [frogs, setFrogs] = React.useState([])

  React.useEffect(() => {
    setFetching(true)
    api
      .fetchFrogs({ limit: 1000 })
      .then((result) => {
        setFrogs(result.data.items)
        setFetched(true)
        setFetching(false)
      })
      .catch((error) => {
        setError(error)
        setFetching(false)
      })
  }, [])

  return render({
    fetching,
    fetched,
    fetchError,
    frogs,
  })
}
```
Trong ví dụ, MyComponent là một ví dụ về một component mà chúng tôi gọi là thành phần hỗ trợ render , bởi vì nó mong đợi render như một phần hỗ trợ và gọi nó để render con của nó. Đây là một mẫu mạnh mẽ trong phản ứng vì chúng tôi được phép truyền ở trạng thái **chia sẻ và dữ liệu** thông qua lệnh gọi lại **render** dưới **dạng đối số**, cho phép **component** được **hiển thị** và **sử dụng lại** trong nhiều thành phần:

```
function App() {
  return (
    <MyComponent
      render={({ fetching, fetched, fetchError, frogs }) => (
        <div>
          {fetching
            ? 'Fetching frogs...'
            : fetched
            ? 'The frogs have been fetched!'
            : fetchError
            ? `An error occurred while fetching the list of frogs: ${fetchError.message}`
            : null}
          <hr />
          <ul
            style={{
              padding: 12,
            }}
          >
            {frogs.map((frog) => (
              <li key={frog.name}>
                <div>Frog's name: {frog.name}</div>
                <div>Frog's age: {frog.age}</div>
                <div>Frog's gender: {frog.gender}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  )
}
```

### 8. Tài liệu tham khảo
1. https://viblo.asia/p/thao-tac-voi-cac-phan-tu-dom-voi-react-hook-su-dung-useref-bWrZnxrr5xw
2. https://jsmanifest.com/8-useful-tricks-in-react-you-should-know/
3. https://reactjs.org/docs/react-component.html
4. https://reactjs.org/docs/hooks-intro.html