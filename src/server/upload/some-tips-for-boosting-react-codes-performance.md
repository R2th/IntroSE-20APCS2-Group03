React rất phổ biến vì các ứng dụng React có quy mô tốt và rất thú vị khi làm việc. Khi ứng dụng của bạn mở rộng quy mô, bạn có thể xem xét tối ưu hóa ứng dụng của mình. Đi từ 2500ms thời gian chờ đến 1500ms có thể có tác động rất lớn đến trải nghiệm người dùng và tỷ lệ chuyển đổi của bạn.

Vì vậy, đây là một số mẹo nâng cao hiệu suất tôi sử dụng với React.

## React.memo
Nếu bạn có một stateless component và bạn biết component của mình sẽ không cần re-render, hãy bọc toàn bộ thành phần đó bên trong hàm React.memo.

```
import React from 'react';

const profile = ({username}) => {
  return (
    <div className="wrapper">
        <p>{username}</p>
    </div>
  )
}
```

Trở thành thế này:

```
import React, { memo } from 'react';

const profile = memo(({username}) => {
  return (
    <div className="wrapper">
        <p>{username}</p>
    </div>
  )
})

profile.displayName = 'profile'
```

profile.dísplayName có thể dùng trong quá trình debug

React.memo là tương đương với React.PureComponent dùng cho class

## React.PureComponent

PureComponent so sánh các props và state trong phương thức vòng đời component ***ComponentUpdate***, nghĩa là nó sẽ không re-render lại nếu state và props không thay đổi. Chúng ta hãy cấu trúc lại thành phần không trạng thái trước đó thành một thành phần dựa trên lớp.

```
import React, { Component } from 'react'

export default class profile extends Component {
  render() {
    return (
      <div className="wrapper">
        <p>{username}</p>
      </div>
    )
  }
}
```

Trở thành:

```
import React, { PureComponent } from 'react'

export default class profile extends PureComponent {
  render() {
    return (
      <div className="wrapper">
        <p>{username}</p>
      </div>
    )
  }
}

profile.displayName = 'profile'
```

## componentDidCatch(error, info) {}

Các components có thể có các side-effects gây crash ứng dụng khi chạy production. Nếu bạn có nhiều hơn 1000 components, có thể rất khỏ để kiểm soát tất cả. Có rất nhiều bộ phận chuyển động trong ứng dụng web hiện đại, thật khó để xoay quanh toàn bộ khái niệm và xử lý lỗi. May mắn thay, React đã giới thiệu một phương thức vòng đời mới để xử lý lỗi. 

Phương thức componentDidCatch () hoạt động giống như một khối bắt {} JavaScript, nhưng đối với các components. Chỉ dành cho các components dựa trên class.

```
class MyComponent extends Component {

  state = { hasError: false };
  
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return <div>All good!</div>
  }
}
```

## React.lazy: Code-Splitting with Suspense

[Dan Abramov](https://twitter.com/dan_abramov) giải thích: "Chúng tôi đã xây dựng một cách chung cho các components tạm dừng render trong khi chúng tải dữ liệu không đồng bộ, chúng tôi gọi là 'Suspense'. Bạn có thể tạm dừng mọi cập nhật trạng thái cho đến khi dữ liệu sẵn sàng và bạn có thể thêm tải không đồng bộ vào bất kỳ thành phần nào sâu trong Cây không có hệ thống dẫn tất cả các props và state thông qua ứng dụng của bạn và nâng cao logic. Trên mạng nhanh, các bản cập nhật xuất hiện rất trôi chảy và tức thời mà không có một loạt các spinners xuất hiện và biến mất. Trên một mạng chậm, bạn có thể cố tình thiết kế tải tuyên bố người dùng nên xem và mức độ chi tiết hoặc thô của chúng, thay vì hiển thị các spinners dựa trên cách viết mã. Ứng dụng vẫn phản hồi mọi lúc. "

```
import React, {lazy, Suspense} from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

const MyComponent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OtherComponent />
  </Suspense>
)
 
export default MyComponent;
```

## React.Fragments to Avoid Additional HTML Element Wrappers

Nếu bạn đã sử dụng React một thời gian, hẳn bạn đã từng gặp lỗi như sau:

“Parse Error: Adjacent JSX elements must be wrapped in an enclosing tag”.

React component chỉ có thế có duy nhất 1 phần tử con.

```
render() {
  return (
     <div></div>
     <div></div>
  )   
}

// Parse Error: Adjacent JSX elements must be wrapped in an enclosing tag
// This will crash your React app.
```

Hãy sửa lại một chút:

```
render() {
  return (
      <div>
        <div></div>
        <div></div>
      </div>
   )  
}
```

Vấn đề duy nhất với đoạn code trên là chúng ta lại phải cần thêm một thành phần để bao bọc các thành phần con. Càng markup nhiều, ứng dụng của chúng ta càng chậm.

Fragments sẽ giải quyết điều này
```
import React, { Fragment } from 'react'
...
render() {
  <Fragment>
    <div></div>
    <div></div>
  </Fragment>
}
```

không cần thêm markup nữa 

Bạn có thể viết ngắn gọn fragments như sau

```
import React from 'react'
...
render() {
  <>
    <div></div>
    <div></div>
  </>
}
```