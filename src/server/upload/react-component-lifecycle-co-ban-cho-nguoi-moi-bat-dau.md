# Giải thích React Component Lifecycle
![](https://images.viblo.asia/f2743129-108a-48c4-9ee2-577dc8d02855.png)
+ Để bắt đầu với React, việc hiểu lifecycle của component là bắt buộc.

+ Các phương thức của lifecycle là một dạng hook (giống như khái niệm hook trong wordpress)

+ Có thể group các phương thức lifecycle ra 3 nhóm, ứng với 4 giai đoạn của component: Mounting, Updating, Unmounting, Error Handling

### Mounting
+ Sẽ chạy theo thứ tự sau
1. constructor()
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount()
### Updating
+ Các phương thức này sẽ được gọi khi có sự thay đổi của state hoặc props
1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()
### Unmounting
+ Phương thức được gọi trước khi remove component khỏi DOM
1. componentWillUnmount()
### Error Handling
+ Bất kể lỗi ở đâu trong component, nó sẽ gọi đến phương thức này
1. componentDidCatch()
##  1. render()
+ Đây là phương thức bắt buộc duy nhất khi tạo ra một component, bắt buộc trả về một trong những giá trị

+ React element
+ Arrays and fragments
+ Portals
+ String and numbers
+ Booleans or null

**+ Lưu ý: hàm này sẽ không được gọi nếu shouldComponentUpdate() return false(mặc định trong component hàm này sẽ trả về true nhưung người dùng có thể ghi đè lại nó)**
## 2. componentDidMount()
+ Component đã được tạo, là lúc mà ta gọi AJAX
```
componentDidMount() {
  fetch('https://gitconnected.com')
    .then((res) => {
      this.setState({
        user: res.user
      });
    });
}
```

+ Có thể gọi setState() ở dòng đầu tiên của phương thức componentDidMount(), hàm render() sẽ được gọi lại một lần nữa, nhưng nó chỉ xảy ra trước khi trình duyệt update DOM, render chắc chắn sẽ gọi 2 lần, user có thể không nhận ra sự thay đổi này, tuy nhiên đây là nguyên nhân cho vấn đề với performance. Nhưng cần thiết trong trường hợp như modal hay tooltip chúng ta cần tính toán vị trí của DOM trước khi render
## 3. componentDidUpdate(prevProps, prevState, snapshot)

+ Ngay sau khi component được cập nhập, hook này sẽ được gọi. Không gọi trong lần render đầu. Đây cũng có thể là nơi để tạo một network request khi chúng ta so sánh prop hiện tại với prop ở thời điểm trước đó

```
componentDidUpdate(prevProps, prevState, snapshot) {
  // Trường hợp thường dùng (đừng quên kiểm tra so sánh props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

**+ Lưu ý: Nếu muốn gọi setState ở đây, phải đưa nó trong câu điều kiện, nếu không sẽ bị lặp vô tận**

**+ Nếu có implement phương thức getSnapshotBeforeUpdate(), giá trị return của getSnapshotBeforeUpdate() sẽ được đưa vào snapshot, nếu không thì là undefined**

**+ Hàm này cũng không được gọi nếu shouldComponentUpdate() return false**
## 
## 4. componentWillUnmount
+ Thường được sử dụng để remove các listener, các hàm setInterval, cancel network request
```
componentWillUnmount() {
  window.removeEventListener('resize', this.resizeEventHandler);
}
```
## 5. shouldComponentUpdate(nextProps, nextState)
+ Phương thức này để cải thiện performance của React, vì đôi lúc thay đổi state hoặc props ta không muốn cập nhập lại UI, chỉ cần cho hàm này return false (mặc định là return true), khi return false thì render, componentDidUpdate sẽ không được gọi.
```
shouldComponentUpdate(nextProps, nextState) {
   return this.props.clicks !== nextProps.clicks;
}
```

## 6. getSnapshotBeforeUpdate(prevProps, prevState)
+ Gọi ngay trước khi render xuống DOM, cho phép lấy một số thông tin của DOM (ví dụ vị trí thanh scroll), các giá trị return từ hàm này sẽ đưa cho componentDidUpdate()
## 7. componentDidCatch(error, info)
+ Nếu một component nào đó bị lỗi nó sẽ không chết nguyên cái app nữa mà sẽ quăn lỗi ở đây, sử dụng để hiển thị lỗi lên UI
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

## 8. Kết luận.
+ Trên đây là bài viết khá chi tiết về component life-cycle hay sử dụng được mình tổng hợp lại để củng cố lại kiến thức và có thể giúp các bạn mới tìm hiểu hiểu về cách sử dụng của các method này!
+ Tài liệu đầy đủ và chính thức: https://reactjs.org/docs/state-and-lifecycle.html