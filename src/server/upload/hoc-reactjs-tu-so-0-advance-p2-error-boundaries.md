### Introducing Error Boundaries

Khi chúng ta làm việc với một ứng dụng thì sẽ luôn đi kèm với nó là những "Error" và chúng ta sẽ xử lý những lỗi đó như thế nào để nó ko làm chết app. Để giải quyết vấn đề này thì từ phiên bản React 16 đã giới thiệu một khái niệm mới đó chính là `Error boundary`.

Trước hết  `Error boundary` nó là một components, nơi mà chúng ta có thể bắt được tất cả các lỗi ở bất cứ component con nào của app chúng ta, và hiển thị nó để thông báo với người dùng rằng đã có lỗi xảy ra theo một cách dễ nhìn hơn làm một màn hình chằng chịt code.

Nó có thể bắt lỗi trong quá trình render, trong các trạng thái của của component (lifecycle method) hay la trong bất cứ constructor nào.

Về cơ bản thì `Error boundary` có thể bắt được các error liên quan đến component nhưng có một vài chỗ thì `Error Boundary` sẽ ko thể bắt được, cụ thể như sau:
 - Event handlers ([learn more](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers))
 - Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
 - Server side rendering
 - Errors thrown in the error boundary itself (rather than its children)

Một Component có thể được xem là một `Error boundary` Nếu nó định nghĩa một trong hai method (hoặc là có cả 2) sau:
 - static getDerivedStateFromError() 
 - componentDidCatch()

Sử dụng method `static getDerivedStateFromError()` để update state và qua đó chúng ta có thể biết được App đang throw ra lỗi và render màn hình thông báo lỗi.
Sử dụng method `componentDidCatch(error, errorInfo)` để lấy thông tin về error, hữu ích trong việc log lại error.

```Javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

Đây là một ví dụ về `Error boundary` và bạn có thể sử dụng nó như sau

```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

`Error boundary` làm việc giống như là try catch block, chỉ có một điểm khác là `Error boundary` sử dụng cho component. 

Chỉ có duy nhất class component mới trở thành `Error boundary`.

Trong ví dụ trên thì tất cả các component được bọc trong `Error boundary` thì khi throw lỗi đều có thể bắt được, vì vậy chúng ta chỉ cần khai báo một lần và sử dụng cho toàn bộ ứng dụng.

Điểm cần nhớ của `Error boundary` là chỉ có thể bắt được các error của các component được bọc bởi nó. Một cái nữa là `Error boundary` khổng thể bắt được error được sinh ra trong chính nó.

### Where to Place Error Boundaries

Việc sử dụng `Error boundary` để bắt error như thế nào là tuỳ thuộc vào bạn. Bạn có thể bọc `Error boundary` ở lớp ngoài cùng của ứng dụng và hiển thị "Something went wrong" để thông báo với user rằng có điều gì đó đã xảy ra, hay bạn có thể bọc `Error boundary` cho một component để khi xảy ra lỗi thì ko bị ảnh hưởng tới các component khác trong app.

### Component Stack Traces

React 16 sẽ in toàn bộ các error xảy ra trong quá trình render ở màn hình console, ngay cả khi các ứng dụng đã vô tình che dấu chúng đi.

Ngoài thông báo lỗi và stack JavaScript, nó cũng cung cấp component stack traces. Bây giờ bạn có thể thấy chính xác nơi thất bại trong component.

![](https://images.viblo.asia/760ebb98-067b-4056-9c87-e929f9fcd487.png)

Ngoài ra còn có thể thấy rõ về file và line number

![](https://images.viblo.asia/d72ac8a8-dd99-4d09-8230-95e9077ba90f.png)

Nếu bạn không khởi tạo app bằng `Create React App`, bạn có thể sử dụng plugin và cài đặt thủ công bằng Babel.

Chú ý rằng, những cài đặt này sẽ bị vô hiệu hoá khi chúng ta build production.

### How About Event Handlers?

Như đã nói ở trên thì các lỗi do `Event Handlers` tạo ra sẽ không được `Error boundary` bắt, nguyên nhân là do các `Event Handlers` không giống như các lifecycle methods, các `Event Handlers` sẽ không được thực thi khi render nên dù có xảy ra lỗi trong  `Event Handlers` thì React vẫn render bình thường và ko throw lỗi.

Cho nên nếu bạn mong muốn bắt lỗi của `Event Handlers` thì nên sử dụng `try/catch` và state để quản lý lỗi

```Javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <button onClick={this.handleClick}>Click Me</button>
  }
}
```